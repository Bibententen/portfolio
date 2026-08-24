export function MetricStat({
  number,
  label,
}: Readonly<{ number: string; label: string }>) {
  return (
    <div className="min-w-0 p-5">
      <p className="mono text-accent text-2xl font-semibold tabular-nums">
        {number}
      </p>
      <p className="text-muted mt-2 text-sm leading-relaxed">{label}</p>
    </div>
  );
}
