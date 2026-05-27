import type { SoftSensorResult } from "./types";

export function getConfidenceReasons(result: SoftSensorResult): string[] {
  if (result.confidenceReasons?.length) {
    return result.confidenceReasons;
  }

  const reasons: string[] = [];

  if (result.source === "measured") {
    reasons.push("Direct physical measurement is available.");
  }

  if (result.source === "soft_measured") {
    reasons.push("No direct physical meter is available for this boundary.");
  }

  if (result.source === "hybrid") {
    reasons.push("Physical measurement and soft-sensing allocation are combined.");
  }

  if (result.source === "unavailable") {
    reasons.push("Input data is insufficient to produce a credible energy value.");
  }

  reasons.push(`Data quality score is ${result.dataQualityScore.toFixed(2)}.`);

  return reasons;
}
