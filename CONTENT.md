# Content Source of Truth

Every word on the site comes from here. Codex must not invent facts.

`TODO(charlie)` marks something only Charlie can supply. Each one says whether it **blocks** a page. A blocking TODO means: build everything else, omit that one page or element, and record it in `BLOCKERS.md` — never stop the build, and never invent a substitute. A non-blocking TODO means: ship the page without that detail and note it.

Canonical upstream source: `~/Documents/Duy personal AI/second_brain/Charlie_Pham_Profile.md`. If the two disagree, the profile document wins and this file should be corrected.

---

## 1. Identity

| Field | Value |
|---|---|
| Display name | Duy (Charlie) Pham |
| Short name | Charlie |
| Role line | Data Analyst |
| Location | Strathfield, Sydney NSW |
| Email | phamduy8896@gmail.com |
| LinkedIn | https://linkedin.com/in/duy-pham-15722a1b9 |
| GitHub | https://github.com/Bibententen |
| Site | https://charlie-pham.vercel.app |

**Work rights (render as a badge on Home, and as a panel on About):**
Temporary Graduate visa (subclass 485). Unrestricted Australian work rights until **12 March 2029**. No immediate sponsorship required to start; open to employer sponsorship for the longer term.

**Target roles:** Data Analyst is the stated role everywhere on the site. Business Intelligence Analyst, Analytics Engineer, Junior Data Engineer and Demand Planning Analyst remain valid targets on the CV, but the site does not lead with them.

---

## 2. Hero copy (Home)

> **Duy (Charlie) Pham**
> Data Analyst
>
> I turn messy operational data into pipelines, dashboards and models that people actually make decisions with.
>
> `Sydney, NSW · Full Australian work rights to March 2029`

CTAs: **View projects** · **Download CV**

---

## 3. Metric strip (Home)

| Number | Label | Source |
|---|---|---|
| 95% | of manual billing activity automated at Cisco | Cisco/CH Reynolds role |
| 30 | accounts brought into the automated workflow | Cisco/CH Reynolds role |
| 3rd / 20 | Kaggle competition ranking, Melbourne rental model | Macquarie BUSA8001 |

---

## 4. About — intro prose

Two paragraphs, first person. Draft (Charlie to approve or rewrite):

> I am a Sydney-based data analyst. Most of my day-to-day is the unglamorous half of analytics: pulling data out of databases and flat files with SQL and Python, working out why two sources disagree, and turning a vague business question into something a query can actually answer. At Cisco I have spent the last year automating billing and invoice processing that used to be done by hand across 30 accounts.
>
> Before that I worked on a Neo4j graph migration at FPT Information Systems, built demand-clustering models for supply chain planning, and ran operational reporting for LG Electronics' logistics team. I hold a Master of Business Analytics from Macquarie University. I am looking for data analyst roles in Sydney.

---

## 5. Experience (About — reverse chronological)

### Cisco Australia (via CH Reynolds) — Data Analyst
**Nov 2024 – Present · Sydney**
- Extracts data from databases and flat sources using SQL and Python.
- Cleans and validates data to maintain integrity and improve data quality.
- Builds automation for manual invoice and billing data processing.
- Used AI-assisted workflows to automate 95% of manual billing activity across 30 accounts, improving consistency, cycle time and reporting visibility.
- Partners with operations, finance and technical stakeholders to clarify requirements, investigate issues, document business logic and translate questions into analysis.

### Jung Talents — Data Analyst
**Jun 2024 – Oct 2024**
- Extracted data from multiple sources with SQL and Python.
- Cleaned, validated and analysed data to support business decisions.
- Categorised data by group, segment and category for targeted insights.
- Built real-time dashboards and reports.
- Tested outputs for accuracy and performance, agreed KPIs with stakeholders, and documented processes and findings.

### FPT Information Systems — Data Analyst
**Dec 2023 – May 2024**
- Led a Neo4j graph database integration covering data modelling, migration and quality checks using Neo4j, Apache Spark and Airflow.
- Built Spark and Airflow ETL processes to support the data transition and improve database efficiency.
- Developed a time-series clustering model to classify product demand for supply chain solutions.

### LG Electronics — Logistics Analyst
**Jul 2020 – Mar 2021**
- Optimised delivery monitoring through ERP and Excel, reducing delivery delays by 20%.
- Verified costs and produced logistics cost reports, improving reporting accuracy by 30%.
- Analysed delivery lead times, increasing on-time deliveries by 15%.
- Managed serial number and warranty tracking, decreasing processing errors by 25%.
- Supported stock planning, transfers and inventory management in ERP, reducing excess inventory by 18%.

---

## 6. Education

- **Master of Business Analytics** — Macquarie University, Jul 2021 – Nov 2023. WAM 80/100. Strong results in Business Analytics, Big Data Technologies and Mathematical Modelling.
- **Bachelor of Business Administration** — Hanoi University of Science and Technology, Sep 2016 – Jun 2020. WAM 72/100.

## 7. Certifications

- Introduction to Data Analytics in Google Cloud — Google Cloud, Apr 2024. `TODO(charlie): credential URL`
- Neo4j Certified Professional — Neo4j, Jan 2024. `TODO(charlie): credential URL`
- Neo4j Graph Data Science Certification — Neo4j, Jan 2024. `TODO(charlie): credential URL`

## 8. Skill matrix (About)

| Group | Skills |
|---|---|
| Languages | Python, SQL, R |
| Data & storage | Snowflake, Neo4j, MySQL, MongoDB |
| Processing & orchestration | Apache Spark, Airflow, DASK, MapReduce, NLTK |
| BI & visualisation | Tableau, Power BI, Excel |
| Practice | ETL, data cleaning & validation, dashboard development, KPI reporting, analytics engineering, demand planning, stakeholder communication |

Home-page chip strip (top 12): Python · SQL · Snowflake · Neo4j · Spark · Airflow · Tableau · Power BI · Excel · MongoDB · scikit-learn · ETL

---

## 9. Projects

### 9.1 Melbourne Airbnb rental price prediction — `melbourne-rental-prediction`

**Status:** ready to write up. Full README already exists at `Projects/Predicting house rental price in Melbourne/README.md` — port it, do not rewrite from memory.

- **Outcome line:** Ranked 3rd of 20 in the cohort Kaggle competition.
- **Problem:** hosts must set a nightly price before they have booking history. Predict a fair nightly price from listing attributes.
- **Data:** 7,000 training rows × 61 columns, 3,000 test rows. Location, property characteristics, host profile, availability windows, review scores, amenities, free-text fields.
- **Notable data work:** parsing currency and percentage strings to numerics; splitting free-text `bathrooms` into a count plus shared/private flags; converting `host_since`/`first_review`/`last_review` to age-in-days against a `2022-09-09` reference date; deriving amenity count and 16 amenity indicators; rare-category grouping before one-hot encoding.
- **Approach:** two-stage selection — benchmark five models (Ridge, Elastic Net, Random Forest, Extra Trees, Histogram Gradient Boosting) on a 2,000-row subset, validate the top three on the full 80/20 split, train the winner on all rows.
- **Results (full validation):** Histogram Gradient Boosting — RMSE 356.83, MAE 72.89, R² 0.248; excluding the top 1% of target prices, RMSE 96.90 and MAE 50.20. Final pipeline uses a `log1p` target transform via `TransformedTargetRegressor`.
- **Honest framing to keep:** R² 0.248 is low *because* the price distribution is heavily right-skewed and a handful of extreme listings dominate squared error — which is exactly why the p99-excluded metrics are reported alongside it.
- **Assets:** `outputs/presentation_assets/` already contains the workflow diagram, price distribution, room-type price chart, location price map, model comparison and metrics charts. Copy to `public/projects/melbourne-rental-prediction/`.
- **Tags:** Python, Machine Learning · **Stack:** Python, scikit-learn, pandas, Jupyter

### 9.2 Customer segmentation with K-means++ — `customer-clustering`

**Status:** facts confirmed from `BUSINESS REPORT.docx`. Ready to write up.

- **Outcome line:** Three segments that told a clothing retailer which customers to design and price for.
- **Problem:** a small clothing store was building a marketing plan without knowing who its customers were. Which segment should it focus on?
- **Data:** 2,000 customer records — gender, marital status, age, education, income, occupation, settlement size.
- **What the data looked like:** 54.3% male / 45.7% female; 50.3% single; 69.3% finished high school, 14.6% undergraduate, 1.8% graduate school; 55.7% skilled employees or officials, 31.7% unemployed or unskilled, 12.7% managers; most customers aged 25–40.
- **Approach:** the elbow method to choose cluster count — the curve flattened past 4, and 3 was chosen. Then **two** clustering methods run independently, K-means++ and agglomerative, as a cross-check. Both produced the same three groups with different labels, which is the real finding: the segmentation is a property of the customers, not of the algorithm.
- **Results — three segments:**

| Segment | Age | Income | Profile |
|---|---:|---:|---|
| Mid (target) | ~38 | ~$130,000 | Male, single, high school, skilled employee/official, small or mid-sized city |
| Lower | ~31 | ~$70,000 | Female, non-single, high school, unemployed, small city |
| Upper | ~45 | ~$250,000 | Highest age and income, smallest group |

- **Business recommendation:** focus on the mid segment, then the lower. Both are price-sensitive and promotion-responsive, most did not study past high school, and both sit under $130k income — so the range should be casual, comfortable and affordable. With gender split near 50/50, keep the range balanced or lean unisex.
- **Angle for the write-up:** lead with the recommendation, not the algorithm. The strongest technical point is running two clustering methods and showing they agree — say why that matters.
- **Tags:** Python, Machine Learning · **Stack:** Python, scikit-learn, pandas

### 9.3 Prostate cancer classification — `prostate-cancer-classification`

**Status:** facts confirmed from `Prostate Cancer Classification.docx`. Ready to write up.

- **Outcome line:** 80% accuracy with XGBoost — and three false negatives that matter more than the accuracy figure.
- **Problem:** classify a biopsy as benign or malignant from tumour measurements. Prostate cancer is the most commonly diagnosed cancer in Australia (~24,200 male diagnoses in 2022) and has one of the highest survival rates when caught early, which is what makes a false negative so much worse than a false positive.
- **Data:** 100 biopsies, 10 variables (radius, texture, perimeter, area, smoothness, compactness, symmetry, fractal dimension, plus id and the diagnosis label). 62 malignant, 38 benign. Missing values present; filled with the column median since every predictor is numeric.
- **Strongest predictors:** perimeter (0.60 correlation with diagnosis), area (0.53), compactness (0.51).
- **Approach:** 70/30 train/test split, three classifiers compared — decision tree, random forest, XGBoost.
- **Results:** XGBoost best at 80% accuracy, with **3 false negatives** (malignant predicted benign) and 3 false positives.
- **Angle for the write-up — this is the important one:** do not lead with accuracy. On a 100-row medical dataset with a 62/38 class split, 80% accuracy is a weak claim, and the 3 false negatives are the number a reviewer will ask about. Write it as: what the model got wrong, why a false negative is the expensive error here, and what you would change (threshold tuning toward recall, stratified cross-validation instead of a single 70/30 split, and far more data). Naming the limitations yourself is worth more than the accuracy figure.
- `TODO(charlie): optional — re-run the notebook to record precision, recall and F1 alongside accuracy. Not blocking; the confusion-matrix counts above are enough to write the page honestly.`
- **Tags:** Python, Machine Learning · **Stack:** Python, XGBoost, scikit-learn, pandas

### 9.4 Distributed tweet processing — MapReduce, DASK & NLTK — `tweet-text-pipeline`

**Status:** facts confirmed from `Documentation.docx` and the result files. Ready to write up.

- **Outcome line:** A five-stage NLP pipeline over 10,000 tweets, parallelised with MapReduce and DASK.
- **Why it matters:** the only distributed-processing project, and the strongest evidence for data-engineering work.
- **Data:** 10,000 tweets read from MongoDB, with text, id and address fields.
- **Pipeline:**
  1. **Clean and enrich** (`task1.py`) — tokenise, strip URLs, numbers and non-alphabetical characters, remove stop words, stem to root form. Then keyword extraction, named-entity tagging via `nltk.pos_tag`, topic modelling with a gensim bag-of-words model, and sentiment scoring with `SentimentIntensityAnalyzer`.
  2. **Word frequency** (`task2.py`) — MapReduce word count. Result: **22,157 unique word stems** across the corpus.
  3. **Geography** (`task3.py`) — MapReduce count by city, parsed out of the tweet address field with explicit fallbacks for no-location, non-Australian and no-city records. Perth was the most frequent city at 363 tweets.
  4. **Sorting** (`task4.py`, `task4_2.py`) — group tweets by id and sort, implemented twice: once with MapReduce and once with a hand-written merge sort, timed against each other.
  5. **Keyword ranking** (`task5.py`) — TF-IDF with scikit-learn, then the sort parallelised across a 100-partition DASK dataframe.
- **Honest limitation to include (it is already in the documentation):** DASK is only applied at the sorting step, because TF-IDF itself is computed with scikit-learn. Saying so is better than implying the whole pipeline is distributed.
- `TODO(charlie): the documentation records the MapReduce sort at 7.9e-6 s against 0.015 s for merge sort. That gap is implausible for 10,000 records and reads like a timing-harness artefact. Either re-time it properly or leave the number off the site — an interviewer will ask, and "I did not verify it" is a bad answer. Not blocking: the page works without a benchmark.`
- **Tags:** Python, Big Data · **Stack:** Python, MongoDB, MapReduce, DASK, NLTK, gensim, scikit-learn

### 9.5 Coffee sales analysis in Excel — `coffee-sales-excel`

**Status:** workbook inspected. Ready to write up.

- **Outcome line:** An interactive sales dashboard built from three raw tables, with no add-ins.
- **What is actually in the workbook:** three source tables (`orders`, `customers`, `products`), joined with lookups; a `Dashboard` sheet driven by three pivot-backed views — `TotalSales` over time, `CountryBarChart`, and `Top5Customers`; a date timeline control; and slicers for loyalty-card status, roast type and pack size.
- **Angle:** fundamentals, stated without apology. A timeline plus three slicers driving four linked views is a real dashboard — the same modelling thinking as a BI tool, just in Excel. A large share of BI and demand-planning roles run on exactly this, so show the rigour rather than treating it as the junior project.
- `TODO(charlie): optional — export two or three screenshots of the dashboard with the slicers in different states. Not blocking; the page can ship with a description and the workbook download.`
- **Tags:** Excel, BI &amp; Dashboards · **Stack:** Excel, PivotTables, slicers, lookups

### 9.6 Tableau & Power BI dashboards — `dashboards`

**Status:** blocked. Profile lists Tableau dashboards for Spotify, HR analytics, e-commerce and traffic accident analysis, plus Power BI work from the PwC Switzerland job simulation.

`TODO(charlie): which of these are published publicly (Tableau Public URLs)? Only published, embeddable vizzes should get a page — a static screenshot with no live link is weaker than omitting the page entirely.`

---

## 10. Contact page copy

> **Get in touch**
>
> I am open to data analyst roles in Sydney. I read every message and usually reply within a couple of days.

Alongside the form: email, LinkedIn, GitHub, and the CV download.

---

## 11. Assets still needed before build phase P2

Only two of these block a page. Everything else is optional polish.

| # | Item | Blocking? |
|---|---|---|
| 1 | `public/Charlie_Pham_CV.pdf` — current CV export | **Yes** — the Download CV button has nothing to point at |
| 2 | Tableau Public URLs for §9.6 | **Yes, for that page only** — build the other five and omit this one until the URLs exist |
| 3 | Chart/screenshot exports for projects 9.2 – 9.5 | No — abstract placeholder thumbnails ship fine |
| 4 | Credential URLs for the three certifications | No — render the certs without links |
| 5 | Precision/recall/F1 for 9.3, and a re-timed benchmark for 9.4 | No — both pages are honest without them |
| 6 | A professional headshot | No — omit rather than use a casual photo |
