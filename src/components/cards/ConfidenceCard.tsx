import type { DataQualitySummary } from "../../core/types";
import { formatPct } from "../../utils/format";

interface ConfidenceCardProps {
  dataQuality: DataQualitySummary;
}

export function ConfidenceCard({ dataQuality }: ConfidenceCardProps) {
  const status = dataQuality.overallScore >= 0.85 ? "Validated" : dataQuality.overallScore >= 0.75 ? "Review" : "Low trust";
  const statusClass = status === "Validated" ? "text-success" : status === "Review" ? "text-warning" : "text-danger";

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Overall data quality" value={dataQuality.overallScore.toFixed(2)} tone="text-mint" />
      <Metric label="Required tag coverage" value={formatPct(dataQuality.requiredTagCoverage * 100, 0)} tone="text-cyan" />
      <Metric label="Missing rate" value={formatPct(dataQuality.missingRate * 100, 0)} tone="text-warning" />
      <Metric label="Validation status" value={status} tone={statusClass} />
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</p>
      <p className={`mt-2 font-mono text-xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}
