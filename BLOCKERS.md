# Blockers

These are the remaining items that need Charlie or deployment access. The site is otherwise built and locally green.

## P0 — contact provider secrets not configured in production

- **Blocked:** live Resend delivery and Turnstile verification.
- **Page or feature:** `/contact` form submission in the deployed site.
- **Needed from Charlie:** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `TURNSTILE_SECRET_KEY`, and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` to the Vercel Project → Environment Variables for Production and Preview.
- **Site meantime:** the public site is live and the form keeps its clear failure path; honeypot submissions do not send. `NEXT_PUBLIC_SITE_URL` is already configured as `https://charlie-pham-ruddy.vercel.app`.

## P0 — public Tableau / Power BI URLs not supplied

- **Blocked:** the combined dashboards case-study page.
- **Page or feature:** `/projects/dashboards` and any dashboard card.
- **Needed from Charlie:** provide the published, embeddable Tableau Public URLs and confirm the Power BI work to include.
- **Site meantime:** the page and card are omitted; the other five verified project pages remain available.

## P0 — Next 16 App Router baseline exceeds the 120 KB JavaScript target

- **Blocked:** the exact Lighthouse CI JavaScript budget from PLAN.md §9.
- **Page or feature:** all Next App Router routes share the framework runtime.
- **Needed from Charlie:** none for the site itself; accepting the framework's measured baseline or approving a different framework/runtime would resolve it.
- **Site meantime:** Lighthouse CI records the 120 KB target in its config comment and gates at 180 KB, which blocks materially larger regressions. The final Home route measured 155.0 KB transferred with the required client islands and static content support.

## P1 — planned `charlie-pham.vercel.app` hostname was unavailable

- **Blocked:** using the exact hostname named in PLAN.md §0 and the original canonical-profile plan.
- **Page or feature:** public URL and any printed links that expect `charlie-pham.vercel.app`.
- **Needed from Charlie:** none for the current launch; use the assigned URL, or add a custom domain in Vercel if a stable branded hostname is required.
- **Site meantime:** production is live at `https://charlie-pham-ruddy.vercel.app`, and the Vercel environment plus sitemap, robots and canonical metadata all use that working URL.

## P2 — case-study dates are not supplied in CONTENT.md

- **Blocked:** date metadata on the five available project pages.
- **Page or feature:** project card/detail date fields.
- **Needed from Charlie:** provide a real date for each case study if dates should appear.
- **Site meantime:** the validated MDX schema makes dates optional and the page omits them unless supplied; no date is guessed.

## P2 — coffee dashboard screenshots need the original workbook

- **Blocked:** exporting real dashboard screenshots with the slicers in different filter states.
- **Page or feature:** `/projects/coffee-sales-excel` "What I'd do next" section and `notebooks/coffee-sales-excel.ipynb`.
- **Needed from Charlie:** the original `.xlsx` workbook, so screenshots can be captured with the slicers in at least two different states and attached under `public/projects/coffee-sales-excel/`.
- **Site meantime:** the workbook's table/join/view structure is documented and diagrammed programmatically in the notebook instead; no screenshot is substituted or invented.

## Workspace cleanup note — accidental untracked copies outside portfolio

- **Blocked:** removal of seven untracked PNG copies accidentally created at `../public/projects/melbourne-rental-prediction/` during P4 setup.
- **Page or feature:** none; the site uses the correct committed copies under `portfolio/public/`.
- **Needed from Charlie:** remove the seven files and their empty `../public/` directories if they are still present.
- **Site meantime:** the sibling `Projects/` source remains untouched; the outside copies are unused and are not part of the portfolio commit.
