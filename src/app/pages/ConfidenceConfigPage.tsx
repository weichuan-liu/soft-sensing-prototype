import type { CustomerConfig } from "../../core/types";
import { calculateDataQuality } from "../../core/dataQuality";
import { getSoftSensorResults } from "../../core/resultApi";
import { dieCastingEnergyTemplate } from "../../industry/dieCastingEnergy/template";
import { dieCastingEnergyUiTemplate } from "../../industry/dieCastingEnergy/uiTemplate";
import { ConfidenceCard } from "../../components/cards/ConfidenceCard";
import { Panel } from "../../components/cards/Panel";
import { ConfigSummaryTable, MeterBoundaryTable } from "../../components/tables/ConfigSummaryTable";
import { TagMappingTable } from "../../components/tables/TagMappingTable";

export function ConfidenceConfigPage({ activeConfig }: { activeConfig: CustomerConfig }) {
  const dataQuality = calculateDataQuality(activeConfig);
  const lowTrustResults = getSoftSensorResults({ configId: activeConfig.id }).filter(
    (result) => result.confidence === "low" || result.source === "unavailable",
  );

  return (
    <div className="space-y-5">
      <Panel title="Confidence Summary" eyebrow="Validation">
        <ConfidenceCard dataQuality={dataQuality} />
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">Alignment score</p>
            <p className="mt-2 font-mono text-xl font-bold text-cyan">{dataQuality.alignmentScore.toFixed(2)}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-[11px] uppercase tracking-[0.1em] text-white/45">Low-confidence periods</p>
            <p className="mt-2 text-sm font-semibold text-white">
              {lowTrustResults.length ? `${lowTrustResults.length} result requires review` : "None in selected scenario"}
            </p>
          </div>
        </div>
        {dataQuality.issues.length > 0 && (
          <div className="mt-4 space-y-2">
            {dataQuality.issues.map((issue) => (
              <div key={issue.message} className="rounded-lg border border-warning/30 bg-warning/10 px-3 py-2 text-sm text-warning">
                {issue.message}
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Loaded Product Layers" eyebrow="Config-driven proof">
        <div className="grid gap-3 md:grid-cols-3">
          <Layer title="Soft Sensing Core" value="v0.1" />
          <Layer title="Die Casting Energy Template" value={`v${dieCastingEnergyTemplate.version}`} />
          <Layer title="Selected Customer Config" value={`${activeConfig.siteName} v${activeConfig.version}`} />
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Panel title="Configuration Summary" eyebrow="Customer pack">
          <ConfigSummaryTable config={activeConfig} />
        </Panel>
        <Panel title="Replication Path" eyebrow="Deploy another line">
          <ol className="grid gap-3 sm:grid-cols-2">
            {dieCastingEnergyUiTemplate.replicationSteps.map((step, index) => (
              <li key={step} className="rounded-lg border border-cyan/20 bg-cyan/5 p-3">
                <span className="font-mono text-sm font-bold text-cyan">{String(index + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-semibold text-white">{step}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>

      <Panel title="Tag Mapping Table" eyebrow="Semantic mapping">
        <TagMappingTable config={activeConfig} />
      </Panel>

      <Panel title="Meter Boundary Table" eyebrow="Energy boundaries">
        <MeterBoundaryTable config={activeConfig} />
      </Panel>
    </div>
  );
}

function Layer({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-lg border border-cyan/20 bg-gradient-to-br from-cyan/10 to-transparent p-4">
      <p className="text-[11px] uppercase tracking-[0.12em] text-white/45">{title}</p>
      <p className="mt-3 text-lg font-bold text-mint">{value}</p>
    </div>
  );
}
