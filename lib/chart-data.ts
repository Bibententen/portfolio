// Typed chart datasets for case-study MDX.
// MDX props are limited to strings/booleans in this pipeline (numbers,
// arrays and objects are stripped by next-mdx-remote's RSC eval), so charts
// reference data by a string `id` looked up here. All numbers are facts from
// the case studies — never invented.

export type BarDatum = {
  label: string;
  value: number;
  valueLabel: string;
  highlight?: boolean;
};

export type MatrixCell = {
  label: string;
  count: number;
  kind: "tp" | "fp" | "fn" | "tn";
};

export type Segment = {
  name: string;
  highlight?: boolean;
  rows: { label: string; value: string; widthPct: number }[];
};

export type PipelineStage = { name: string; detail: string };

export const barCharts: Record<string, BarDatum[]> = {
  "melbourne-mae": [
    { label: "HistGB", value: 72.89, valueLabel: "72.9", highlight: true },
    { label: "ElasticNet", value: 84.76, valueLabel: "84.8" },
    { label: "Ridge", value: 84.9, valueLabel: "84.9" },
  ],
  "prostate-top-correlations": [
    { label: "Perimeter", value: 0.6, valueLabel: "0.60", highlight: true },
    { label: "Area", value: 0.53, valueLabel: "0.53" },
    { label: "Compactness", value: 0.51, valueLabel: "0.51" },
  ],
  "clustering-gender-split": [
    { label: "Male", value: 54.3, valueLabel: "54.3%", highlight: true },
    { label: "Female", value: 45.7, valueLabel: "45.7%" },
  ],
  "clustering-marital-split": [
    { label: "Single", value: 50.3, valueLabel: "50.3%", highlight: true },
    { label: "Not single", value: 49.7, valueLabel: "49.7%" },
  ],
  // Education categories sum to 85.7% of the sample (69.3 + 14.6 + 1.8); the
  // 14.3% remainder is an arithmetic derivation, not a supplied figure, and is
  // labelled "Other / unspecified" rather than invented as a named category.
  "clustering-education-split": [
    { label: "High school", value: 69.3, valueLabel: "69.3%", highlight: true },
    { label: "Undergraduate", value: 14.6, valueLabel: "14.6%" },
    { label: "Other / unspecified", value: 14.3, valueLabel: "14.3%" },
    { label: "Graduate", value: 1.8, valueLabel: "1.8%" },
  ],
  "clustering-employment-split": [
    {
      label: "Skilled employee / official",
      value: 55.7,
      valueLabel: "55.7%",
      highlight: true,
    },
    { label: "Unemployed / unskilled", value: 31.7, valueLabel: "31.7%" },
    { label: "Managers", value: 12.7, valueLabel: "12.7%" },
  ],
};

export const confusionMatrices: Record<string, MatrixCell[]> = {
  // Intentionally empty: the full TP/TN split for the prostate project is not
  // in the verified fact list (only 80% accuracy, 3 FN, 3 FP, 30-sample held-out
  // split are known). The case study ships an Insight stat-pair instead.
};

export const pipelineFlows: Record<string, PipelineStage[]> = {
  "tweet-pipeline": [
    {
      name: "Clean & enrich",
      detail: "tokenise · stem · NER · topics · sentiment",
    },
    { name: "Word frequency", detail: "MapReduce count" },
    { name: "Geography", detail: "count by city" },
    { name: "Sorting", detail: "MapReduce + merge sort" },
    { name: "Keyword rank", detail: "TF-IDF · DASK sort" },
  ],
  "coffee-pipeline": [
    { name: "Source tables", detail: "orders · customers · products" },
    { name: "Data model", detail: "lookups joining fact to dimensions" },
    { name: "Dashboard", detail: "timeline + 3 slicers, 4 linked views" },
  ],
};

export const segmentProfiles: Record<string, Segment[]> = {
  "clothing-customers": [
    {
      name: "Lower",
      rows: [
        { label: "Age", value: "~31", widthPct: 55 },
        { label: "Income", value: "~A$70k", widthPct: 42 },
      ],
    },
    {
      name: "Mid",
      highlight: true,
      rows: [
        { label: "Age", value: "~38", widthPct: 72 },
        { label: "Income", value: "~A$130k", widthPct: 62 },
      ],
    },
    {
      name: "Upper",
      rows: [
        { label: "Age", value: "~45", widthPct: 88 },
        { label: "Income", value: "~A$250k", widthPct: 100 },
      ],
    },
  ],
};
