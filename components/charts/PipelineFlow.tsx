// Server-rendered pipeline flow diagram. SVG only — no client JS, no dependencies.
// Data is looked up by string `id` (see lib/chart-data.ts).

import { pipelineFlows, type PipelineStage } from "@/lib/chart-data";

export function PipelineFlow({
  id,
  title,
}: Readonly<{ id: string; title: string }>) {
  const stages: PipelineStage[] = pipelineFlows[id] ?? [];
  if (stages.length === 0) return null;
  const boxW = 150;
  const boxH = 64;
  const gap = 28;
  const width = stages.length * boxW + (stages.length - 1) * gap + 40;
  const height = 120;

  return (
    <figure className="border-border bg-surface my-8 overflow-x-auto rounded-[var(--radius-card)] border p-6">
      <figcaption className="text-sm font-medium">{title}</figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={title}
        className="mt-4 h-auto w-full min-w-[560px]"
      >
        {stages.map((stage, i) => {
          const x = 20 + i * (boxW + gap);
          const y = 28;
          return (
            <g key={stage.name}>
              <rect
                x={x}
                y={y}
                width={boxW}
                height={boxH}
                rx="10"
                fill="var(--color-accent-subtle)"
                stroke="var(--color-accent)"
                strokeWidth="1"
              />
              <text
                x={x + boxW / 2}
                y={y + 26}
                textAnchor="middle"
                className="fill-[var(--color-text)] text-[13px] font-semibold"
              >
                {stage.name}
              </text>
              <text
                x={x + boxW / 2}
                y={y + 46}
                textAnchor="middle"
                className="fill-[var(--color-muted)] text-[10px]"
              >
                {stage.detail}
              </text>
              {i < stages.length - 1 ? (
                <g>
                  <line
                    x1={x + boxW}
                    y1={y + boxH / 2}
                    x2={x + boxW + gap}
                    y2={y + boxH / 2}
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                  />
                  <path
                    d={`M ${x + boxW + gap - 6} ${y + boxH / 2 - 5} L ${x + boxW + gap} ${y + boxH / 2} L ${x + boxW + gap - 6} ${y + boxH / 2 + 5}`}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2"
                  />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
