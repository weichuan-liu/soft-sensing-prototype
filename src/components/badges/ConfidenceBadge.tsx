import type { ConfidenceLevel } from "../../core/types";

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
}

const confidenceStyles: Record<ConfidenceLevel, string> = {
  high: "border-success/40 bg-success/15 text-success",
  medium: "border-warning/40 bg-warning/15 text-warning",
  low: "border-danger/40 bg-danger/15 text-danger",
};

const labels: Record<ConfidenceLevel, string> = {
  high: "High confidence",
  medium: "Medium confidence",
  low: "Low confidence",
};

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold ${confidenceStyles[confidence]}`}>
      {labels[confidence]}
    </span>
  );
}
