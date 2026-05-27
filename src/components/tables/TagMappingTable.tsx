import type { CustomerConfig } from "../../core/types";
import { getAssetName } from "../../core/resultApi";

export function TagMappingTable({ config }: { config: CustomerConfig }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="text-[11px] uppercase tracking-[0.1em] text-white/45">
          <tr className="border-b border-white/10">
            <th className="px-3 py-3">Asset</th>
            <th className="px-3 py-3">Standard Tag</th>
            <th className="px-3 py-3">Source Tag</th>
            <th className="px-3 py-3">Required</th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {config.tagMappings.map((tag) => (
            <tr key={`${tag.assetId}-${tag.standardTag}`} className="border-b border-white/5">
              <td className="px-3 py-3 text-white">{getAssetName(config, tag.assetId)}</td>
              <td className="px-3 py-3 font-mono text-cyan">{tag.standardTag}</td>
              <td className="px-3 py-3 font-mono text-white/70">{tag.sourceTag}</td>
              <td className="px-3 py-3 text-white/65">{tag.required ? "Yes" : "No"}</td>
              <td className="px-3 py-3">
                <span className={statusClass(tag.status)}>{tag.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function statusClass(status: string) {
  const color = status === "mapped" ? "text-success border-success/40 bg-success/15" : status === "derived" ? "text-warning border-warning/40 bg-warning/15" : "text-danger border-danger/40 bg-danger/15";
  return `inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold ${color}`;
}
