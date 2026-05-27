import type { KpiDefinition } from "../../core/types";

export const dieCastingEnergyKpis: KpiDefinition[] = [
  {
    id: "machine_energy",
    label: "Machine Energy",
    unit: "kWh",
    description: "Energy consumption by machine within the selected time range.",
    aggregation: "sum",
  },
  {
    id: "cycle_energy",
    label: "Cycle Energy",
    unit: "kWh/cycle",
    description: "Energy consumption allocated to each die-casting production cycle.",
    aggregation: "avg",
  },
  {
    id: "energy_per_wheel",
    label: "Energy per Wheel",
    unit: "kWh/wheel",
    description: "Energy consumption normalized by wheel output.",
    aggregation: "avg",
  },
  {
    id: "soft_measurement_coverage",
    label: "Soft Measurement Coverage",
    unit: "%",
    description: "Percentage of energy results produced by soft measurement or hybrid measurement.",
    aggregation: "latest",
  },
  {
    id: "confidence_level",
    label: "Confidence Level",
    unit: "level",
    description: "Trust level of the generated soft-sensing results.",
    aggregation: "latest",
  },
  {
    id: "baseline_deviation",
    label: "Baseline Deviation",
    unit: "%",
    description: "Deviation from the configured or learned energy baseline.",
    aggregation: "avg",
  },
];
