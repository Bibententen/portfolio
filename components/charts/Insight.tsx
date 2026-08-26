// Server-rendered insight callout. Semantic, accessible, theme-token driven.

export function Insight({
  title,
  children,
  tone = "accent",
}: Readonly<{
  title: string;
  children: React.ReactNode;
  tone?: "accent" | "warning" | "success";
}>) {
  const tones: Record<string, string> = {
    accent: "border-accent bg-accent-subtle",
    warning:
      "border-[var(--color-warning)] bg-[color-mix(in_oklab,var(--color-warning)_8%,transparent)]",
    success:
      "border-[var(--color-success)] bg-[color-mix(in_oklab,var(--color-success)_8%,transparent)]",
  };
  return (
    <aside
      className={`my-8 rounded-[var(--radius-card)] border p-5 ${tones[tone]}`}
    >
      <p className="text-sm font-semibold">{title}</p>
      <div className="text-muted mt-2 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
