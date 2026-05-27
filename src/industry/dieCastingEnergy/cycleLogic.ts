import type { SoftSensorResult } from "../../core/types";

export function getCycleResults(results: SoftSensorResult[], assetId?: string) {
  return results
    .filter((result) => result.metric === "cycle_energy")
    .filter((result) => !assetId || result.assetId === assetId)
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}
