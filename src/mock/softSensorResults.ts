import type { SoftSensorResult } from "../core/types";

const templateId = "die-casting-energy-soft-meter";

const line6MachineResults: SoftSensorResult[] = [
  {
    id: "l6-machine-001",
    assetId: "dc-01",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 982,
    unit: "kWh",
    source: "measured",
    confidence: "high",
    lowerBound: 982,
    upperBound: 982,
    dataQualityScore: 0.96,
    confidenceReasons: ["Direct machine-level meter is available.", "Required power and cycle signals are mapped."],
    baseline: 950,
    deviationPct: 3.4,
    templateId,
    configId: "dicastal-line-6",
  },
  {
    id: "l6-machine-002",
    assetId: "dc-02",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 1124,
    unit: "kWh",
    source: "soft_measured",
    confidence: "high",
    lowerBound: 1080,
    upperBound: 1175,
    dataQualityScore: 0.89,
    confidenceReasons: [
      "No direct machine-level meter is available.",
      "Current, run-status, and cycle signals are mapped.",
      "Data quality score is above the configured threshold.",
    ],
    baseline: 1030,
    deviationPct: 9.1,
    templateId,
    configId: "dicastal-line-6",
  },
  {
    id: "l6-machine-003",
    assetId: "dc-03",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 1288,
    unit: "kWh",
    source: "soft_measured",
    confidence: "medium",
    lowerBound: 1190,
    upperBound: 1395,
    dataQualityScore: 0.78,
    confidenceReasons: [
      "No direct machine-level meter is available.",
      "Cycle signal is derived from state transitions.",
      "Estimate is benchmarked against similar measured machines.",
    ],
    baseline: 1080,
    deviationPct: 19.3,
    templateId,
    configId: "dicastal-line-6",
  },
  {
    id: "l6-machine-004",
    assetId: "dc-04",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 904,
    unit: "kWh",
    source: "hybrid",
    confidence: "high",
    lowerBound: 888,
    upperBound: 925,
    dataQualityScore: 0.92,
    confidenceReasons: [
      "Direct meter is available.",
      "Cycle allocation uses mapped run-status and production context.",
    ],
    baseline: 910,
    deviationPct: -0.7,
    templateId,
    configId: "dicastal-line-6",
  },
  {
    id: "l6-machine-005",
    assetId: "dc-05",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 0,
    unit: "kWh",
    source: "unavailable",
    confidence: "low",
    dataQualityScore: 0.42,
    confidenceReasons: [
      "Current signal is missing.",
      "No direct meter covers this machine.",
      "Input data is insufficient to produce a credible energy value.",
    ],
    baseline: 990,
    templateId,
    configId: "dicastal-line-6",
  },
];

const cycleSpecs = [
  ["dc-02", "W18-A", 44.8, 40.5, "high"],
  ["dc-02", "W19-B", 47.2, 42.1, "high"],
  ["dc-02", "W20-C", 49.6, 45.0, "high"],
  ["dc-02", "W18-A", 45.1, 40.5, "high"],
  ["dc-02", "W19-B", 48.4, 42.1, "high"],
  ["dc-03", "W18-A", 54.5, 42.2, "medium"],
  ["dc-03", "W19-B", 56.8, 44.0, "medium"],
  ["dc-03", "W20-C", 58.1, 46.3, "medium"],
  ["dc-03", "W18-A", 55.7, 42.2, "medium"],
  ["dc-03", "W19-B", 57.0, 44.0, "medium"],
  ["dc-01", "W18-A", 38.9, 38.0, "high"],
  ["dc-01", "W19-B", 41.3, 40.0, "high"],
  ["dc-01", "W20-C", 43.5, 42.0, "high"],
  ["dc-01", "W18-A", 39.1, 38.0, "high"],
  ["dc-01", "W20-C", 42.9, 42.0, "high"],
  ["dc-04", "W18-A", 37.8, 38.4, "high"],
  ["dc-04", "W19-B", 40.6, 40.8, "high"],
  ["dc-04", "W20-C", 42.0, 41.9, "high"],
  ["dc-04", "W19-B", 40.1, 40.8, "high"],
  ["dc-04", "W18-A", 37.5, 38.4, "high"],
] as const;

const line6CycleResults: SoftSensorResult[] = cycleSpecs.map(
  ([assetId, wheelType, value, baseline, confidence], index) => {
    const source = assetId === "dc-01" ? "measured" : assetId === "dc-04" ? "hybrid" : "soft_measured";
    const deviationPct = ((value - baseline) / baseline) * 100;

    return {
      id: `l6-cycle-${String(index + 1).padStart(3, "0")}`,
      assetId,
      timestamp: `2026-05-20T${String(8 + Math.floor(index / 2)).padStart(2, "0")}:${index % 2 === 0 ? "10" : "42"}:00+08:00`,
      metric: "cycle_energy",
      value,
      unit: "kWh",
      source,
      confidence,
      lowerBound: confidence === "medium" ? Number((value * 0.92).toFixed(1)) : Number((value * 0.98).toFixed(1)),
      upperBound: confidence === "medium" ? Number((value * 1.09).toFixed(1)) : Number((value * 1.02).toFixed(1)),
      dataQualityScore: confidence === "medium" ? 0.78 : source === "measured" ? 0.96 : 0.9,
      confidenceReasons:
        confidence === "medium"
          ? ["Cycle signal is derived.", "Soft estimate is within a wider confidence interval."]
          : ["Required cycle context is mapped.", "Energy result is traceable to a measured or modeled boundary."],
      baseline,
      deviationPct: Number(deviationPct.toFixed(1)),
      cycleId: `C-${String(index + 1).padStart(3, "0")}`,
      wheelType,
      templateId,
      configId: "dicastal-line-6",
    };
  },
);

const line6TrendResults: SoftSensorResult[] = line6MachineResults
  .filter((result) => result.source !== "unavailable")
  .flatMap((machine) =>
    [0, 1, 2, 3, 4, 5].map((step) => {
      const drift = 1 + (step - 2) * 0.018;
      const value = Number(((machine.value / 6) * drift).toFixed(1));
      return {
        ...machine,
        id: `${machine.id}-trend-${step}`,
        timestamp: `2026-05-20T${String(8 + step * 2).padStart(2, "0")}:00:00+08:00`,
        metric: "energy_trend",
        value,
        lowerBound: machine.lowerBound ? Number(((machine.lowerBound / 6) * drift).toFixed(1)) : undefined,
        upperBound: machine.upperBound ? Number(((machine.upperBound / 6) * drift).toFixed(1)) : undefined,
      };
    }),
  );

const sampleLine7Results: SoftSensorResult[] = [
  {
    id: "l7-machine-001",
    assetId: "l7-dc-01",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 760,
    unit: "kWh",
    source: "measured",
    confidence: "high",
    lowerBound: 760,
    upperBound: 760,
    dataQualityScore: 0.95,
    confidenceReasons: ["Direct physical measurement is available."],
    baseline: 735,
    deviationPct: 3.4,
    templateId,
    configId: "sample-line-7",
  },
  {
    id: "l7-machine-002",
    assetId: "l7-dc-02",
    timestamp: "2026-05-20T08:00:00+08:00",
    metric: "machine_energy",
    value: 842,
    unit: "kWh",
    source: "soft_measured",
    confidence: "medium",
    lowerBound: 790,
    upperBound: 910,
    dataQualityScore: 0.81,
    confidenceReasons: ["No direct meter covers this machine.", "Current and cycle signals are mapped."],
    baseline: 780,
    deviationPct: 7.9,
    templateId,
    configId: "sample-line-7",
  },
  ...[0, 1, 2, 3].map<SoftSensorResult>((step) => ({
    id: `l7-cycle-${step + 1}`,
    assetId: step % 2 === 0 ? "l7-dc-01" : "l7-dc-02",
    timestamp: `2026-05-20T${String(8 + step).padStart(2, "0")}:30:00+08:00`,
    metric: "cycle_energy",
    value: step % 2 === 0 ? 36 + step : 40 + step,
    unit: "kWh",
    source: step % 2 === 0 ? "measured" : "soft_measured",
    confidence: step % 2 === 0 ? "high" : "medium",
    lowerBound: step % 2 === 0 ? 36 + step : 38 + step,
    upperBound: step % 2 === 0 ? 36 + step : 44 + step,
    dataQualityScore: step % 2 === 0 ? 0.95 : 0.81,
    confidenceReasons: ["Rendered from the alternative customer configuration."],
    baseline: 38,
    deviationPct: Number((((step % 2 === 0 ? 36 + step : 40 + step) - 38) / 38 * 100).toFixed(1)),
    cycleId: `L7-C-${step + 1}`,
    wheelType: step < 2 ? "W18-A" : "W19-B",
    templateId,
    configId: "sample-line-7",
  })),
];

export const mockSoftSensorResults: SoftSensorResult[] = [
  ...line6MachineResults,
  ...line6CycleResults,
  ...line6TrendResults,
  ...sampleLine7Results,
];
