import type { CustomerConfig, DataQualitySummary } from "./types";

export function calculateDataQuality(config: CustomerConfig): DataQualitySummary {
  const requiredMappings = config.tagMappings.filter((tag) => tag.required);
  const mappedRequired = requiredMappings.filter((tag) => tag.status === "mapped" || tag.status === "derived");
  const requiredTagCoverage = requiredMappings.length === 0 ? 1 : mappedRequired.length / requiredMappings.length;
  const missingRequired = requiredMappings.filter((tag) => tag.status === "missing");
  const alignmentScore = missingRequired.length > 0 ? 0.82 : 0.9;

  return {
    overallScore: Number((0.65 * requiredTagCoverage + 0.2 * alignmentScore + 0.15 * 0.85).toFixed(2)),
    missingRate: Number((1 - requiredTagCoverage).toFixed(2)),
    alignmentScore,
    requiredTagCoverage: Number(requiredTagCoverage.toFixed(2)),
    issues: missingRequired.map((tag) => ({
      severity: "warning",
      message: `Required tag ${tag.standardTag} is missing for ${tag.assetId}.`,
    })),
  };
}
