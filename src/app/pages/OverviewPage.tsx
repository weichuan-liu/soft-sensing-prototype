import type { CustomerConfig, SoftSensorResult } from "../../core/types";
import { getAssetName, getCoverageSummary, getSoftSensorResults } from "../../core/resultApi";
import { scenarioNotes } from "../../mock/scenarios";
import { groupBy, resultValue, sum } from "../../utils/math";
import { formatEnergy, formatNumber } from "../../utils/format";
import { ChartFrame } from "../../components/charts/ChartFrame";
import { KpiCard } from "../../components/cards/KpiCard";
import { MachineCard } from "../../components/cards/MachineCard";
import { Panel } from "../../components/cards/Panel";
import { WheelTypeBarChart } from "../../components/charts/WheelTypeBarChart";
import { dieCastingEnergyTemplate } from "../../industry/dieCastingEnergy/template";

export function OverviewPage({ activeConfig }: { activeConfig: CustomerConfig }) {
  const machineResults = getSoftSensorResults({
    configId: activeConfig.id,
    metric: "machine_energy",
  });
  const cycleResults = getSoftSensorResults({
    configId: activeConfig.id,
    metric: "cycle_energy",
  });
  const coverage = getCoverageSummary(activeConfig);
  const availableMachines = machineResults.filter((result) => result.source !== "unavailable");
  const totalEnergy = sum(availableMachines.map(resultValue));
  const measuredEnergy = sum(machineResults.filter((result) => result.source === "measured").map(resultValue));
  const softEnergy = sum(machineResults.filter((result) => result.source === "soft_measured").map(resultValue));
  const wheelData = buildWheelData(cycleResults);

  return (
    <div className="space-y-5">
      <section className="rounded-lg border border-cyan/20 bg-gradient-to-br from-cyan/10 to-transparent p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan">Core + Template + Config</p>
        <h2 className="mt-2 text-2xl font-bold text-white">{activeConfig.siteName}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/65">{scenarioNotes[activeConfig.id]}</p>
        <div className="mt-4 grid gap-3 text-xs text-white/60 md:grid-cols-3">
          <Layer label="Soft Sensing Core" value="v0.1" />
          <Layer label="Industry Template" value={`${dieCastingEnergyTemplate.name} v${dieCastingEnergyTemplate.version}`} />
          <Layer label="Customer Config" value={`${activeConfig.customerName} v${activeConfig.version}`} />
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Energy" value={formatNumber(totalEnergy)} unit="kWh" description="Measured, hybrid, and credible soft-measured values." tone="green" />
        <KpiCard title="Measured Energy" value={formatNumber(measuredEnergy)} unit="kWh" description="Direct machine-level physical measurement." />
        <KpiCard title="Soft-measured Energy" value={formatNumber(softEnergy)} unit="kWh" description="Generated where meters are incomplete." tone="green" />
        <KpiCard title="Soft Measurement Coverage" value={`${coverage.softMeasurementCoveragePct}`} unit="%" description="Visibility after soft sensing is applied." tone="green" />
      </div>

      <Panel title="Before / After Measurement Coverage" eyebrow="Director proof">
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
          <Coverage label="Physical meter coverage" value={`${coverage.physicalMeterCoveragePct}%`} />
          <Coverage label="Soft measurement coverage" value={`${coverage.softMeasurementCoveragePct}%`} tone="text-mint" />
          <Coverage label="Newly visible machines" value={String(coverage.newlyVisibleMachineCount)} />
          <Coverage label="Allocated cycles" value={String(coverage.allocatedCycleCount)} />
          <Coverage label="Wheel types benchmarked" value={String(coverage.benchmarkedWheelTypeCount)} />
          <Coverage label="High-deviation machines" value={String(coverage.highDeviationMachineCount)} tone={coverage.highDeviationMachineCount > 0 ? "text-warning" : "text-success"} />
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel title="Machine Energy Results" eyebrow="Trust metadata">
          <div className="grid gap-3 md:grid-cols-2">
            {machineResults.map((result) => (
              <MachineCard
                key={result.id}
                machineName={getAssetName(activeConfig, result.assetId)}
                value={result.value}
                unit={result.unit}
                source={result.source}
                confidence={result.confidence}
                deviationPct={result.deviationPct}
              />
            ))}
          </div>
        </Panel>

        <Panel title="Energy by Wheel Type" eyebrow="Product benchmark">
          <ChartFrame>
            <WheelTypeBarChart data={wheelData} />
          </ChartFrame>
        </Panel>
      </div>
    </div>
  );
}

function buildWheelData(results: SoftSensorResult[]) {
  const grouped = groupBy(results.filter((result) => result.wheelType), (result) => result.wheelType ?? "Unknown");
  return Object.entries(grouped).map(([wheelType, items]) => ({
    wheelType,
    energy: Number(sum(items.map(resultValue)).toFixed(1)),
  }));
}

function Layer({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <p className="uppercase tracking-[0.1em] text-white/40">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function Coverage({ label, value, tone = "text-cyan" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}
