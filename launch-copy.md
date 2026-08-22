# Launch copy

Everything below is ready to post. Adjust the personal details (how long it took,
what you'd change) — specifics are what make these land.

---

## 1. Hacker News — Show HN

**Post as a URL submission** pointing at https://mousemechanic.co.uk, then add the
comment below immediately. HN rewards the "here's how it works" comment more than
the site itself.

### Title

> Show HN: A repair shop for cybernetic rodents that doesn't exist

*Alternative titles, pick by taste:*
- Show HN: I built a fictional cybernetic rodent repair shop with a working AI receptionist
- Show HN: CyberRodent Repair Co. – a fake business, fully implemented

### First comment

> I wanted to build a set of interactive components without having to argue with
> myself about whether the content was useful, so I invented a repair shop for
> cybernetically augmented rodents and built the whole thing properly.
>
> The parts that were actually interesting to build:
>
> - **The diagnostic scanner.** Four-stage flow — species, symptoms, scan, report.
>   It branches on the combination rather than just concatenating strings, so a
>   squirrel with intermittent servo lag gets a different write-up to a hamster
>   with the same fault.
> - **REX-7, the workshop assistant.** Claude API behind a Cloudflare Worker,
>   prompted with the workshop's own fictional knowledge base. Getting it to stay
>   in character while still being genuinely helpful about a thing that doesn't
>   exist took more prompt iteration than I expected. It will quote you for a
>   whisker recalibration.
> - **The anatomy schematic.** Hand-authored SVG with seven hotspots, each wired
>   to the relevant service.
>
> No framework, no build step — one HTML file and a Worker on Cloudflare Pages.
>
> The Hamster Mk9 tail-actuator recall notice is not real. I have already been
> asked.

**Timing:** post Tuesday–Thursday, 08:00–10:00 UK time (catches the US morning).
Don't ask for upvotes anywhere, HN detects it and it'll get flagged.

---

## 2. Reddit

### r/InternetIsBeautiful

**Title:**
> A fully-working repair shop for cybernetic rodents, including an AI assistant that will quote you for a whisker recalibration

Rules there are strict on self-promotion — read the sidebar before posting, and
be upfront in the comments that you built it.

### r/webdev

**Title:**
> Built a fictional cybernetic rodent repair shop to have an excuse for interactive components — no framework, one HTML file, Cloudflare Workers

**Body:**
> Wanted to build a diagnostic flow, an interactive SVG schematic and an LLM chat
> widget without the content getting in the way, so the content became a repair
> shop for augmented rodents.
>
> Stack is deliberately boring: vanilla JS, one HTML file, Cloudflare Pages, and a
> Worker fronting the Claude API for the assistant. No build step at all.
>
> Happy to answer anything about the Worker setup or how the AI assistant is
> prompted to stay in character.
>
> Live: https://mousemechanic.co.uk
> Code: https://github.com/iamsidge/cyberrodent

### r/SideProject

Same body as r/webdev — that sub is friendly to "I made this for no reason."

**Timing:** don't post to all three the same day. Space them out over a week or
so; cross-posting simultaneously reads as spam.

---

## 3. Bluesky / Mastodon / X

Lead with a screen recording of the diagnostic scanner running — the flow from
species select through to the generated report. Video massively outperforms a
bare link.

**Post:**

> I built a repair shop for cybernetic rodents.
>
> It has a working diagnostic scanner, an interactive anatomy schematic, a cost
> estimator, and an AI assistant called REX-7 who will quote you for a whisker
> recalibration.
>
> The shop does not exist. Everything else does.
>
> 🔗 mousemechanic.co.uk

**Thread follow-up (optional):**

> Technical bit: no framework, no build step. One HTML file, hand-authored SVG,
> and a Cloudflare Worker fronting the Claude API for REX-7.
>
> Hardest part was prompting the assistant to stay in character while still being
> actually useful about a business that doesn't exist.

---

## 4. dev.to / Hashnode article

This is the one that keeps paying out — it'll get found via search long after the
social posts have scrolled away.

**Title:**
> Building a fictional business as a portfolio piece (and putting an LLM behind the front desk)

**Structure:**

1. **The problem with portfolio projects** — everyone builds the same to-do app,
   weather widget, dashboard. Nothing memorable, nothing to talk about in an
   interview.
2. **Why fiction helps** — inventing the business freed up the interesting
   decisions. No stakeholder, no real requirements, so the components could be as
   elaborate as they needed to be.
3. **The diagnostic scanner** — walk through the branching logic, show the code.
4. **Wiring up REX-7** — Worker as API proxy (never ship the key client-side),
   the system prompt, what it took to keep it in character. Include the actual
   prompt; people will read the article for this section alone.
5. **Hosting it for nothing** — Cloudflare Pages + Workers, free tier, custom
   domain.
6. **What I'd do differently** — be honest here, it's the most-read section of
   any write-up.

Tag it: `webdev`, `showdev`, `ai`, `cloudflare`, `javascript`

---

## 5. Directories worth a submission

Free, low effort, occasional decent referral traffic:

- **One Page Love** — onepagelove.com/submit (curated single-page sites; this is
  a strong fit)
- **Land-book** — land-book.com
- **SiteInspire** — siteinspire.com
- **Awwwards** — awwwards.com (paid submission, only worth it if you want the
  badge for the portfolio)
- **Hacker News' /newest** — the Show HN above covers this

---

## Before you post any of this

- [ ] Meta tags and OG image live (paste the link into a Discord or Slack channel — if you get a proper preview card, it's working)
- [ ] REX-7 tested under repeated use — API errors and rate limits handled visibly, not silently
- [ ] Mobile checked, especially the anatomy schematic and diagnostic flow
- [ ] Repo public, README in place
- [ ] A screen recording ready for the social posts
