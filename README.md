<div align="center">

![CyberRodent Repair Co.](./og-image.png)

# CyberRodent Repair Co.

**A fully-realised cybernetic rodent repair workshop that does not exist.**

[**Visit the workshop →**](https://mousemechanic.co.uk)

</div>

---

## What this is

A single-page site for a fictional 2030s repair shop specialising in cybernetically
augmented rodents. It started as an excuse to build interactive components without
the usual constraint of the content being useful, and got somewhat out of hand.

Everything on it works. The diagnostic scanner really does branch on your inputs.
The cost estimator really does calculate. The AI assistant really is an LLM, and
really will try to sell you a whisker recalibration.

## Features

**Interactive diagnostic scanner** — four-stage flow: pick a species, multi-select
observed symptoms, watch a fake scan progress, receive a generated fault report
with recommended services. Branching logic per species/symptom combination.

**Anatomy schematic** — clickable SVG map of a cybernetic rodent. Seven hotspots
(neural core, optical array, whiskers, power cell, front/rear servos, comms tail),
each surfacing technical detail and linked services.

**Cost estimator** — species × services × urgency tier, with live total. Emergency
callout applies a 60% surcharge, because of course it does.

**REX-7, the workshop AI assistant** — a chat widget backed by the Claude API,
prompted with the workshop's own knowledge base. Stays in character. Will discuss
your hamster's tail-actuator recall in detail.

**Live repair tracker** — active bays, queue depth and a scrolling workshop event
log, generated client-side.

## Stack

| | |
|---|---|
| **Hosting** | Cloudflare Pages |
| **API layer** | Cloudflare Workers |
| **AI assistant** | Claude API (Anthropic) |
| **Front-end** | Vanilla HTML/CSS/JS — no framework |
| **Graphics** | Hand-authored SVG |

No build step. No dependencies. One HTML file and a Worker.

## Running locally

```bash
git clone https://github.com/iamsidge/cyberrodent.git
cd cyberrodent

# Static preview — the site runs, REX-7 won't
python3 -m http.server 8000

# Full local dev including the Worker
npx wrangler pages dev .
```

REX-7 needs an `ANTHROPIC_API_KEY` set as a Worker secret:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

## Deploying

```bash
npx wrangler pages deploy . --project-name=cyberrodent-repair
```

## Notes

The recall notice on the Hamster Mk9 tail-actuators is not real. Please do not
contact the workshop about it. There is no workshop.

Off-brand whisker sensors do, however, void the warranty.

## Licence

MIT. Take the code, leave the rodents.
