import type { SoftSensorResult } from "../../core/types";
import { formatEnergy, formatPct, formatTime } from "../../utils/format";
import { ConfidenceBadge } from "../badges/ConfidenceBadge";
import { SourceBadge } from "../badges/SourceBadge";

export function CycleEnergyTable({ results }: { results: SoftSensorResult[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.1em] text-white/45">
          <tr className="border-b border-white/10">
            <th className="px-3 py-3">Cycle ID</th>
            <th className="px-3 py-3">Time</th>
            <th className="px-3 py-3">Wheel Type</th>
            <th className="px-3 py-3">Energy</th>
            <th className="px-3 py-3">Source</th>
            <th className="px-3 py-3">Confidence</th>
            <th className="px-3 py-3">Baseline</th>
            <th className="px-3 py-3">Deviation</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => (
            <tr key={result.id} className="border-b border-white/5 hover:bg-cyan/[0.04]">
              <td className="px-3 py-3 font-mono text-white">{result.cycleId}</td>
              <td className="px-3 py-3 text-white/65">{formatTime(result.timestamp)}</td>
              <td className="px-3 py-3 text-white/80">{result.wheelType}</td>
              <td className="px-3 py-3 font-mono text-mint">{formatEnergy(result.value, result.unit)}</td>
              <td className="px-3 py-3"><SourceBadge source={result.source} /></td>
              <td className="px-3 py-3"><ConfidenceBadge confidence={result.confidence} /></td>
              <td className="px-3 py-3 text-white/65">{result.baseline ? formatEnergy(result.baseline, result.unit) : "n/a"}</td>
              <td className="px-3 py-3 text-white/65">{formatPct(result.deviationPct)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
