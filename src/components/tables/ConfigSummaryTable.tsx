import type { CustomerConfig } from "../../core/types";
import { getAssetName, getConfigSummary } from "../../core/resultApi";

export function ConfigSummaryTable({ config }: { config: CustomerConfig }) {
  const summary = getConfigSummary(config);
  const rows = [
    ["Customer", summary.customerName],
    ["Site", summary.siteName],
    ["Config version", summary.version],
    ["Asset count", String(summary.assetCount)],
    ["Tag mappings", String(summary.tagMappingCount)],
    ["Meter boundaries", String(summary.meterBoundaryCount)],
    ["Cycle rule", `${summary.cycleRule.method} / ${summary.cycleRule.standardTag}`],
    ["Wheel type field", summary.wheelTypeField],
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-white/10 bg-black/20 p-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</p>
          <p className="mt-2 text-sm font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}

export function MeterBoundaryTable({ config }: { config: CustomerConfig }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.1em] text-white/45">
          <tr className="border-b border-white/10">
            <th className="px-3 py-3">Meter</th>
            <th className="px-3 py-3">Covered Assets</th>
            <th className="px-3 py-3">Boundary Type</th>
            <th className="px-3 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {config.meterBoundaries.map((boundary) => (
            <tr key={boundary.meterId} className="border-b border-white/5">
              <td className="px-3 py-3 text-white">{getAssetName(config, boundary.meterId)}</td>
              <td className="px-3 py-3 text-white/70">
                {boundary.coversAssetIds.map((assetId) => getAssetName(config, assetId)).join(", ")}
              </td>
              <td className="px-3 py-3 font-mono text-cyan">{boundary.boundaryType}</td>
              <td className="px-3 py-3 text-white/65">{boundary.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
