# Codex Development Document — Die Casting Energy Soft Meter Mock Demo

## 1. Development Objective

Build a runnable mock demo system that demonstrates the MVP concept of a reusable soft-sensing product.

The demo should not focus on real plant connectivity or production-grade model accuracy. Its purpose is to clearly express the product architecture:

```text
Soft Sensing Core
  +
Die Casting Energy Template
  +
Dicastal Line 6 Customer Config
  =
Runnable Energy Soft Meter App
```

The web app should render three pages:

1. Overview
2. Machine Detail
3. Confidence & Configuration

The most important engineering principle is that Dicastal-specific information must be placed in a customer config file, not hard-coded into the Core or reusable components.

For a product director demo, the app must also prove that it is not just a static dashboard. It should include:

- A before / after coverage gap summary.
- A visible config swap or second demo scenario.
- Confidence reasons for soft-measured and low-confidence values.
- A replication path panel showing how another line would be deployed.
- At least one low-confidence or unavailable case to make uncertainty explicit.

---

## 2. Recommended Tech Stack

Use a lightweight frontend-first stack:

```text
Frontend: React + TypeScript + Vite
Styling: Tailwind CSS
Charts: Recharts
Icons: lucide-react
Mock API: local TypeScript modules or JSON files
State: React hooks / Context; no Redux required
Routing: react-router-dom
```

Recommended approach:

- Use static mock data and local TypeScript modules.
- Do not build a real backend for the first mock demo.
- Keep the project easy to run with `npm install` and `npm run dev`.

---

## 3. Core Engineering Principles

### 3.1 Do not hard-code Dicastal business logic in reusable components

Allowed in customer config:

```text
Dicastal
Line 6
DC-01
DC-02
MES_ProductCode
```

Not allowed in Core or generic components:

```text
if customer === "Dicastal" then ...
if lineId === "Line 6" then ...
```

The UI should obtain business labels, asset names, KPI definitions, and field mappings from template/config objects.

### 3.2 Make the three-layer structure visible in code

The project structure must clearly show:

```text
core/       reusable soft-sensing capability
industry/   die-casting energy template
configs/    customer configuration pack
app/        runnable app assembled from template and config
```

### 3.3 Every energy result must include trust metadata

Every energy value must include:

- `source`: measured / soft_measured / hybrid / unavailable
- `confidence`: high / medium / low
- `lowerBound` and `upperBound`, if applicable
- `dataQualityScore`
- `templateId`
- `configId`

A value without source and confidence should not be displayed.

---

## 4. Suggested Project Structure

```text
die-casting-energy-soft-meter-demo/
├── package.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── styles.css
│   │
│   ├── core/
│   │   ├── types.ts
│   │   ├── softSensingEngine.ts
│   │   ├── dataQuality.ts
│   │   ├── confidence.ts
│   │   └── resultApi.ts
│   │
│   ├── industry/
│   │   └── dieCastingEnergy/
│   │       ├── template.ts
│   │       ├── kpis.ts
│   │       ├── cycleLogic.ts
│   │       └── uiTemplate.ts
│   │
│   ├── configs/
│   │   ├── dicastalLine6.ts
│   │   └── sampleLine7.ts
│   │
│   ├── mock/
│   │   ├── timeSeries.ts
│   │   ├── softSensorResults.ts
│   │   └── scenarios.ts
│   │
│   ├── app/
│   │   ├── layout/
│   │   │   ├── Shell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── pages/
│   │   │   ├── OverviewPage.tsx
│   │   │   ├── MachineDetailPage.tsx
│   │   │   └── ConfidenceConfigPage.tsx
│   │   └── routing.tsx
│   │
│   ├── components/
│   │   ├── badges/
│   │   │   ├── SourceBadge.tsx
│   │   │   └── ConfidenceBadge.tsx
│   │   ├── cards/
│   │   │   ├── KpiCard.tsx
│   │   │   ├── MachineCard.tsx
│   │   │   └── ConfidenceCard.tsx
│   │   ├── charts/
│   │   │   ├── EnergyTrendChart.tsx
│   │   │   ├── WheelTypeBarChart.tsx
│   │   │   └── ConfidenceBandChart.tsx
│   │   └── tables/
│   │       ├── CycleEnergyTable.tsx
│   │       ├── ConfigSummaryTable.tsx
│   │       └── TagMappingTable.tsx
│   │
│   └── utils/
│       ├── format.ts
│       └── math.ts
└── README.md
```

---

## 5. Core Type Definitions

Create `src/core/types.ts`.

```ts
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
```

---

## 6. Die Casting Energy Template

Create `src/industry/dieCastingEnergy/template.ts`.

```ts
import type { IndustryTemplate } from "../../core/types";
import { dieCastingEnergyKpis } from "./kpis";

export const dieCastingEnergyTemplate: IndustryTemplate = {
  id: "die-casting-energy-soft-meter",
  name: "Die Casting Energy Soft Meter",
  version: "0.1.0",
  domain: "die_casting_energy",
  objects: [
    "Line",
    "Machine",
    "Meter",
    "Cycle",
    "Wheel Type",
    "Shift",
    "Energy Boundary",
    "Soft Sensor",
  ],
  kpis: dieCastingEnergyKpis,
  defaultPages: ["overview", "machine_detail", "confidence_configuration"],
};
```

Create `src/configs/sampleLine7.ts`.

This config should be intentionally small. Its purpose is not to model a real customer in detail. Its purpose is to prove that the same Core and Die Casting Energy Template can render another line from a different configuration.

Minimum contents:

- One factory
- One line
- Two machines
- One meter
- At least three tag mappings
- One meter boundary
- One cycle rule
- One shift definition

Create `src/industry/dieCastingEnergy/kpis.ts`.

```ts
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
```

---

## 7. Customer Configuration Pack

Create `src/configs/dicastalLine6.ts`.

```ts
import type { CustomerConfig } from "../core/types";

export const dicastalLine6Config: CustomerConfig = {
  id: "dicastal-line-6",
  customerName: "CITIC Dicastal",
  siteName: "Line 6 Die Casting Area",
  version: "0.1.0",
  assets: [
    { id: "factory-001", name: "Dicastal Plant", type: "factory" },
    { id: "line-6", name: "Line 6", type: "line", parentId: "factory-001" },
    { id: "dc-01", name: "DC-01", type: "machine", parentId: "line-6", metadata: { hasMeter: true } },
    { id: "dc-02", name: "DC-02", type: "machine", parentId: "line-6", metadata: { hasMeter: false } },
    { id: "dc-03", name: "DC-03", type: "machine", parentId: "line-6", metadata: { hasMeter: false } },
    { id: "dc-04", name: "DC-04", type: "machine", parentId: "line-6", metadata: { hasMeter: true } },
    { id: "meter-b1", name: "Meter B1", type: "meter", parentId: "line-6" },
    { id: "meter-b2", name: "Meter B2", type: "meter", parentId: "line-6" },
  ],
  meterBoundaries: [
    {
      meterId: "meter-b1",
      coversAssetIds: ["dc-01"],
      boundaryType: "machine_level",
      description: "Reference meter for DC-01.",
    },
    {
      meterId: "meter-b2",
      coversAssetIds: ["dc-04"],
      boundaryType: "machine_level",
      description: "Reference meter for DC-04.",
    },
  ],
  tagMappings: [
    { assetId: "dc-01", standardTag: "machine.power", sourceTag: "L6_DC01_Power", required: true, status: "mapped" },
    { assetId: "dc-01", standardTag: "machine.run_status", sourceTag: "L6_DC01_RunStatus", required: true, status: "mapped" },
    { assetId: "dc-01", standardTag: "machine.cycle_signal", sourceTag: "L6_DC01_Cycle", required: true, status: "mapped" },
    { assetId: "dc-02", standardTag: "machine.current", sourceTag: "L6_DC02_Current", required: true, status: "mapped" },
    { assetId: "dc-02", standardTag: "machine.run_status", sourceTag: "L6_DC02_RunStatus", required: true, status: "mapped" },
    { assetId: "dc-02", standardTag: "machine.cycle_signal", sourceTag: "L6_DC02_Cycle", required: true, status: "mapped" },
    { assetId: "line-6", standardTag: "mes.wheel_type", sourceTag: "MES_ProductCode", required: true, status: "mapped" },
    { assetId: "line-6", standardTag: "environment.temperature", sourceTag: "L6_AmbientTemp", required: false, status: "mapped" },
  ],
  cycleRule: {
    method: "signal_based",
    standardTag: "machine.cycle_signal",
    description: "A new cycle is detected from the rising edge of the configured cycle signal.",
  },
  wheelTypeField: "mes.wheel_type",
  shifts: [
    { id: "shift-a", name: "Shift A", startTime: "08:00", endTime: "20:00" },
    { id: "shift-b", name: "Shift B", startTime: "20:00", endTime: "08:00" },
  ],
  thresholds: {
    lowConfidenceScore: 0.7,
    highDeviationPct: 15,
    minimumDataQualityScore: 0.75,
  },
};
```

---

## 8. Mock Data Requirements

Create `src/mock/softSensorResults.ts` with representative results.

Include at least:

- 4 machines: two measured, two soft-measured
- 3 wheel types: for example, W18-A, W19-B, W20-C
- 20 cycle-level results
- machine-level summary results
- confidence variations: high, medium, low
- confidence reasons for soft-measured, low-confidence, and unavailable results
- at least one hybrid result
- at least one unavailable result
- baseline deviations, including at least one high deviation machine
- a small result set for the second config / scenario

Example result:

```ts
import type { SoftSensorResult } from "../core/types";

export const mockSoftSensorResults: SoftSensorResult[] = [
  {
    id: "r-001",
    assetId: "dc-01",
    timestamp: "2026-05-20T08:00:00+09:00",
    metric: "machine_energy",
    value: 982,
    unit: "kWh",
    source: "measured",
    confidence: "high",
    lowerBound: 982,
    upperBound: 982,
    dataQualityScore: 0.96,
    baseline: 950,
    deviationPct: 3.4,
    templateId: "die-casting-energy-soft-meter",
    configId: "dicastal-line-6",
  },
  {
    id: "r-002",
    assetId: "dc-02",
    timestamp: "2026-05-20T08:00:00+09:00",
    metric: "machine_energy",
    value: 1124,
    unit: "kWh",
    source: "soft_measured",
    confidence: "high",
    lowerBound: 1080,
    upperBound: 1175,
    dataQualityScore: 0.89,
    confidenceReasons: [
      "No direct machine-level meter.",
      "Current, run-status, and cycle signals are mapped.",
      "Data quality score is above the configured threshold.",
    ],
    baseline: 1030,
    deviationPct: 9.1,
    templateId: "die-casting-energy-soft-meter",
    configId: "dicastal-line-6",
  },
  {
    id: "r-003",
    assetId: "dc-03",
    timestamp: "2026-05-20T08:00:00+09:00",
    metric: "machine_energy",
    value: 1288,
    unit: "kWh",
    source: "soft_measured",
    confidence: "medium",
    lowerBound: 1190,
    upperBound: 1395,
    dataQualityScore: 0.78,
    confidenceReasons: [
      "No direct machine-level meter.",
      "Cycle signal is mapped.",
      "Required tag coverage is partial.",
      "Estimate is derived from similar measured machines.",
    ],
    baseline: 1080,
    deviationPct: 19.3,
    templateId: "die-casting-energy-soft-meter",
    configId: "dicastal-line-6",
  },
];
```

---

## 9. Core Mock Engine

Create `src/core/resultApi.ts` to simulate backend API behavior.

```ts
import type { CustomerConfig, IndustryTemplate, SoftSensorResult } from "./types";
import { mockSoftSensorResults } from "../mock/softSensorResults";

export function getAssets(config: CustomerConfig) {
  return config.assets;
}

export function getMachines(config: CustomerConfig) {
  return config.assets.filter((asset) => asset.type === "machine");
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

export function getTemplateSummary(template: IndustryTemplate) {
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
```

Create `src/core/confidence.ts`.

This helper should provide deterministic confidence explanations instead of treating confidence badges as cosmetic labels.

Suggested functions:

```ts
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
```

Create `src/core/dataQuality.ts`.

```ts
import type { CustomerConfig, DataQualitySummary } from "./types";

export function calculateDataQuality(config: CustomerConfig): DataQualitySummary {
  const requiredMappings = config.tagMappings.filter((tag) => tag.required);
  const mappedRequired = requiredMappings.filter((tag) => tag.status === "mapped" || tag.status === "derived");
  const requiredTagCoverage = requiredMappings.length === 0 ? 1 : mappedRequired.length / requiredMappings.length;

  const missingRequired = requiredMappings.filter((tag) => tag.status === "missing");

  return {
    overallScore: Number((0.65 * requiredTagCoverage + 0.2 * 0.9 + 0.15 * 0.85).toFixed(2)),
    missingRate: Number((1 - requiredTagCoverage).toFixed(2)),
    alignmentScore: 0.9,
    requiredTagCoverage,
    issues: missingRequired.map((tag) => ({
      severity: "warning",
      message: `Required tag ${tag.standardTag} is missing for ${tag.assetId}.`,
    })),
  };
}
```

---

## 10. UI Layout Requirements

### 10.1 Shell

The app should have:

- Left sidebar with three navigation items:
  - Overview
  - Machine Detail
  - Confidence & Configuration
- Top header showing:
  - Product name: Die Casting Energy Soft Meter
  - Template version
  - Customer config name
- Config selector:
  - Dicastal Line 6
  - Sample Line 7 / Demo Customer A

Changing the config selector should update assets, config summary, and visible result data from the selected config. It is acceptable for the second config to use a smaller mock data set.

### 10.2 Visual style

Use a clean industrial dashboard style:

- Light background
- Cards with rounded corners
- Clear hierarchy
- Compact but readable tables
- Confidence and source badges visible beside values
- Avoid overly decorative visuals

---

## 11. Page Specifications

### 11.1 Overview Page

File: `src/app/pages/OverviewPage.tsx`

Required components:

- KPI cards:
  - Total Energy
  - Measured Energy
  - Soft-measured Energy
  - Soft Measurement Coverage
- Coverage gap panel:
  - Physical meter coverage
  - Soft measurement coverage
  - Newly visible machines
  - Allocated cycles
  - Wheel types benchmarked
  - High-deviation machines
- Machine cards:
  - machine name
  - energy value
  - source badge
  - confidence badge
  - baseline deviation
- Chart:
  - Energy by Wheel Type bar chart
- Short text panel:
  - “This application is generated from Soft Sensing Core + Die Casting Energy Template + Dicastal Line 6 Config.”
- Config-driven proof panel:
  - Show the active config.
  - Show that the same template and core are used for the selected config.

### 11.2 Machine Detail Page

File: `src/app/pages/MachineDetailPage.tsx`

Required behavior:

- Use a selected machine state, default to the first soft-measured machine.
- Allow selection from a simple dropdown.

Required components:

- Machine summary card
- Energy trend chart with confidence band
- Cycle energy table
- Baseline deviation panel
- Source and confidence badges for the selected machine
- Confidence reason panel for the selected machine

Cycle table columns:

```text
Cycle ID | Time | Wheel Type | Energy | Source | Confidence | Baseline | Deviation
```

### 11.3 Confidence & Configuration Page

File: `src/app/pages/ConfidenceConfigPage.tsx`

This is the most important page for productization.

Required sections:

**Section A: Confidence Summary**

- Overall data quality score
- Required tag coverage
- Missing rate
- Alignment score
- Validation status
- Low-confidence periods, mocked if needed

**Section B: Loaded Product Layers**

Show three cards:

```text
Soft Sensing Core v0.1
Die Casting Energy Template v0.1
Selected Customer Config v0.1
```

**Section C: Configuration Summary**

- Asset count
- Tag mapping count
- Meter boundary count
- Cycle rule
- Wheel type field

**Section D: Tag Mapping Table**

Columns:

```text
Asset | Standard Tag | Source Tag | Required | Status
```

**Section E: Meter Boundary Table**

Columns:

```text
Meter | Covered Assets | Boundary Type | Description
```

**Section F: Replication Path**

Show the deployment steps for another line:

```text
1. Add asset list
2. Map source tags to standard tags
3. Define meter boundaries
4. Define cycle identification rule
5. Load the same die-casting energy template
```

This section should be written as a product capability, not as developer instructions.

---

## 12. Required Reusable Components

### 12.1 SourceBadge

Input:

```ts
interface SourceBadgeProps {
  source: "measured" | "soft_measured" | "hybrid" | "unavailable";
}
```

Display labels:

| Source | Label |
|---|---|
| measured | Measured |
| soft_measured | Soft-measured |
| hybrid | Hybrid |
| unavailable | Unavailable |

### 12.2 ConfidenceBadge

Input:

```ts
interface ConfidenceBadgeProps {
  confidence: "high" | "medium" | "low";
}
```

Display labels:

| Confidence | Label |
|---|---|
| high | High confidence |
| medium | Medium confidence |
| low | Low confidence |

### 12.3 KpiCard

Props:

```ts
interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  description?: string;
}
```

### 12.4 MachineCard

Props:

```ts
interface MachineCardProps {
  machineName: string;
  value: number;
  unit: string;
  source: DataSourceType;
  confidence: ConfidenceLevel;
  deviationPct?: number;
}
```

---

## 13. Suggested Implementation Steps for Codex

Implement in this order:

1. Initialize Vite + React + TypeScript project.
2. Install Tailwind CSS, Recharts, lucide-react, and react-router-dom.
3. Create the folder structure from Section 4.
4. Implement `core/types.ts`.
5. Implement `industry/dieCastingEnergy/template.ts` and `kpis.ts`.
6. Implement `configs/dicastalLine6.ts`.
7. Implement `configs/sampleLine7.ts` as a small second config for productization proof.
8. Implement mock soft-sensor result data for both configs.
9. Implement `resultApi.ts`, `dataQuality.ts`, and `confidence.ts`.
10. Implement reusable badges, KPI cards, machine cards, and tables.
11. Implement `Shell`, `Sidebar`, config selection, and routing.
12. Implement the three pages.
13. Add README with run instructions and product explanation.

---

## 14. README Requirements

The generated project should include a `README.md` with:

```md
# Die Casting Energy Soft Meter Demo

This is a mock demo for a configuration-driven soft-sensing product MVP.

## Product architecture

Soft Sensing Core + Die Casting Energy Template + Customer Config = Runnable Soft Meter App

## Run

npm install
npm run dev

## Demo pages

- Overview
- Machine Detail
- Confidence & Configuration

## What this demo proves

- The Core is reusable and not customer-specific.
- The die-casting energy logic is captured in a template.
- Dicastal Line 6 is represented as a configuration pack.
- A second small config proves the same app can be generated for another line.
- Every energy value includes source and confidence metadata.
```

---

## 15. Acceptance Criteria

The mock demo is complete when:

| Criteria | Requirement |
|---|---|
| App runs locally | `npm run dev` starts without errors |
| Three pages exist | Overview, Machine Detail, Confidence & Configuration |
| Three layers visible | Code has Core, Industry Template, and Customer Config folders |
| No hard-coded customer logic in Core | Core does not contain Dicastal-specific terms |
| Energy results carry trust metadata | Source, confidence, confidence interval, and data quality are displayed |
| Confidence is explainable | Soft-measured and low-confidence values show confidence reasons |
| Configuration page exists | User can see loaded template/config and tag mappings |
| Config swap proof exists | User can switch to a second small config or scenario without changing core logic |
| Machine detail works | User can select a machine and view energy/cycle/confidence data |
| Boundary of truth is visible | Demo includes measured, soft-measured, hybrid, and unavailable states |
| Mock data is realistic enough | At least 4 machines, 3 wheel types, 20 cycle results, and one low-confidence or unavailable case |

---

## 16. Final Demo Message

The final UI should help the presenter say:

> This is not just a dashboard for one customer. It is a reusable soft-sensing product skeleton. The Core is generic, the die-casting knowledge is packaged as a template, and the Dicastal Line 6 differences are represented as configuration.

This message should be visible in the Overview or Confidence & Configuration page.
