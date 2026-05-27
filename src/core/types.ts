export type DataSourceType = "measured" | "soft_measured" | "hybrid" | "unavailable";

export type ConfidenceLevel = "high" | "medium" | "low";

export type AssetType = "factory" | "line" | "machine" | "meter";

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  parentId?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface MeterBoundary {
  meterId: string;
  coversAssetIds: string[];
  boundaryType: "machine_level" | "cell_level" | "line_level" | "unknown";
  description: string;
}

export interface TagMapping {
  assetId: string;
  standardTag: string;
  sourceTag: string;
  required: boolean;
  status: "mapped" | "missing" | "derived";
}

export interface ShiftDefinition {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface TimeSeriesPoint {
  timestamp: string;
  assetId: string;
  values: Record<string, number | string | boolean | null>;
}

export interface SoftSensorResult {
  id: string;
  assetId: string;
  timestamp: string;
  metric: string;
  value: number;
  unit: string;
  source: DataSourceType;
  confidence: ConfidenceLevel;
  lowerBound?: number;
  upperBound?: number;
  dataQualityScore: number;
  confidenceReasons?: string[];
  baseline?: number;
  deviationPct?: number;
  cycleId?: string;
  wheelType?: string;
  templateId: string;
  configId: string;
}

export interface DataQualitySummary {
  assetId?: string;
  overallScore: number;
  missingRate: number;
  alignmentScore: number;
  requiredTagCoverage: number;
  issues: Array<{
    severity: "info" | "warning" | "critical";
    message: string;
  }>;
}

export interface CoverageSummary {
  physicalMeterCoveragePct: number;
  softMeasurementCoveragePct: number;
  newlyVisibleMachineCount: number;
  allocatedCycleCount: number;
  benchmarkedWheelTypeCount: number;
  highDeviationMachineCount: number;
}

export interface KpiDefinition {
  id: string;
  label: string;
  unit: string;
  description: string;
  aggregation: "sum" | "avg" | "max" | "min" | "latest";
}

export interface IndustryTemplate {
  id: string;
  name: string;
  version: string;
  domain: string;
  objects: string[];
  kpis: KpiDefinition[];
  defaultPages: string[];
}

export interface CustomerConfig {
  id: string;
  customerName: string;
  siteName: string;
  version: string;
  assets: Asset[];
  meterBoundaries: MeterBoundary[];
  tagMappings: TagMapping[];
  cycleRule: {
    method: "signal_based" | "state_transition" | "mes_cycle_id";
    standardTag: string;
    description: string;
  };
  wheelTypeField: string;
  shifts: ShiftDefinition[];
  thresholds: {
    lowConfidenceScore: number;
    highDeviationPct: number;
    minimumDataQualityScore: number;
  };
}
