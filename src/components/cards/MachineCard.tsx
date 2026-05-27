import type { ConfidenceLevel, DataSourceType } from "../../core/types";
import { formatEnergy, formatPct } from "../../utils/format";
import { ConfidenceBadge } from "../badges/ConfidenceBadge";
import { SourceBadge } from "../badges/SourceBadge";

interface MachineCardProps {
  machineName: string;
  value: number;
  unit: string;
  source: DataSourceType;
  confidence: ConfidenceLevel;
  deviationPct?: number;
}

export function MachineCard({ machineName, value, unit, source, confidence, deviationPct }: MachineCardProps) {
  const isUnavailable = source === "unavailable";
  const deviationTone = (deviationPct ?? 0) > 15 ? "text-danger" : (deviationPct ?? 0) > 8 ? "text-warning" : "text-success";

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan/35 hover:bg-cyan/[0.06]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{machineName}</h3>
          <p className="mt-1 text-xs text-white/45">Machine energy</p>
        </div>
        <SourceBadge source={source} />
      </div>
      <div className="mt-4 font-mono text-2xl font-bold text-mint">
        {isUnavailable ? "n/a" : formatEnergy(value, unit)}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <ConfidenceBadge confidence={confidence} />
        <span className={`text-xs font-semibold ${deviationTone}`}>Deviation {formatPct(deviationPct)}</span>
      </div>
    </div>
  );
}
