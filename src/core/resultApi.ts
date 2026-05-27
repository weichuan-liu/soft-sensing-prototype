import { dieCastingEnergyTemplate } from "../industry/dieCastingEnergy/template";
import { coverageSummaries } from "../mock/scenarios";
import { mockSoftSensorResults } from "../mock/softSensorResults";
import type { CustomerConfig, IndustryTemplate, SoftSensorResult } from "./types";

export function getAssets(config: CustomerConfig) {
  return config.assets;
}

export function getMachines(config: CustomerConfig) {
  return config.assets.filter((asset) => asset.type === "machine");
}

export function getMeters(config: CustomerConfig) {
  return config.assets.filter((asset) => asset.type === "meter");
}

export function getAssetName(config: CustomerConfig, assetId: string) {
  return config.assets.find((asset) => asset.id === assetId)?.name ?? assetId;
}

export function getSoftSensorResults(options?: {
  assetId?: string;
  metric?: string;
  configId?: string;
}): SoftSensorResult[] {
  return mockSoftSensorResults.filter((result) => {
    if (options?.assetId && result.assetId !== options.assetId) return false;
    if (options?.metric && result.metric !== options.metric) return false;
    if (options?.configId && result.configId !== options.configId) return false;
    return true;
  });
}

export function getTemplateSummary(template: IndustryTemplate = dieCastingEnergyTemplate) {
  return {
    id: template.id,
    name: template.name,
    version: template.version,
    domain: template.domain,
    objects: template.objects,
    kpis: template.kpis,
    defaultPages: template.defaultPages,
  };
}

export function getConfigSummary(config: CustomerConfig) {
  return {
    id: config.id,
    customerName: config.customerName,
    siteName: config.siteName,
    version: config.version,
    assetCount: config.assets.length,
    tagMappingCount: config.tagMappings.length,
    meterBoundaryCount: config.meterBoundaries.length,
    cycleRule: config.cycleRule,
    wheelTypeField: config.wheelTypeField,
  };
}

export function getCoverageSummary(config: CustomerConfig) {
  return coverageSummaries[config.id];
}
