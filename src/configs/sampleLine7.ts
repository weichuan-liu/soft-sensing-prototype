import type { CustomerConfig } from "../core/types";

export const sampleLine7Config: CustomerConfig = {
  id: "sample-line-7",
  customerName: "Demo Customer A",
  siteName: "Line 7 Die Casting Pilot",
  version: "0.1.0",
  assets: [
    { id: "demo-factory-001", name: "Demo Plant", type: "factory" },
    { id: "line-7", name: "Line 7", type: "line", parentId: "demo-factory-001" },
    { id: "l7-dc-01", name: "L7-DC-01", type: "machine", parentId: "line-7", metadata: { hasMeter: true } },
    { id: "l7-dc-02", name: "L7-DC-02", type: "machine", parentId: "line-7", metadata: { hasMeter: false } },
    { id: "meter-l7-a", name: "Meter L7-A", type: "meter", parentId: "line-7" },
  ],
  meterBoundaries: [
    {
      meterId: "meter-l7-a",
      coversAssetIds: ["l7-dc-01"],
      boundaryType: "machine_level",
      description: "Reference meter for L7-DC-01.",
    },
  ],
  tagMappings: [
    { assetId: "l7-dc-01", standardTag: "machine.power", sourceTag: "L7_M01_Power", required: true, status: "mapped" },
    { assetId: "l7-dc-01", standardTag: "machine.cycle_signal", sourceTag: "L7_M01_Cycle", required: true, status: "mapped" },
    { assetId: "l7-dc-02", standardTag: "machine.current", sourceTag: "L7_M02_Current", required: true, status: "mapped" },
    { assetId: "l7-dc-02", standardTag: "machine.cycle_signal", sourceTag: "L7_M02_Cycle", required: true, status: "mapped" },
    { assetId: "line-7", standardTag: "mes.wheel_type", sourceTag: "L7_ProductCode", required: true, status: "mapped" },
  ],
  cycleRule: {
    method: "signal_based",
    standardTag: "machine.cycle_signal",
    description: "Cycle segmentation uses the mapped machine cycle signal.",
  },
  wheelTypeField: "mes.wheel_type",
  shifts: [{ id: "shift-main", name: "Main Shift", startTime: "08:00", endTime: "20:00" }],
  thresholds: {
    lowConfidenceScore: 0.72,
    highDeviationPct: 14,
    minimumDataQualityScore: 0.76,
  },
};
