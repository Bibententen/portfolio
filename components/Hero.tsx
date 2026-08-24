import Link from "next/link";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <p className="eyebrow">Data Analyst</p>
      <h1 id="hero-heading" className="display mt-4 max-w-3xl">
        Duy (Charlie) Pham
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-xl leading-relaxed">
        I turn messy operational data into pipelines, dashboards and models that
        people actually make decisions with.
      </p>
      <p className="mono border-border bg-surface text-text mt-6 inline-flex rounded-[var(--radius-control)] border px-3 py-2 text-sm">
        Sydney, NSW · Full Australian work rights to March 2029
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          className="bg-accent text-on-accent hover:bg-accent-hover rounded-[var(--radius-control)] px-4 py-3 font-medium"
          href="/projects"
        >
          View projects
        </Link>
        <Link
          prefetch={false}
          className="border-border hover:bg-surface rounded-[var(--radius-control)] border px-4 py-3 font-medium"
          href="/resume"
        >
          CV PDF pending
        </Link>
      </div>
    </section>
  );
}
