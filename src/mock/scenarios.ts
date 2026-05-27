import type { CoverageSummary } from "../core/types";

export const scenarioNotes: Record<string, string> = {
  "dicastal-line-6":
    "Physical metering covers only part of the line. Soft sensing expands visibility to machine, cycle, and wheel-type energy while keeping uncertainty visible.",
  "sample-line-7":
    "A small second configuration proves the same core and template can render another die-casting line without changing product logic.",
};

export const coverageSummaries: Record<string, CoverageSummary> = {
  "dicastal-line-6": {
    physicalMeterCoveragePct: 40,
    softMeasurementCoveragePct: 88,
    newlyVisibleMachineCount: 2,
    allocatedCycleCount: 20,
    benchmarkedWheelTypeCount: 3,
    highDeviationMachineCount: 1,
  },
  "sample-line-7": {
    physicalMeterCoveragePct: 50,
    softMeasurementCoveragePct: 100,
    newlyVisibleMachineCount: 1,
    allocatedCycleCount: 4,
    benchmarkedWheelTypeCount: 2,
    highDeviationMachineCount: 0,
  },
};
