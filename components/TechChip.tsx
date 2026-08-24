export function TechChip({ children }: Readonly<{ children: string }>) {
  return (
    <span className="mono border-border bg-surface text-muted inline-flex rounded-[var(--radius-control)] border px-2 py-1">
      {children}
    </span>
  );
}
