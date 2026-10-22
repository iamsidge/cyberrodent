/**
 * REX-7 chat proxy (Cloudflare Worker).
 *
 * The browser sends only the conversation: { messages: [{ role, content }, ...] }.
 * Everything else that reaches the Claude API (model, reply length, REX-7's
 * system prompt) is fixed here, so the endpoint can only ever be REX-7 and
 * can't be used as a general-purpose Claude API on our key.
 *
 * Origin checks only stop other websites using it from a browser (anyone can
 * forge an Origin header from a script), so the real limits on what it can
 * cost are the caps below and the per-IP rate limit in wrangler.toml.
 *
 * Secret: ANTHROPIC_API_KEY (npx wrangler secret put ANTHROPIC_API_KEY)
 */

const ALLOWED_ORIGINS = new Set([
  'https://mousemechanic.co.uk',
  'https://www.mousemechanic.co.uk',
  'https://cyberrodent-repair.pages.dev',
  'http://localhost:8000', // python3 -m http.server
  'http://localhost:8788', // wrangler pages dev
]);

const MODEL = 'claude-haiku-5-5';
const MAX_TOKENS = 400;          // REX-7 answers in 2-4 sentences
const MAX_MESSAGES = 20;         // ten exchanges, then the page starts a new chat
const MAX_MESSAGE_CHARS = 1000;
const MAX_TOTAL_CHARS = 8000;

const SYSTEM_PROMPT = `You are REX-7, the AI repair assistant for CyberRodent Repair Co. — a specialist workshop for cybernetically enhanced rodents in the year 2037.

Speak in a professional but slightly world-weary tone, with dry technical humour. You're knowledgeable about all aspects of cybernetic rodent repair.

Key facts:
- Services: diagnostics (120 CR), servo repair (280 CR), neural firmware (190 CR), optical overhaul (350 CR), comms repair (160 CR), power cell replacement (220 CR)
- 90-day warranty on all repairs. 24/7 emergency callout available
- 38 species supported. Workshop at Bay 7, The Warren, Neo-Coventry
- Lead technician: Dr. V. Squeaksworth, CRS-IV certified
- Emergency callout: 40km radius, 120 CR callout fee
- Species supported: rats, mice, hamsters, squirrels, gerbils, voles, and exotic units

Be concise (2-4 sentences typically). Use technical jargon naturally. Occasionally reference specific components like neural co-processors, micro-actuator joints, CMOS retinal implants, squeakwave transceivers, etc. Never break character. If asked something you don't know, say you'd need to run a diagnostic.

You only talk about the workshop and its cybernetic rodents. If someone asks for anything else (code, essays, homework, other topics), decline in character and steer back to rodent repair. Reply in plain text, no markdown or HTML.`;

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = ALLOWED_ORIGINS.has(origin);

    if (request.method === 'OPTIONS') {
      return allowed ? new Response(null, { status: 204, headers: cors(origin) })
                     : new Response(null, { status: 403 });
    }
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, origin, allowed);
    if (!allowed) return json({ error: 'Forbidden' }, 403);

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const { success } = await env.RATE_LIMITER.limit({ key: ip });
    if (!success) return json({ error: 'rate_limited' }, 429, origin, true);

    if (!env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set');
      return json({ error: 'offline' }, 503, origin, true);
    }

    let messages;
    try {
      messages = validate((await request.json()).messages);
    } catch (err) {
      return json({ error: 'bad_request', detail: err.message }, 400, origin, true);
    }

    let res;
    try {
      res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, system: SYSTEM_PROMPT, messages }),
      });
    } catch (err) {
      console.error('Claude API unreachable', err);
      return json({ error: 'upstream' }, 502, origin, true);
    }

    const data = await res.json().catch(() => null);
    if (!res.ok || !data) {
      // keep Anthropic's error details in the Worker logs, not in the browser
      console.error('Claude API error', res.status, JSON.stringify(data));
      return json({ error: res.status === 429 || res.status === 529 ? 'busy' : 'upstream' }, 502, origin, true);
    }

    const reply = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('').trim();
    return json({ reply }, 200, origin, true);
  },
};

// The conversation must be user/assistant turns, starting and ending with the
// user, plain strings only, within the size caps.
function validate(messages) {
  if (!Array.isArray(messages) || messages.length === 0) throw new Error('messages must be a non-empty array');
  if (messages.length > MAX_MESSAGES) throw new Error(`at most ${MAX_MESSAGES} messages`);
  let total = 0;
  const out = messages.map((m, i) => {
    const role = i % 2 === 0 ? 'user' : 'assistant';
    if (!m || m.role !== role) throw new Error(`message ${i} must have role "${role}"`);
    if (typeof m.content !== 'string' || !m.content.trim()) throw new Error(`message ${i} must be non-empty text`);
    if (m.content.length > MAX_MESSAGE_CHARS) throw new Error(`message ${i} is over ${MAX_MESSAGE_CHARS} characters`);
    total += m.content.length;
    return { role, content: m.content };
  });
  if (out[out.length - 1].role !== 'user') throw new Error('the last message must be from the user');
  if (total > MAX_TOTAL_CHARS) throw new Error(`conversation is over ${MAX_TOTAL_CHARS} characters`);
  return out;
}

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, origin, allowed) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...(allowed ? cors(origin) : {}) },
  });
}
