# Codex handover — autonomous build

Run Codex from `~/Documents/Duy personal AI/Github Projects/portfolio/`, set the model once, paste the prompt below, walk away.

**Model: 5.6 Terra, effort high.** One setting for the whole build. There are no phase stops now, so there is nothing to switch between.

---

## Before you start — the two things Codex cannot do for itself

Do these first or the build routes around them and logs them as blockers.

1. **Drop your CV at `public/Charlie_Pham_CV.pdf`.** Otherwise every Download CV button gets a labelled placeholder.
2. **Set five environment variables** in `.env.local` and in Vercel (Production + Preview). Codex will build and stub-test the contact form without them, but cannot run the live send:
   - `RESEND_API_KEY` — free tier at resend.com
   - `CONTACT_TO_EMAIL` — `phamduy8896@gmail.com`
   - `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — free at Cloudflare
   - `NEXT_PUBLIC_SITE_URL` — `https://charlie-pham.vercel.app`

Optional, non-blocking: Tableau Public URLs (that one project page is omitted without them), certification credential URLs, chart exports.

---

## The prompt — paste once

```
Build a portfolio website from the spec in this directory, autonomously, start
to finish. I am not going to review between phases. Do not stop to ask me
questions — route around blockers and log them.

Read these three files in full before writing any code, in this order:

1. PLAN.md — the build spec. Tech stack (§1), hosting (§2), routes (§3),
   frontend design (§4), implementation notes (§5), contact backend (§6),
   SEO (§7), the phased sequence (§8 — read §8.1 carefully, it changes the
   order), CI (§9), and the approved visual design (§13).
2. AGENTS.md — repo rules. Note "When blocked — never stop, never invent".
3. CONTENT.md — every fact, metric, date and line of copy the site may state.

ORDER OF WORK — PLAN.md §8.1 overrides the §8 table:
P0 + P7 together, then P1, P2, P3, P4, P5, P6. Build the quality gate as part
of the foundation so every later phase is verified on its way in. Do not leave
the gate for the end.

THE GATE. Create `npm run gate` in P0, running in this order:
  tsc --noEmit && eslint . && prettier --check . && next build
  && playwright test        (smoke: every route 200s, renders its h1, no
                             console errors; axe: zero serious/critical)
  && lhci autorun           (budgets from PLAN.md §9)
Grow the specs as you add routes — a new page without a smoke test and an axe
scan is an incomplete phase.

THE LOOP. For each phase: implement it, run `npm run gate`, fix what it
catches, repeat until green. Only when green: commit to a branch named for the
phase, merge to main, move to the next phase. Never merge red. Never
force-push. If three attempts do not clear the gate, revert to the last green
commit, log it in BLOCKERS.md, and continue to the next phase — do not leave
main broken and do not keep grinding.

NEVER INVENT A FACT. Every name, number, date, job description and project
result comes from CONTENT.md. Where CONTENT.md has TODO(charlie), it says
whether it blocks. Blocking: omit that element or page, keep everything around
it working, log it. Non-blocking: ship without that detail, log it. A
placeholder must be obviously a placeholder — never something a reader could
mistake for real.

BLOCKERS.md. Create it in P0. Every blocker gets an entry: what is blocked,
which page or feature, exactly what you need from me, and what the site does
in the meantime. Delete entries as they resolve. This is the only file I will
read when I come back, so write it for a human.

DECISIONS YOU MAY MAKE WITHOUT ME — do not log these as blockers:
- any visual detail not fixed by PLAN.md §4.2 or §13, resolved toward
  consistency with the surrounding screens
- copy edits for length, grammar or Australian spelling, provided no fact
  changes
- file and component organisation within the structure in §5.1
- test names, fixtures, and how the specs are split across files
- swapping a listed dependency for a better-maintained equivalent, if you say
  so in the commit message

DECISIONS YOU MAY NOT MAKE: adding a dependency outside PLAN.md §1.2 without
justifying it in the commit message; changing the tech stack, hosting or route
structure; inventing any fact; committing a secret; deploying to production;
changing anything outside this directory (the sibling Projects/ repo and
second_brain/ are read-only sources).

WHEN YOU FINISH. Write BUILD_REPORT.md at the repo root:
- each phase, and whether the gate went green
- PLAN.md §0's definition-of-done table, with pass/fail per row and evidence
- everything in BLOCKERS.md, in priority order
- every assumption you made under "decisions you may make without me"
- the exact steps left for me: env vars, Vercel connection, DNS, content
Then stop. Do not deploy to production — leave that to me.

Start now. Work through every phase without checking in.
```

---

## What you actually have to do afterwards

The gate handles correctness. It cannot check truth or taste, so two things stay yours:

1. **Read every word of the site once.** The gate will happily ship a factually wrong sentence that lints clean. This is the one review that matters.
2. **Read `BLOCKERS.md` and `BUILD_REPORT.md`,** then hand Codex the answers in one batch and let it run again.

Then connect the repo to Vercel and deploy. Codex is explicitly told not to.
