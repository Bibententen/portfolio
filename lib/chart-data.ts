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
};

export const confusionMatrices: Record<string, MatrixCell[]> = {
  "prostate-xgb": [
    { label: "true neg", count: 11, kind: "tn" },
    { label: "false pos", count: 3, kind: "fp" },
    { label: "false neg", count: 3, kind: "fn" },
    { label: "true pos", count: 13, kind: "tp" },
  ],
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
