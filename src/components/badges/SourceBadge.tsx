import type { DataSourceType } from "../../core/types";
import { sourceLabel } from "../../utils/format";

interface SourceBadgeProps {
  source: DataSourceType;
}

const sourceStyles: Record<DataSourceType, string> = {
  measured: "border-cyan/40 bg-cyan/15 text-cyan",
  soft_measured: "border-mint/40 bg-mint/15 text-mint",
  hybrid: "border-sky-400/40 bg-sky-400/15 text-sky-300",
  unavailable: "border-danger/40 bg-danger/15 text-danger",
};

export function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[11px] font-semibold ${sourceStyles[source]}`}>
      {sourceLabel(source)}
    </span>
  );
}
