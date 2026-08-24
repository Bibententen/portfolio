# Portfolio Website — Build Plan

**Owner:** Duy (Charlie) Pham — Data Analyst
**Repo target:** `github.com/Bibententen/portfolio` (new, public)
**Local path:** `~/Documents/Duy personal AI/Github Projects/portfolio/`
**Live URL:** `https://charlie-pham.vercel.app`
**Plan date:** 23 August 2026
**Executor:** Codex. Read this file top to bottom before writing code. Read `AGENTS.md` for repo rules and `CONTENT.md` for all real copy.

---

## 0. Purpose and success criteria

This site exists for one job: a recruiter or hiring manager in Sydney opens the link on a CV, and within 20 seconds knows **who Duy is, what he can do, that he can legally work in Australia, and that the work is real**. Everything else is secondary.

**Definition of done**

| # | Criterion | How it is measured |
|---|---|---|
| 1 | Live at `charlie-pham.vercel.app` on Vercel free tier | URL resolves over HTTPS |
| 2 | Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO (mobile) | Lighthouse CI in GitHub Actions |
| 3 | Zero TypeScript errors, zero ESLint errors | `npm run check` passes |
| 4 | Works with JavaScript disabled for all content pages | Manual check; content is server-rendered |
| 5 | Contact form delivers to `phamduy8896@gmail.com` and blocks bots | Live submission test + honeypot test |
| 6 | Resume PDF downloadable in one click from every page | Manual check |
| 7 | Passes automated axe-core accessibility scan on all routes | Playwright + `@axe-core/playwright` |
| 8 | Total monthly cost = A$0 | No paid service in the stack |
| 9 | First contentful paint < 1.2s on 4G | Vercel Speed Insights |
| 10 | Every project page links to real, working GitHub source | Link check in CI |

**Non-goals for v1:** blog/CMS, live ML inference demos, visitor analytics dashboard, comments, i18n, auth. These are listed in §12 as a deliberate upgrade path so the architecture does not block them.

---

## 1. Technology decisions

### 1.1 Summary table

| Layer | Choice | Version | Why this and not the alternative |
|---|---|---|---|
| Framework | **Next.js (App Router)** | `16.3.x` | Static generation + React Server Components means the whole site ships as pre-rendered HTML (fast, SEO-perfect) while still giving one server-side escape hatch for the contact form. Alternative Astro is marginally lighter but Next.js is the more valuable line on a CV and matches the stack already used in the AI Command Center project. |
| Language | **TypeScript** | `5.9.x` | `strict: true`. Type-safe content schemas catch broken project data at build time, not in front of a recruiter. |
| UI runtime | **React** | `19.2.x` | Required by Next 16. Server Components by default; `"use client"` only where interactivity is genuinely needed (theme toggle, project filter, contact form). |
| Styling | **Tailwind CSS** | `4.2.x` | v4 uses a CSS-first config (`@theme` in `globals.css`) — no `tailwind.config.js` to drift. Design tokens live in one file. |
| Components | **Hand-rolled + Radix primitives only where needed** | `radix-ui` latest | Do **not** install a full component kit. This site has ~12 components. shadcn/ui is permitted if Codex prefers, but only by copying in the 3–4 primitives actually used (Dialog is not needed; nothing needs it). |
| Content | **MDX files + Zod-validated frontmatter** | `next-mdx-remote` `5.x`, `gray-matter` `4.x`, `zod` `4.x` | Case studies are long-form prose with tables, images and code. MDX keeps them editable as text files instead of buried in JSX. Zod validates frontmatter at build time so a typo in a project slug fails the build. |
| Icons | **lucide-react** | latest | Tree-shakeable, MIT, ~10 icons used. |
| Fonts | **next/font** with IBM Plex Sans + IBM Plex Mono (self-hosted via `next/font/google`) | bundled | Chosen on the design canvas. Self-hosted at build time, so zero layout shift and no third-party font request at runtime. |
| Email | **Resend** | `6.x` SDK | Free tier: 3,000 emails/month, 100/day. See §6.2 for the no-custom-domain caveat and the Formspree fallback. |
| Bot protection | **Cloudflare Turnstile** | free plan | Privacy-friendly and usually invisible — no "select all the buses". The free plan allows unlimited verification requests (20 widgets, 10 hostnames each), and the widget itself is WCAG 2.2 AAA compliant, which matters given the §5.7 accessibility bar. |
| Validation | **Zod** | `4.x` | Same schema shared between the client form and the Server Action. |
| Analytics | **Vercel Web Analytics + Speed Insights** | `@vercel/analytics`, `@vercel/speed-insights` | Included on Hobby with a monthly event allowance; cookieless, so no consent banner is required. |
| Hosting | **Vercel Hobby** | — | See §2. |
| CI | **GitHub Actions** | — | Free for public repos. Runs typecheck, lint, build, Playwright + axe, Lighthouse CI. |
| Package manager | **npm** | Node `22.x` LTS | Matches the AI Command Center project's `engines` field. Commit `package-lock.json`. |

### 1.2 Dependencies to install

```bash
# runtime
npm i next@^16.3 react@^19.2 react-dom@^19.2 \
      next-mdx-remote gray-matter zod \
      lucide-react resend \
      @vercel/analytics @vercel/speed-insights

# dev
npm i -D typescript @types/node @types/react @types/react-dom \
        tailwindcss@^4.2 @tailwindcss/postcss postcss \
        eslint @eslint/js typescript-eslint eslint-config-next \
        eslint-plugin-jsx-a11y prettier prettier-plugin-tailwindcss \
        @playwright/test @axe-core/playwright \
        @lhci/cli
```

### 1.2.1 npm scripts

```json
{
  "dev":        "next dev",
  "build":      "next build",
  "start":      "next start",
  "typecheck":  "tsc --noEmit",
  "lint":       "eslint .",
  "format":     "prettier --check .",
  "check":      "npm run typecheck && npm run lint && npm run format",
  "test":       "playwright test",
  "test:a11y":  "playwright test tests/a11y.spec.ts",
  "lhci":       "lhci autorun"
}
```

Keep the dependency count at or below this list. Every extra package is a supply-chain risk and a Lighthouse penalty. If a feature can be done in 30 lines of CSS, do not install a library for it.

### 1.3 Explicitly rejected

- **`framer-motion` / `motion`** — the animation budget here is small enough for CSS transitions and `@starting-style`. Reconsider only if a specific interaction demands it.
- **`next-themes`** — replaced by a 12-line inline script (§5.6) that avoids both the dependency and the flash-of-wrong-theme.
- **A database (Postgres/D1/Supabase)** — v1 has no persistent state. Adding one now is complexity with no user-visible payoff.
- **A headless CMS (Sanity/Contentful)** — Duy is the only author and is comfortable in git. MDX in the repo is faster to edit and has no vendor lock-in.
- **A separate Python API for ML demos** — deferred to §12. It doubles the deploy surface and the free-tier cold starts (10–50s on free Render/HF) would make the site feel broken.

---

## 2. Hosting and provider recommendation

**Recommendation: Vercel Hobby.** It is the best free option for this specific site, for four reasons:

1. **The URL is already on the CV.** `charlie-pham.vercel.app` appears in the canonical profile document. Choosing Vercel means no reprinting, no dead links on CVs already sent.
2. **Zero-config for Next.js.** Vercel builds Next.js with no adapter, no `wrangler.toml`, no edge-runtime gotchas. The build that runs locally is the build that ships.
3. **Preview deploys per pull request.** Every branch gets its own URL. Useful when Codex opens a PR — Duy reviews the rendered site, not a diff.
4. **The one server-side feature needed (the contact form Server Action) runs natively** as a serverless function on the Hobby plan, with no extra service.

**Free-tier limits and whether they matter**

| Limit (Vercel docs, Aug 2026) | Hobby allowance | Realistic portfolio usage | Risk |
|---|---|---|---|
| Fast Data Transfer (bandwidth) | 100 GB/month | < 1 GB | None |
| Function invocations | 1,000,000/month | < 500 (contact form only) | None |
| Active CPU | 4 CPU-hours/month | negligible — the only function is a form POST | None |
| Deployments | 100/day, 100 builds/hour | a handful | None |
| CLI source upload | 100 MB max | repo is a few MB | None if large datasets stay out of the repo |
| Image Optimization transformations | metered | ~30 project images | Low — see note below |
| Commercial use | **Not permitted on Hobby** | A personal portfolio is non-commercial | None — but do not add a freelance checkout, paid service page, or client-billing flow |

> **Image note:** `next/image` transformations are a metered resource. With ~30 static project images that is a non-issue, but do not build an image-heavy gallery on Hobby. If usage ever looks risky, pre-convert images to WebP at the right sizes and set `images.unoptimized = true` — the site is static, so nothing is lost.

**Alternatives considered**

| Provider | Verdict |
|---|---|
| **Cloudflare Workers/Pages** | Genuinely excellent free tier and matches the AI Command Center stack (`vinext` + `wrangler`). Rejected because Next.js on Workers still needs an adapter and the debugging surface is larger — the wrong trade when the goal is *shipping a CV asset*, not learning edge runtimes. Keep as the migration target if Vercel's terms ever change. |
| **GitHub Pages** | Free forever and sits next to the repos, but static-only: no Server Actions, so the contact form would need Formspree, and there is no server-side OG image generation. Rejected as the primary, but the site should stay export-compatible (§11) so this remains a fallback. |
| **Netlify** | Near-equivalent to Vercel. Rejected only because Vercel builds Next.js first-party and the CV URL already points there. |
| **Hugging Face Spaces** | Not a website host. Reserved for §12 if ML demos are added. |

**Custom domain:** not now. Free `.vercel.app` subdomain for v1. When a domain is bought later, add it in Vercel → Settings → Domains and copy the exact `A` and `CNAME` values the dashboard displays for that domain (do not hard-code an IP from a blog post — Vercel's published values change). Vercel recommends serving from `www` and redirecting the apex to it. Then set `NEXT_PUBLIC_SITE_URL` to the new origin — canonical tags, sitemap and OG images all read from that one variable, so nothing else changes. Keep the `.vercel.app` URL alive as a redirect so already-printed CVs keep working.

---

## 3. Information architecture

```
/                     Home              static
/about                About             static
/projects             Project index     static
/projects/[slug]      Case study        static (generateStaticParams over MDX files)
/contact              Contact           static shell + Server Action
/resume               302 → /Charlie_Pham_CV.pdf
/sitemap.xml          generated
/robots.txt           generated
/opengraph-image      generated per route via next/og
```

Five real pages. That is deliberate — a recruiter who has to hunt through nine nav items closes the tab. Experience, education and certifications all live on `/about`; they are one narrative, not three.

**Navigation:** persistent header with `Home · About · Projects · Contact` plus a visually distinct **Download CV** button on the right. Footer repeats the links and adds GitHub, LinkedIn, email.

**URL/slug rules:** lowercase, hyphenated, stable forever. Slugs are the filenames in `content/projects/`. Never rename a published slug — if a title changes, keep the slug and update the frontmatter `title`.

---

## 4. Frontend design

### 4.1 Design direction

**"Technical, calm, evidence-first."** The visual language should read like good documentation, not like a design agency's landing page. Concretely: generous whitespace, one accent colour, real numbers shown as numbers, no stock photography, no parallax, no gradient meshes, no auto-playing carousels. The credibility comes from the specificity of the content — "3rd of 20 in a Kaggle competition", "automated 95% of manual billing across 30 accounts" — so the design's job is to get out of the way and make those legible.

### 4.2 Design tokens

Defined once in `app/globals.css` under Tailwind v4's `@theme`. Never hard-code a hex value in a component.

```css
@import "tailwindcss";

@theme {
  /* Neutrals — slate-based, warm enough to not feel clinical */
  --color-bg:            oklch(99% 0.002 250);
  --color-surface:       oklch(97% 0.004 250);
  --color-border:        oklch(90% 0.006 250);
  --color-text:          oklch(23% 0.012 250);
  --color-muted:         oklch(50% 0.010 250);

  /* Single accent — a deep teal. Distinct from the sea of portfolio blues/purples,
     and passes AA on both light and dark surfaces. */
  --color-accent:        oklch(52% 0.115 195);
  --color-accent-hover:  oklch(45% 0.115 195);
  --color-accent-subtle: oklch(95% 0.030 195);

  /* Semantic */
  --color-success:       oklch(58% 0.130 150);
  --color-warning:       oklch(70% 0.140 75);

  /* Type */
  --font-sans: var(--font-plex-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-plex-mono), ui-monospace, SFMono-Regular, monospace;

  /* Radii & shadow — restrained */
  --radius-card: 0.75rem;
  --shadow-card: 0 1px 2px oklch(0% 0 0 / 0.04), 0 4px 12px oklch(0% 0 0 / 0.04);
}

@layer base {
  :root[data-theme="dark"], :root:not([data-theme="light"]) {
    /* redefine the same token names for dark — see §5.6 */
  }
}
```

Dark mode redefines **only** the colour tokens. Every colour must have its light definition on bare `:root` so nothing depends on a media query alone.

### 4.3 Type scale

| Role | Size / line-height | Weight | Notes |
|---|---|---|---|
| Display (hero h1) | `clamp(2.25rem, 5vw, 3.5rem)` / 1.05 | 600 | Tight tracking `-0.02em` |
| h2 | `clamp(1.5rem, 3vw, 2rem)` / 1.2 | 600 | |
| h3 | `1.25rem` / 1.3 | 600 | |
| Body | `1.0625rem` / 1.65 | 400 | Slightly above 16px — easier on a laptop at arm's length |
| Small / meta | `0.875rem` / 1.5 | 400 | `--color-muted` |
| Mono / metrics | `0.9375rem` | 500 | Tabular numerals: `font-variant-numeric: tabular-nums` |

Prose columns cap at `68ch`. Never full-width body text.

### 4.4 Layout grid

- Page container: `max-width: 72rem`, `padding-inline: 1.25rem` (mobile) → `2rem` (≥768px).
- Prose container: `max-width: 44rem`.
- Vertical rhythm: sections separated by `clamp(3rem, 8vw, 6rem)`.
- Breakpoints: Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, `xl 1280`). Design mobile-first; the majority of recruiters open CV links on a phone.

### 4.5 Component inventory

Twelve components. If Codex finds itself building a thirteenth, stop and re-read this list.

| Component | Server/Client | Purpose |
|---|---|---|
| `SiteHeader` | Server (client sub-island for mobile menu) | Sticky nav, skip-link target, CV button |
| `SiteFooter` | Server | Links, email, "built with" line, year |
| `ThemeToggle` | Client | Light/dark/system tri-state, persists to `localStorage` |
| `Hero` | Server | Name, role line, location + work-rights line, two CTAs |
| `MetricStat` | Server | One big number + label. Used for "95% automated", "3rd/20", "80% accuracy" |
| `ProjectCard` | Server | Thumbnail, title, one-line outcome, tech chips, link |
| `ProjectGrid` | Client (filter state) | Grid + tag filter chips; filters in-memory, no refetch |
| `TechChip` | Server | Small labelled pill; one shared colour, not rainbow |
| `TimelineItem` | Server | Role, company, dates, 3–5 achievement bullets |
| `SkillMatrix` | Server | Grouped skill lists (Languages / Data / BI / Cloud & Ops) |
| `ContactForm` | Client | Fields + Turnstile + Server Action submission, optimistic states |
| `Prose` | Server | MDX wrapper applying the typographic rules to `h2/h3/p/ul/table/code/img` |

### 4.6 Page-by-page specification

#### `/` — Home

Sections in order, each separated by the vertical rhythm value:

1. **Hero.**
   - `h1`: `Duy (Charlie) Pham`
   - Role line: `Data Analyst` — set in `--color-accent`, IBM Plex Mono.
   - Positioning sentence (one line, max ~20 words) from `CONTENT.md`.
   - **Availability line** (critical for the AU market, easy to miss): `Sydney, NSW · Full Australian work rights to March 2029`. Render it as a bordered inline badge, not body text. Recruiters screen on this first.
   - CTAs: primary `View projects` → `/projects`; secondary `Download CV` → `/resume`.
   - No photo in v1 unless a good professional headshot exists; a bad headshot is worse than none.

2. **Metric strip.** Three `MetricStat` items in a row (stacking on mobile): `95% of manual billing automated`, `30 accounts in scope`, `3rd of 20 — Kaggle competition`. These are the strongest concrete proof points available; they belong above the fold-and-a-half.

3. **Selected work.** Exactly three `ProjectCard`s — Melbourne rental prediction, Customer clustering, Prostate cancer classification. A "View all projects →" link underneath. Three, not six: the index page is where breadth lives.

4. **Skills strip.** A single horizontal band of `TechChip`s for the top ~12 skills. Not the full matrix — that is on `/about`.

5. **Experience preview.** Current role only (Cisco via CH Reynolds) as a `TimelineItem`, then "Full history →" to `/about`.

6. **Closing CTA.** One sentence + email link + LinkedIn + GitHub.

#### `/about`

1. **Intro prose** — 2 short paragraphs, first person, no buzzword soup. Ends by naming the target roles explicitly so keyword-matching recruiters and ATS-adjacent scrapers find them.
2. **Work rights panel** — visa subclass, expiry, sponsorship stance, stated plainly. This removes the single biggest source of recruiter hesitation for a 485 holder, and stating it up front reads as confidence.
3. **Experience timeline** — all four roles (Cisco/CH Reynolds, Jung Talents, FPT Information Systems, LG Electronics), reverse-chronological, `TimelineItem` each.
4. **Education** — Macquarie MBusAnalytics (WAM 80), HUST BBA (WAM 72).
5. **Certifications** — the three certs, each with issuer and date; link out to credential URLs if available.
6. **Skill matrix** — grouped: *Languages* (Python, SQL, R) · *Data & Storage* (Snowflake, Neo4j, MySQL, MongoDB) · *Processing* (Spark, Airflow, DASK, MapReduce, NLTK) · *BI & Viz* (Tableau, Power BI, Excel) · *Practice* (ETL, data quality, dashboarding, KPI reporting, stakeholder comms).

#### `/projects` — index

- `h1` + one-sentence framing.
- Filter chips are derived at build time from the union of all project `tags`, not hard-coded. With the projects listed in `CONTENT.md` that union is `Python`, `Machine Learning`, `Big Data`, `Excel`, `BI & Dashboards` — but the component must compute it, so adding a project with a new tag needs no code change. Multi-select, OR semantics. Selected state must be visible without relying on colour alone (add a checkmark or border weight).
- Responsive grid: 1 column mobile, 2 at `md`, 3 at `xl`.
- Filter state syncs to the URL query string (`?tag=python`) so a filtered view is shareable and the back button behaves. Implement with `useSearchParams` + `router.replace(..., { scroll: false })`.
- Empty state: "No projects match that combination — clear filters".

#### `/projects/[slug]` — case study

This is the page that actually earns interviews. Fixed structure, driven by MDX frontmatter + body:

1. **Header block** — title, one-line outcome, date, tech chips, and buttons: `View on GitHub`, `Open notebook` (where applicable).
2. **At a glance** — a 4-cell key/value panel from frontmatter: *Problem type* · *Dataset size* · *Best model / tool* · *Headline result*. Rendered from structured data, not prose, so it is skimmable in 3 seconds.
3. **The problem** — business framing, not technical. Why anyone should care.
4. **The data** — source, shape, and the messy bits that had to be handled. This is where data-engineering credibility is won; do not skip the unglamorous cleaning detail.
5. **Approach** — the method, with a diagram where one exists (the Melbourne project already has a Mermaid workflow and rendered PNGs — reuse them).
6. **Results** — a real table with real metrics. Never round away the unflattering number; showing an R² of 0.248 alongside the p99-excluded RMSE of 96.90 and explaining *why* both matter is far more impressive than a hidden weakness.
7. **What I'd do differently** — 2–3 bullets. Optional per project but strongly encouraged; it is the single clearest signal of seniority a junior portfolio can send.
8. **Prev/next project** navigation at the foot.

Images live in `public/projects/<slug>/`. Every image needs a real `alt` describing the finding, not the chart type — "Median nightly price by room type, entire homes roughly double private rooms", not "bar chart".

#### `/contact`

- Short intro: what he is open to, and expected response time.
- Form: `Name` (required, 2–80), `Email` (required, valid), `Company` (optional), `Message` (required, 20–2000), plus a hidden honeypot field and a Turnstile widget.
- Direct alternatives listed beside the form — email, LinkedIn, GitHub — because a meaningful share of people will never use a form.
- Success state replaces the form with a confirmation and a "send another" link. Error state keeps the entered values (never clear a user's typed message on failure).

---

## 5. Frontend implementation notes

### 5.1 File tree

```
portfolio/
├── app/
│   ├── layout.tsx                 # fonts, theme script, header/footer, analytics
│   ├── page.tsx                   # Home
│   ├── globals.css                # @theme tokens, base layer
│   ├── opengraph-image.tsx        # default OG card
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── about/page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       └── opengraph-image.tsx
│   ├── contact/
│   │   ├── page.tsx
│   │   └── actions.ts             # "use server" — sendContactMessage
│   └── resume/route.ts            # 302 to the PDF
├── components/                    # the 12 components from §4.5
├── content/
│   ├── projects/*.mdx             # one file per case study
│   ├── profile.ts                 # typed profile, experience, education, certs, skills
│   └── schema.ts                  # Zod schemas + loader functions
├── lib/
│   ├── mdx.ts                     # read + parse + validate content/projects
│   ├── mailer.ts                  # single send(payload) export — provider isolated here
│   ├── rate-limit.ts              # in-memory per-IP limiter for the contact action
│   ├── seo.ts                     # metadata helpers, JSON-LD builder
│   └── env.ts                     # Zod-validated process.env
├── public/
│   ├── Charlie_Pham_CV.pdf
│   └── projects/<slug>/*.png
├── tests/
│   ├── smoke.spec.ts              # every route renders, no console errors
│   └── a11y.spec.ts               # axe scan per route
├── .github/workflows/ci.yml
├── AGENTS.md
├── CONTENT.md
├── PLAN.md
└── package.json
```

### 5.2 Rendering strategy

Every route is statically generated at build time. `generateStaticParams` in `app/projects/[slug]/page.tsx` enumerates the MDX files. There is no runtime data fetching anywhere except the contact Server Action. Set `export const dynamic = "error"` on content routes so an accidental dynamic API call fails the build loudly instead of silently turning a page into SSR.

### 5.3 Content loading

`lib/mdx.ts` reads `content/projects/*.mdx` with `fs` at build time, parses frontmatter with `gray-matter`, and validates against the Zod schema in `content/schema.ts`. On validation failure, **throw** — a broken project entry must fail `npm run build`, not render an empty card.

Frontmatter contract (all fields required unless marked optional):

```yaml
slug: melbourne-rental-prediction     # must equal the filename
title: Predicting Airbnb Rental Prices in Melbourne
outcome: Ranked 3rd of 20 in the cohort Kaggle competition
date: 2023-10-01
featured: true
tags: [Python, Machine Learning]
stack: [Python, scikit-learn, pandas, Jupyter]
repo: https://github.com/Bibententen/Projects/tree/main/Predicting%20house%20rental%20price%20in%20Melbourne
notebook: BUSA8001-Group-Project-Final.ipynb   # optional
cover: /projects/melbourne-rental-prediction/price_distribution.png
coverAlt: Right-skewed distribution of nightly Airbnb prices in Melbourne
glance:
  problemType: Supervised regression
  dataset: 7,000 train / 3,000 test listings, 61 features
  bestModel: Histogram Gradient Boosting with log1p target
  headline: MAE A$72.89 · A$50.20 excluding the top 1% of prices
```

### 5.4 Server vs Client components

Default to Server. Only these are `"use client"`: `ThemeToggle`, `ProjectGrid` (filter state), `ContactForm`, and the mobile nav disclosure. Everything else must render without shipping JS. Enforce it by keeping the client bundle under 40 KB gzipped and adding a CI assertion on the Next build output if it is easy to parse.

### 5.5 Images

Use `next/image` with explicit `width`/`height` for every project asset. Convert the existing PNGs from the Melbourne project's `outputs/presentation_assets/` to WebP at build-prep time (a one-off `sharp` script is fine, or just commit optimised files). Lazy-load everything below the fold; the hero has no image so there is no LCP image to prioritise.

### 5.6 Theme handling (no dependency)

In `app/layout.tsx`, before `{children}`, inline a blocking script that reads `localStorage.theme`, falls back to `matchMedia("(prefers-color-scheme: dark)")`, and sets `document.documentElement.dataset.theme`. It must run before first paint to avoid a white flash on a dark-mode phone. Wrap the `localStorage` read in `try/catch` — it throws in some privacy modes. `ThemeToggle` then writes to both `localStorage` and the dataset.

### 5.7 Accessibility (WCAG 2.2 AA — non-negotiable)

- Skip link to `#main` as the first focusable element.
- One `h1` per page; heading levels never skip.
- Visible focus ring on every interactive element: `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`. Never `outline: none` without a replacement.
- All text ≥ 4.5:1 contrast, large text ≥ 3:1, UI borders ≥ 3:1. Verify the accent token against both backgrounds before committing.
- Filter chips are real `<button>` elements with `aria-pressed`.
- Form fields have `<label>` (not placeholder-as-label), `aria-describedby` for errors, and `aria-live="polite"` on the status region.
- Respect `@media (prefers-reduced-motion: reduce)` — disable all transitions and transforms.
- Target size ≥ 24×24 CSS px (WCAG 2.2 SC 2.5.8).

---

## 6. Backend design

The backend surface is deliberately one function. Resist growing it.

### 6.1 Architecture

```
Browser  ──POST(FormData)──▶  Next.js Server Action  ──▶  Turnstile verify (siteverify)
                                     │                          │
                                     │◀─────── ok/fail ─────────┘
                                     ▼
                              Zod parse + honeypot check
                                     ▼
                              Resend API  ──▶  phamduy8896@gmail.com
                                     ▼
                        return { status, message } to the client
```

No database, no queue, no ORM, no session. A contact form that stores nothing is a contact form that cannot leak anything.

### 6.2 Contact Server Action — `app/contact/actions.ts`

```ts
"use server";
```

Order of operations, strictly:

1. **Honeypot first.** A hidden field named `company_website` (visually hidden via CSS, `tabindex="-1"`, `autocomplete="off"`). If non-empty → return a *success* response without sending. Never tell a bot it failed.
2. **Rate limit.** In `lib/rate-limit.ts`: read the caller IP from the `x-forwarded-for` header via `next/headers` and keep a module-scoped `Map<string, number[]>` of recent timestamps, max 3 submissions per 10 minutes. This is per-instance and therefore imperfect — that is acceptable at this volume, and it avoids adding a Redis dependency. Note it in a code comment so the limitation is explicit.
3. **Turnstile verification.** POST the token to `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the secret. Reject on failure.
4. **Zod parse** the fields. Return field-level errors for the client to render inline.
5. **Send via Resend**, with `reply_to` set to the submitter's address so replying from Gmail goes straight back to them.
6. **Return a typed result** `{ ok: true } | { ok: false; formErrors?; fieldErrors? }`. Never leak the raw provider error to the browser; log it server-side and return a generic message.

**Resend free-tier caveat that must be handled:** without a verified sending domain, Resend only allows sending *from* `onboarding@resend.dev` and *to* the account owner's own verified address. For this site the recipient is Duy's own inbox, so this works — but it means the form cannot send confirmation copies to the submitter. Do not build that feature until a custom domain exists.

**Fallback if Resend is a problem:** switch the action body to a `fetch` POST to a Formspree endpoint (free tier: 50 submissions/month). The rest of the pipeline — honeypot, Turnstile, Zod, return shape — stays identical. Keep the provider call isolated in a `lib/mailer.ts` module with a single `send(payload)` export so swapping it is a one-file change.

### 6.3 Environment variables

`lib/env.ts` parses these with Zod at module load and throws on a missing value, so a misconfigured deploy fails at build rather than on the first submission.

| Variable | Scope | Purpose |
|---|---|---|
| `RESEND_API_KEY` | server | Email sending |
| `CONTACT_TO_EMAIL` | server | `phamduy8896@gmail.com` |
| `TURNSTILE_SECRET_KEY` | server | Bot verification |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | client | Widget render |
| `NEXT_PUBLIC_SITE_URL` | client | Canonicals, sitemap, OG absolute URLs |

Commit `.env.example` with the keys and empty values. Never commit `.env.local`. Add all five in Vercel → Settings → Environment Variables for Production **and** Preview.

### 6.4 Security posture

- Set security headers in `next.config.ts`: `Content-Security-Policy` (allow `self`, plus `challenges.cloudflare.com` for Turnstile and Vercel's analytics origin), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geolocation.
- Server Actions are POST-only and CSRF-protected by Next.js origin checks by default — do not disable that.
- Escape/strip nothing into HTML from user input; the message is only ever placed into a plain-text email body.
- No secrets in `NEXT_PUBLIC_*` beyond the two that are public by design.

---

## 7. SEO and metadata

- `metadataBase` from `NEXT_PUBLIC_SITE_URL`; per-route `generateMetadata` with unique `title` and `description`. Title template: `%s · Duy (Charlie) Pham`.
- **JSON-LD `Person` schema** in the root layout: name, alternateName (`Charlie Pham`), jobTitle, address (Sydney NSW AU), `sameAs` for LinkedIn and GitHub, `alumniOf` Macquarie University, `knowsAbout` the core skill list. This is what makes a Google search for the name surface the site correctly.
- **`CreativeWork`/`Article` JSON-LD** on each case study.
- `app/sitemap.ts` enumerates static routes + every project slug. `app/robots.ts` allows all, points to the sitemap.
- **OG images generated with `next/og`** — a default card plus a per-project card rendering the project title and headline metric on the brand background. This is what a LinkedIn or Slack share preview shows; a missing OG image looks unfinished.
- Canonical `<link>` on every page.
- After launch: submit the sitemap in Google Search Console, and set the site as the "Website" link on the LinkedIn profile.

---

## 8. Build sequence for Codex

Work in this order. Each phase is a separate commit (or PR) and must satisfy its exit criteria before the next begins. Do not scaffold all pages first and fill them in later — that produces a site that is 80% done for three weeks.

| Phase | Work | Exit criteria |
|---|---|---|
| **P0 — Foundation** | `create-next-app` (TS, App Router, Tailwind, ESLint), Node 22 pin, Prettier, `npm run check` script (`tsc --noEmit && eslint . && prettier --check .`), initial commit, push to new public repo, connect to Vercel, confirm a deploy. | Default page live on `charlie-pham.vercel.app`; CI green. |
| **P1 — Design system** | `globals.css` tokens (§4.2), fonts via `next/font`, theme script + `ThemeToggle`, `SiteHeader`, `SiteFooter`, `Prose`, `TechChip`, root layout. | Empty pages render with correct type/spacing in both themes; no flash on load. |
| **P2 — Content layer** | `content/profile.ts`, `content/schema.ts`, `lib/mdx.ts`, and **all** project MDX files authored from `CONTENT.md`. | `npm run build` passes and a deliberately broken frontmatter field fails the build. |
| **P3 — Home + About** | `Hero`, `MetricStat`, `TimelineItem`, `SkillMatrix`, `ProjectCard`; both pages complete with real copy. | Both pages pass axe with zero violations; readable at 320px width. |
| **P4 — Projects** | `/projects` with `ProjectGrid` filtering and URL sync; `/projects/[slug]` full case-study template; images optimised and committed. | All project routes statically generated; filter state survives a page reload and the back button. |
| **P5 — Contact backend** | `lib/env.ts`, `lib/mailer.ts`, Turnstile integration, Server Action, `ContactForm` with pending/success/error states. | A real submission arrives in Gmail; honeypot submission returns success but sends nothing; a 4th submission in 10 minutes is rejected. |
| **P6 — SEO + resume** | Metadata, JSON-LD, sitemap, robots, OG image routes, `/resume` redirect, CV PDF committed. | Sitemap lists every route; OG image renders in a share-preview debugger. |
| **P7 — Quality gate** | Playwright smoke + axe specs, Lighthouse CI with budgets, GitHub Actions workflow, security headers. | All §0 criteria met; CI blocks merge on failure. |
| **P8 — Launch** | Search Console submission, LinkedIn website link, CV URL check, final proofread of every word by Duy. | Duy signs off. |

### 8.1 Unattended ordering — read this before starting

The table above is the logical order. For an **unattended** build the order changes in one important way: **the quality gate moves to the front.**

Run P7's machinery as part of P0 — `npm run check`, the Playwright smoke and axe specs (initially near-empty, growing each phase), Lighthouse CI budgets, and the GitHub Actions workflow. Verification then becomes a precondition every phase must satisfy on its way in, instead of a final phase that discovers six phases' worth of problems at once. With nobody reviewing PRs, the gate *is* the reviewer.

Revised sequence: **P0 + P7 → P1 → P2 → P3 → P4 → P5 → P6 → P8.**

Each phase ends by running the full gate and fixing what it catches. A phase is not complete until the gate is green.

**Estimated effort:** roughly 3–5 focused sessions for Codex. P2 (writing real case-study content) is the phase most likely to be underestimated and is the phase that actually determines whether the site works.

---

## 9. Testing and CI

`.github/workflows/ci.yml`, on push and PR:

1. `npm ci`
2. `npm run check` — typecheck, lint, format
3. `npm run build`
4. `npx playwright test` — smoke (every route returns 200, renders its `h1`, logs no console errors) and axe (zero serious/critical violations per route)
5. `lhci autorun` with budgets: Performance ≥ 95, A11y = 100, Best Practices ≥ 95, SEO = 100, total JS < 120 KB
6. A link-checker step asserting every external `repo` URL in project frontmatter returns 200

Vercel's own preview deploy handles visual review. No unit-test framework — there is almost no pure logic to unit-test; the exceptions (`lib/mdx.ts` validation, the rate limiter) can get `node:test` cases if Codex wants them.

---

## 10. Content strategy — the part that actually matters

The technology in this plan is commodity. What separates a portfolio that gets interviews from one that gets closed is whether each project page answers *"so what?"*.

**Rules for every case study:**

- Lead with the outcome, not the method. "Ranked 3rd of 20" before "used HistGradientBoostingRegressor".
- Quantify everything that can be quantified, with units. "MAE A$72.89", not "good accuracy".
- Show the honest number. The Melbourne model's R² of 0.248 looks weak in isolation; presented alongside the p99-excluded MAE of A$50.20 and an explanation of the price distribution's skew, it becomes evidence of statistical judgement. Hiding it and being asked about it in an interview is the bad outcome.
- Name the business decision the work supports. Pricing a new listing. Targeting a marketing segment. Prioritising a diagnostic pathway.
- Include the unglamorous data work — parsing `$1,234.00` strings into numerics, splitting bathroom free-text, handling a `2022-09-09` reference date. For data-engineering and analytics-engineering roles this *is* the job, and most junior portfolios omit it entirely.
- Every project links to running code.

**Projects to include, in priority order** (full copy in `CONTENT.md`):

1. **Melbourne Airbnb rental price prediction** — strongest artefact, has a real README, real metrics, real charts, a competition ranking.
2. **Customer clustering (K-means++)** — clear commercial framing, pairs with a business report.
3. **Prostate cancer classification** — model comparison across Decision Tree / Random Forest / XGBoost, 80% accuracy with XGBoost.
4. **MapReduce, DASK & NLTK tweet pipeline** — the only distributed-processing piece; essential for the Junior Data Engineer target and currently the least presentable, so it needs the most writing work.
5. **Excel coffee sales analysis** — include, framed honestly as fundamentals: cleaning, pivots, dashboarding. Do not apologise for Excel; a large share of BI roles run on it.
6. **Tableau / Power BI dashboards** — a single combined page with embedded Tableau Public links, if the vizzes are published. If they are not published, publish them first or omit the page; a screenshot with no live link is weak.

**Before P2 begins, four things must exist that do not yet:** the CV PDF at `public/Charlie_Pham_CV.pdf`, the README-equivalent write-ups for projects 2–5 (only the Melbourne project has one), the exported chart images for each project, and confirmation of which Tableau vizzes are publicly published.

---

## 11. Portability guardrails

So that a future move off Vercel is a day, not a rewrite:

- No Vercel-specific runtime APIs beyond `@vercel/analytics` (a single import to remove).
- All email logic behind `lib/mailer.ts`.
- No `next/image` loader tied to Vercel — the default is fine and works on any Node host; if a static export is ever needed, set `images.unoptimized = true`.
- Nothing in the build depends on a Vercel environment variable other than the five in §6.3.
- If GitHub Pages ever becomes the host, the only casualty is the contact Server Action → swap to a Formspree `<form action>` and run `output: "export"`.

---

## 12. Deliberate upgrade path (post-launch, in order of value)

1. **Custom domain** (~A$20/yr) — the single highest-perceived-quality upgrade per dollar.
2. **Writing section** — 3–4 posts on real problems solved (the billing automation, the Neo4j migration). MDX infrastructure from P2 already supports it; add `content/posts/` and two routes. This is the strongest long-term differentiator and costs nothing but time.
3. **A live demo** — the Melbourne price predictor as a form on the case-study page, backed by a model exported to ONNX and run in the browser, or a Hugging Face Space called from a Route Handler. Browser-side ONNX is preferable: no cold start, no second host, no ongoing cost.
4. **Interactive dashboards** — embedded Tableau Public vizzes with proper responsive containers.
5. **Visitor analytics dashboard** — only if it becomes a *project* in its own right rather than a vanity page.

Each of these is additive. None requires revisiting the decisions in §1.

---

## 13. Approved visual design

The design was settled on a Claude Design canvas before any code: **Direction A — calm technical** (chosen over an editorial and a data-first alternative, both archived on the canvas's second page).

**Canvas:** https://claude.ai/code/artifact/17f3b852-45d0-4cc6-8a45-59620e70de67

Seven artboards, all in the Screens page: Home (desktop), Home (mobile, 390px), Projects index, Project case study, About, Contact, and a **Design tokens** artboard that is the authoritative style sheet. Codex builds to the artboards; where this document and an artboard disagree on a visual value, **the artboard wins** and this document should be corrected.

Resolved by the canvas, superseding any earlier assumption in §1 and §4:

| Decision | Value |
|---|---|
| Typeface | IBM Plex Sans (UI + prose), IBM Plex Mono (figures, dates, chips, code) — loaded via `next/font/google`, self-hosted at build |
| Role line | `Data Analyst` — no arrow, no secondary title |
| Colour tokens | As drawn on the Design tokens artboard; the §4.2 oklch values are current |
| Card treatment | 1px border, 12px radius, **no shadow at rest** — the `--shadow-card` token in §4.2 is unused; drop it |
| Control radius | 8px |
| Metric strip | Three cells in a bordered 1px-gap grid, mono numerals with `tabular-nums` |
| Project card | Abstract accent-tinted thumbnail band, title, one-line outcome, tech chips |
| Case-study "At a glance" | Four cells: Problem type · Dataset · Best model · Headline |
| Filter chips | Selected state = filled accent **plus a checkmark** (never colour alone) |
| Timeline | Two-column grid, mono date column at 190px, hairline separators |
| Footer | Hairline top border, copyright left, GitHub/LinkedIn/email right |

Still placeholder on the canvas, pending the `TODO(charlie)` answers in `CONTENT.md`: the "4 segments" result on the customer-clustering card, the Tableau/Power BI card, and all project thumbnails (abstract shapes standing in for real chart exports).
