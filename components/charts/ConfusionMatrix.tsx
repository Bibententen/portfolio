// Server-rendered confusion matrix. SVG only — no client JS, no dependencies.
// Cell colour encodes magnitude; the false-negative cell is emphasised because
// in a medical context that is the expensive error.
// Data is looked up by string `id` (see lib/chart-data.ts).

import { confusionMatrices, type MatrixCell } from "@/lib/chart-data";

export function ConfusionMatrix({
  id,
  title,
  note,
}: Readonly<{ id: string; title: string; note?: string }>) {
  const matrix: MatrixCell[] = confusionMatrices[id] ?? [];
  const cell = 84;
  const pad = 8;
  const size = cell * 2 + pad;
  const max = Math.max(...matrix.map((m) => m.count), 1);

  if (matrix.length === 0) return null;

  const colourFor = (kind: MatrixCell["kind"]) => {
    switch (kind) {
      case "tp":
        return "var(--color-success)";
      case "tn":
        return "var(--color-muted)";
      case "fp":
        return "var(--color-warning)";
      case "fn":
        return "var(--color-accent)";
    }
  };

  return (
    <figure className="border-border bg-surface my-8 rounded-[var(--radius-card)] border p-6">
      <figcaption className="text-sm font-medium">{title}</figcaption>
      <div className="mt-4 flex flex-wrap items-start gap-8">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={title}
          className="h-auto w-64"
        >
          {/* row/col headers */}
          <text
            x={size / 2}
            y={14}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[11px]"
          >
            Predicted
          </text>
          <text
            x={14}
            y={size / 2}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[11px]"
          >
            Actual
          </text>
          <text
            x={cell + pad / 2 + 10}
            y={32}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[10px]"
          >
            benign
          </text>
          <text
            x={cell * 1.5 + pad + 10}
            y={32}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[10px]"
          >
            malignant
          </text>
          <text
            x={14}
            y={cell + pad / 2 + 16}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[10px]"
          >
            benign
          </text>
          <text
            x={14}
            y={cell * 1.5 + pad + 16}
            textAnchor="middle"
            className="fill-[var(--color-muted)] text-[10px]"
          >
            malignant
          </text>
          {matrix.map((m, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = pad / 2 + 10 + col * (cell + pad);
            const y = 40 + row * (cell + pad);
            const opacity = 0.25 + 0.65 * (m.count / max);
            return (
              <g key={m.label}>
                <rect
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  rx="8"
                  fill={colourFor(m.kind)}
                  opacity={opacity}
                />
                <text
                  x={x + cell / 2}
                  y={y + cell / 2 + 5}
                  textAnchor="middle"
                  className="fill-[var(--color-text)] text-lg font-semibold"
                >
                  {m.count}
                </text>
                <text
                  x={x + cell / 2}
                  y={y + cell - 10}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] text-[10px]"
                >
                  {m.label}
                </text>
              </g>
            );
          })}
        </svg>
        {note ? (
          <p className="text-muted max-w-xs text-sm leading-relaxed">{note}</p>
        ) : null}
      </div>
    </figure>
  );
}
