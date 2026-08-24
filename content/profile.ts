export const profile = {
  name: "Duy (Charlie) Pham",
  shortName: "Charlie",
  role: "Data Analyst",
  location: "Strathfield, Sydney NSW",
  email: "phamduy8896@gmail.com",
  linkedin: "https://linkedin.com/in/duy-pham-15722a1b9",
  github: "https://github.com/Bibententen/portfolio",
  site: "https://charlie-pham-ruddy.vercel.app",
} as const;

export type Experience = Readonly<{
  company: string;
  role: string;
  dates: string;
  location?: string;
  bullets: readonly string[];
}>;

export type Education = Readonly<{
  qualification: string;
  institution: string;
  dates: string;
  result: string;
  detail?: string;
}>;

export type Certification = Readonly<{
  name: string;
  issuer: string;
  date: string;
}>;

export const experience: readonly Experience[] = [
  {
    company: "Cisco Australia (via CH Reynolds)",
    role: "Data Analyst",
    dates: "Nov 2024 – Present",
    location: "Sydney",
    bullets: [
      "Extracts data from databases and flat sources using SQL and Python.",
      "Cleans and validates data to maintain integrity and improve data quality.",
      "Builds automation for manual invoice and billing data processing.",
      "Used AI-assisted workflows to automate 95% of manual billing activity across 30 accounts, improving consistency, cycle time and reporting visibility.",
      "Partners with operations, finance and technical stakeholders to clarify requirements, investigate issues, document business logic and translate questions into analysis.",
    ],
  },
  {
    company: "Jung Talents",
    role: "Data Analyst",
    dates: "Jun 2024 – Oct 2024",
    bullets: [
      "Extracted data from multiple sources with SQL and Python.",
      "Cleaned, validated and analysed data to support business decisions.",
      "Categorised data by group, segment and category for targeted insights.",
      "Built real-time dashboards and reports.",
      "Tested outputs for accuracy and performance, agreed KPIs with stakeholders, and documented processes and findings.",
    ],
  },
  {
    company: "FPT Information Systems",
    role: "Data Analyst",
    dates: "Dec 2023 – May 2024",
    bullets: [
      "Led a Neo4j graph database integration covering data modelling, migration and quality checks using Neo4j, Apache Spark and Airflow.",
      "Built Spark and Airflow ETL processes to support the data transition and improve database efficiency.",
      "Developed a time-series clustering model to classify product demand for supply chain solutions.",
    ],
  },
  {
    company: "LG Electronics",
    role: "Logistics Analyst",
    dates: "Jul 2020 – Mar 2021",
    bullets: [
      "Optimised delivery monitoring through ERP and Excel, reducing delivery delays by 20%.",
      "Verified costs and produced logistics cost reports, improving reporting accuracy by 30%.",
      "Analysed delivery lead times, increasing on-time deliveries by 15%.",
      "Managed serial number and warranty tracking, decreasing processing errors by 25%.",
      "Supported stock planning, transfers and inventory management in ERP, reducing excess inventory by 18%.",
    ],
  },
] as const;

export const education: readonly Education[] = [
  {
    qualification: "Master of Business Analytics",
    institution: "Macquarie University",
    dates: "Jul 2021 – Nov 2023",
    result: "WAM 80/100",
    detail:
      "Strong results in Business Analytics, Big Data Technologies and Mathematical Modelling.",
  },
  {
    qualification: "Bachelor of Business Administration",
    institution: "Hanoi University of Science and Technology",
    dates: "Sep 2016 – Jun 2020",
    result: "WAM 72/100",
  },
] as const;

export const certifications: readonly Certification[] = [
  {
    name: "Introduction to Data Analytics in Google Cloud",
    issuer: "Google Cloud",
    date: "Apr 2024",
  },
  { name: "Neo4j Certified Professional", issuer: "Neo4j", date: "Jan 2024" },
  {
    name: "Neo4j Graph Data Science Certification",
    issuer: "Neo4j",
    date: "Jan 2024",
  },
] as const;

export const skillGroups = [
  ["Languages", ["Python", "SQL", "R"]],
  ["Data & storage", ["Snowflake", "Neo4j", "MySQL", "MongoDB"]],
  [
    "Processing & orchestration",
    ["Apache Spark", "Airflow", "DASK", "MapReduce", "NLTK"],
  ],
  ["BI & visualisation", ["Tableau", "Power BI", "Excel"]],
  [
    "Practice",
    [
      "ETL",
      "data cleaning & validation",
      "dashboard development",
      "KPI reporting",
      "analytics engineering",
      "demand planning",
      "stakeholder communication",
    ],
  ],
] as const;

export const homeSkills = [
  "Python",
  "SQL",
  "Snowflake",
  "Neo4j",
  "Spark",
  "Airflow",
  "Tableau",
  "Power BI",
  "Excel",
  "MongoDB",
  "scikit-learn",
  "ETL",
] as const;
