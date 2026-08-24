# Portfolio build report

Status: complete on `main`, published to the private [Bibententen/portfolio](https://github.com/Bibententen/portfolio) repository, and deployed to Vercel production at [charlie-pham-ruddy.vercel.app](https://charlie-pham-ruddy.vercel.app). Production still uses the direct Vercel Drop flow; the GitHub repository is available for source control and can be connected to Vercel later.

## Phase results

| Phase | Gate | Evidence |
|---|---|---|
| P0 + P7 foundation and quality gate | Green | Strict typecheck, ESLint, Prettier, production build, Playwright smoke/axe and Lighthouse CI passed on the foundation route. CI scripts, budgets and workflow are present. |
| P1 design system | Green | IBM Plex Sans/Mono, theme script, light/dark/system toggle, header, footer, prose and chip primitives passed the full gate. |
| P2 content layer | Green | Zod-validated profile and five MDX case studies build successfully; slug/filename validation is enforced. |
| P3 Home + About | Green | Home and About passed axe; content is readable at the mobile viewport used by Playwright. |
| P4 Projects | Green | Five project routes are statically generated; filter URL/reload test, semantic result tables, smoke and axe passed. |
| P5 contact backend | Green locally | Honeypot regression passed; Server Action, rate limit, Turnstile verification, Zod validation and Resend isolation build cleanly. Live delivery remains blocked by missing secrets. |
| P6 SEO + resume | Green locally | Canonicals, JSON-LD, sitemap, robots, OG routes, CI link checker and the Data Analyst CV download route passed. A final static HTML audit confirmed the Projects grid remains present without JavaScript. |
| P8 launch | Green with follow-up | Production deployment succeeded after upgrading the listed `next-mdx-remote` dependency from 5.0.0 to 6.0.0 for Vercel's security check. The public home, About, Projects, Contact and Resume routes render; sitemap and robots return 200. Search Console, LinkedIn update, live contact delivery and final content sign-off remain for Charlie. |
| P9 data-role refresh | Green | Clarified the Cisco metric, replaced the Melbourne Airbnb cover with an actual-vs-predicted validation graph, updated Australia/remote availability copy, added the latest-CV-based Data Analyst PDF, and republished the source to GitHub. The full gate passed with 24 Playwright tests and Lighthouse. |

The final gate ran 24 Playwright tests: 10 content-route smoke checks, 10 axe checks, project filter persistence, honeypot behaviour, sitemap/robots content and OG image responses. The final local Lighthouse run measured Performance 97, Accessibility 100, Best Practices 96, SEO 100 and FCP 760 ms.

The gate uses `next build --webpack` because the default Next 16 Turbopack CSS worker could not bind a process in this managed environment. It is still the same Next production build step; the change is recorded here rather than leaving the gate red.

## Definition of done from PLAN.md §0

| # | Result | Evidence / remaining work |
|---|---|---|
| 1 | Pass with URL variance | Production is live at `https://charlie-pham-ruddy.vercel.app`. Vercel assigned this available `.vercel.app` hostname instead of the planned `charlie-pham.vercel.app`; the production environment and SEO outputs use the actual live hostname. |
| 2 | Pass locally | Lighthouse CI: Performance 97, Accessibility 100, Best Practices 96, SEO 100. The exact 120 KB JS target is recorded as a blocker; the measured Home route is 155.0 KB transferred with the required Next/client runtime. |
| 3 | Pass | `npm run gate` completed `tsc --noEmit`, ESLint and Prettier successfully. |
| 4 | Pass | Static build audit found the full Projects grid in `.next/server/app/projects.html` with no client-side bailout; content routes are server-rendered. |
| 5 | Fail — outstanding | Live Resend and Turnstile keys are not available locally. Honeypot submission passes without sending. Add deployment secrets and run a real Gmail delivery test. |
| 6 | Pass | `public/Charlie_Pham_CV.pdf` is a two-page, embedded-font, ATS-friendly Data Analyst CV built from the latest supplied CV; `/resume` provides the download action. The PDF was rendered and visually inspected successfully. |
| 7 | Pass | 10 content routes pass Playwright axe scans with zero serious/critical violations. |
| 8 | Pass | No paid dependency or paid service was added; the Vercel Hobby production deployment is live. |
| 9 | Pass locally | Lighthouse CI measured FCP at 760 ms on the configured mobile run. Vercel Speed Insights will provide post-deploy field evidence. |
| 10 | Pass | `npm run linkcheck` checked all five project repository URLs successfully. |

## Remaining blockers

See [BLOCKERS.md](./BLOCKERS.md). In priority order: contact provider secrets, public Tableau/Power BI URLs, the Next runtime JavaScript budget variance, the assigned hostname variance, missing case-study dates, and the accidental untracked workspace copies noted there.

## Decisions made without review

- Followed the approved calm technical visual direction: IBM Plex fonts, deep teal accent, restrained borders, no resting card shadows, CSS abstract thumbnail bands and the specified responsive grid/timeline treatment.
- Used Australian spelling and shortened headings or sentences for length/readability without changing a fact, metric, date or role description.
- Kept the project structure within the PLAN.md file tree and used server components by default. The only client islands are the theme toggle, mobile nav, project filter and contact form.
- Used `useSyncExternalStore` for the project URL snapshot instead of `useSearchParams` so the required filter remains shareable while the complete project grid is statically present with JavaScript disabled. `router.replace` still owns URL updates.
- Used the existing GitHub `Projects` remote and its known folder names to construct the five project source URLs; the link checker confirms them.
- Reused the supplied Melbourne PNG exports. Other optional screenshots remain represented by the approved abstract thumbnail treatment.
- Made case-study dates and credential URLs optional because CONTENT.md does not supply them; no date or credential URL was invented.
- Kept the dashboards page omitted because CONTENT.md marks its public URLs as blocking.
- Built a focused two-page Data Analyst CV from the latest supplied CV, keeping every role, metric, date, certification and work-right detail traceable to that source. The `/resume` route exposes it as a download without inventing a redirect behaviour.
- Generated the Melbourne Airbnb actual-vs-predicted thumbnail from the project's documented validation split and model pipeline; no illustrative metric or unrelated chart was substituted.
- Allowed empty provider environment values during local static builds, with the Server Action rejecting unconfigured live submissions. This makes the missing-secret path testable without inventing credentials.
- Loaded Vercel Analytics and Speed Insights only when `VERCEL=1`, avoiding expected local 404 script requests while preserving production telemetry.
- Used the Webpack build path for the managed-worker limitation documented above. No dependency outside PLAN.md §1.2 was added.
- Upgraded the listed `next-mdx-remote` dependency from 5.0.0 to 6.0.0 after Vercel rejected the first production build for its vulnerable-version check; the full gate passed after the lockfile update.
- Used Vercel Drop for the production upload because GitHub was not connected. Uploaded only a temporary copy of `portfolio`, excluding local dependency/build caches and all sibling workspace directories.
- Created the dedicated GitHub repository as private because the source includes personal contact details and the CV; the live Vercel site remains public.

## Exact steps left for Charlie

1. Add these four remaining environment variables in Vercel → Settings → Environment Variables for both Preview and Production:
   - `RESEND_API_KEY` — a real Resend API key.
   - `CONTACT_TO_EMAIL` — `phamduy8896@gmail.com`.
   - `TURNSTILE_SECRET_KEY` — the Cloudflare Turnstile secret.
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY` — the public Turnstile site key.
   `NEXT_PUBLIC_SITE_URL` is already set to `https://charlie-pham-ruddy.vercel.app` for Production and Preview.
2. If continuous Git-based deploys are wanted, connect the private `Bibententen/portfolio` repository to the existing Vercel project. The current production deployment was completed by direct upload.
3. If a custom domain is bought later, add it in Vercel → Settings → Domains, use the exact A/CNAME records Vercel displays, set `NEXT_PUBLIC_SITE_URL` to the new origin, and redeploy.
4. Add the published, embeddable Tableau Public URLs and confirm the Power BI work to include before creating the dashboards case study.
5. Optionally provide credential URLs, dashboard screenshots, case-study dates, precision/recall/F1 for the prostate model, and a verified MapReduce benchmark; each is non-blocking and currently omitted or described honestly.
6. After adding provider secrets, test a real contact submission to Gmail, a honeypot submission, and the fourth submission within ten minutes; then submit the sitemap to Google Search Console, add the website link to LinkedIn, and do the final word-by-word proofread.
