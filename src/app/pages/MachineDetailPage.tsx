import { useEffect, useMemo, useState } from "react";
import type { CustomerConfig } from "../../core/types";
import { getConfidenceReasons } from "../../core/confidence";
import { getAssetName, getMachines, getSoftSensorResults } from "../../core/resultApi";
import { getCycleResults } from "../../industry/dieCastingEnergy/cycleLogic";
import { formatEnergy, formatPct } from "../../utils/format";
import { ChartFrame } from "../../components/charts/ChartFrame";
import { EnergyTrendChart } from "../../components/charts/EnergyTrendChart";
import { ConfidenceBadge } from "../../components/badges/ConfidenceBadge";
import { SourceBadge } from "../../components/badges/SourceBadge";
import { CycleEnergyTable } from "../../components/tables/CycleEnergyTable";
import { Panel } from "../../components/cards/Panel";

export function MachineDetailPage({ activeConfig }: { activeConfig: CustomerConfig }) {
  const machineResults = getSoftSensorResults({ configId: activeConfig.id, metric: "machine_energy" });
  const defaultMachine = machineResults.find((result) => result.source === "soft_measured") ?? machineResults[0];
  const [selectedAssetId, setSelectedAssetId] = useState(defaultMachine?.assetId ?? "");

  useEffect(() => {
    setSelectedAssetId(defaultMachine?.assetId ?? "");
  }, [activeConfig.id, defaultMachine?.assetId]);

  const selectedResult = machineResults.find((result) => result.assetId === selectedAssetId) ?? defaultMachine;
  const cycleResults = useMemo(
    () => getCycleResults(getSoftSensorResults({ configId: activeConfig.id }), selectedAssetId),
    [activeConfig.id, selectedAssetId],
  );
  const trendResults = getSoftSensorResults({
    configId: activeConfig.id,
    assetId: selectedAssetId,
    metric: "energy_trend",
  });
  const machines = getMachines(activeConfig);

  if (!selectedResult) {
    return <Panel title="No machine results">No machine result data is available for this configuration.</Panel>;
  }

  return (
    <div className="space-y-5">
      <Panel
        title={getAssetName(activeConfig, selectedResult.assetId)}
        eyebrow="Machine detail"
        action={
          <select
            value={selectedAssetId}
            onChange={(event) => setSelectedAssetId(event.target.value)}
            className="rounded-md border border-cyan/30 bg-app px-3 py-2 text-sm font-semibold text-white outline-none focus:border-cyan"
          >
            {machines.map((machine) => (
              <option key={machine.id} value={machine.id}>
                {machine.name}
              </option>
            ))}
          </select>
        }
      >
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">Machine energy</p>
              <p className="mt-3 font-mono text-3xl font-bold text-mint">
                {selectedResult.source === "unavailable" ? "n/a" : formatEnergy(selectedResult.value, selectedResult.unit)}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <SourceBadge source={selectedResult.source} />
                <ConfidenceBadge confidence={selectedResult.confidence} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Metric label="Confidence interval" value={selectedResult.lowerBound && selectedResult.upperBound ? `${selectedResult.lowerBound}-${selectedResult.upperBound} ${selectedResult.unit}` : "n/a"} />
              <Metric label="Data quality score" value={selectedResult.dataQualityScore.toFixed(2)} />
              <Metric label="Baseline" value={selectedResult.baseline ? formatEnergy(selectedResult.baseline, selectedResult.unit) : "n/a"} />
              <Metric label="Baseline deviation" value={formatPct(selectedResult.deviationPct)} tone={(selectedResult.deviationPct ?? 0) > activeConfig.thresholds.highDeviationPct ? "text-danger" : "text-success"} />
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Energy trend with confidence band</h3>
              <span className="text-xs text-white/45">{trendResults.length} points</span>
            </div>
            <ChartFrame>
              <EnergyTrendChart results={trendResults.length ? trendResults : [selectedResult]} />
            </ChartFrame>
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[0.7fr_1.3fr]">
        <Panel title="Confidence Reasons" eyebrow="Why this level">
          <ul className="space-y-3 text-sm text-white/70">
            {getConfidenceReasons(selectedResult).map((reason) => (
              <li key={reason} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                {reason}
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Cycle Energy" eyebrow="Cycle-level soft meter">
          <CycleEnergyTable results={cycleResults} />
        </Panel>
      </div>
    </div>
  );
}

function Metric({ label, value, tone = "text-cyan" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</p>
      <p className={`mt-2 font-mono text-lg font-bold ${tone}`}>{value}</p>
    </div>
  );
}
