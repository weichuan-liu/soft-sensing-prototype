# Soft Sensing Product MVP — PM / Product Director View

## 1. One-line Definition

This MVP is not a one-off “Dicastal Line 6 energy prediction project”. It is a **configuration-driven energy soft-sensing product prototype for the die-casting industry**.

> A reusable Soft Sensing Core loads a Die Casting Energy Industry Template, then applies a Customer Configuration Pack to generate a runnable, verifiable, and repeatable energy soft-meter application.

In simple terms, the MVP is not intended to prove that we can build many pages or many features. It is intended to prove a productization thesis:

> **Customer differences can be configuration-driven, industry knowledge can be template-driven, and soft-sensing capability can be core-platform-driven.**

---

## 2. Product Background

In die-casting and aluminum wheel manufacturing, many factories face similar energy-data problems:

1. Meter coverage is incomplete, so equipment-level, cycle-level, and product-type-level energy consumption cannot be directly measured.
2. Machine, MES, process, and meter data are distributed across systems and use inconsistent semantics.
3. Energy management often remains at line-level or area-level granularity, without visibility into individual machines, wheel types, or production cycles.
4. Different customers and production lines have different tag names, meter boundaries, machine structures, and data quality conditions. This makes project replication expensive.
5. Customers naturally challenge the credibility of AI-estimated energy values when no physical meter exists at the target boundary.

The product opportunity is therefore:

> Convert incomplete and fragmented shop-floor data into credible virtual energy measurements through a standardized asset model, industry template, customer configuration layer, and confidence-aware soft-sensing engine.

---

## 3. Strategic Product Judgment

### 3.1 What the MVP should not do

The MVP should not start as a broad, all-in-one energy platform. It should also avoid trying to cover every possible industrial soft-sensing scenario from day one.

The first version should **not** include:

- Full energy optimization
- What-if simulation and strategy recommendation
- Process-quality soft sensing
- Work-order lifecycle management
- Multi-factory group-level management
- Automated model training platform UI
- Agent / chatbot interface
- Complex multi-tenant and permission systems

These can become future modules, but they are not the first productization proof.

### 3.2 What the MVP should do

The MVP should focus on one product hypothesis:

> The same Soft Sensing Core can generate usable soft-sensing applications for different sites by loading different industry templates and customer configuration packs.

Dicastal Line 6 is used as the first customer configuration pack to validate this hypothesis.

---

## 4. Three-layer Product Architecture

The product should be structured as three layers:

```text
Soft Sensing Core
  +
Die Casting Energy Industry Template
  +
Customer Configuration Pack
  =
Runnable Soft Meter Application
```

### 4.1 Soft Sensing Core

The Core is the reusable capability layer. It should be independent of Dicastal and independent of the die-casting industry.

For the MVP, the Core should only include the minimum reusable capabilities:

| Capability | Description |
|---|---|
| Standard input data model | Unified structures for assets, time series, target variables, and output results |
| Time-series alignment | Basic handling of different sampling rates, missing values, and outliers |
| Soft-sensing calculation interface | A common inference interface that can connect to rules, statistical models, GTT, or ML models |
| Data quality scoring | Scores input completeness, alignment quality, missing key tags, and signal reliability |
| Confidence output | Every soft-sensing result must include a confidence level and confidence interval |
| Standard result API | Results are exposed through customer-independent field names and schemas |

The Core is not meant to be feature-rich in the MVP. Its purpose is to serve as a stable runtime foundation for industry templates.

### 4.2 Die Casting Energy Industry Template

The Industry Template is where domain knowledge is productized. It captures the common objects, KPIs, cycle logic, and page semantics of die-casting energy soft sensing.

The MVP template should include:

| Template asset | MVP scope |
|---|---|
| Standard objects | Line, Machine, Meter, Cycle, Wheel Type, Shift, Energy Boundary, Soft Sensor |
| Standard KPIs | Machine Energy, Cycle Energy, Energy per Wheel, Soft Measurement Coverage, Confidence Level, Baseline Deviation |
| Cycle logic | Segment continuous time series into production cycles and aggregate cycle energy |
| Wheel type logic | Associate cycles with wheel type / product code and build product-level energy benchmarks |
| Default UI template | Overview, Machine Detail, Confidence & Configuration |
| Default API shape | Assets, Soft Sensor Results, Confidence, Configuration |

The MVP does not need to deeply model Mold, Holding Furnace, Robot, or Cooling Unit. These can be future template extensions.

### 4.3 Customer Configuration Pack

Customer-specific differences should live in configuration, not in core code.

For Dicastal Line 6, the configuration pack should include:

| Configuration item | Example |
|---|---|
| Asset structure | Machines, meters, and line hierarchy under Line 6 |
| Tag mapping | Site-specific tags mapped to standard semantic fields |
| Meter boundary | Which meter covers which machine, cell, or area |
| Cycle identification rule | Cycle signal, machine-state transition, or MES cycle ID |
| Wheel type field | MES product code / wheel type mapping |
| Shift definition | 8-hour or 12-hour shift calendar |
| Thresholds | Baseline deviation threshold, low-confidence threshold, data-quality threshold |

The MVP can use YAML or JSON configuration files. A full configuration UI is not required in the first version, but the configuration structure must be clear, readable, and reusable.

---

## 5. MVP Product Scope

### 5.1 MVP name

Internal product name:

> **Die Casting Energy Soft Meter MVP**

Customer-facing demo name:

> **Energy Soft Meter for Die-Casting Line**

### 5.2 Three things the MVP must prove

| Objective | How to validate it |
|---|---|
| Core is reusable | Removing the Dicastal config leaves no customer-specific fields in the Core |
| Template is reusable | The Die Casting Energy Template defines objects, KPIs, cycle logic, and default UI independently |
| Application is config-driven | The Dicastal Line 6 app is generated mainly by applying the configuration pack, not by changing core code |

### 5.3 Minimum functional loop

```text
Import customer configuration
  ↓
Load die-casting energy template
  ↓
Read mock or historical time-series data
  ↓
Align data and segment production cycles
  ↓
Generate machine-level, cycle-level, and wheel-type-level energy results
  ↓
Attach source labels, confidence levels, confidence intervals, and data-quality scores
  ↓
Render results in the default UI
```

This loop is the product MVP. Everything else is secondary.

---

## 6. MVP UI Scope

The first version should keep the UI intentionally small. Three pages are enough to express the product logic.

### Page 1: Overview

Purpose: show that the loaded template and configuration generate meaningful business results.

Core content:

- Current line: for example, Line 6
- Total energy
- Measured energy vs soft-measured energy
- Soft measurement coverage
- Top deviation machines
- Energy by wheel type
- Measured / soft-measured labels

Primary audience: product leadership, customer management, energy management team.

### Page 2: Machine Detail

Purpose: show that a user can drill down from a machine to cycles, wheel types, and confidence.

Core content:

- Machine metadata
- Energy trend
- Measured / soft-measured source label
- Confidence interval
- Cycle energy list
- Wheel type context
- Baseline deviation

Primary audience: energy engineers, process engineers, equipment engineers.

### Page 3: Confidence & Configuration

Purpose: show that the application is not hard-coded. It is generated from the Core, industry template, and customer configuration.

Core content:

**A. Confidence**

- Data quality score
- Confidence level
- Validation status
- Low-confidence periods
- Model / estimator version

**B. Configuration**

- Loaded Core version
- Loaded Industry Template
- Loaded Customer Config
- Asset mapping summary
- Tag mapping summary
- Meter boundary summary
- Cycle rule summary

This page is strategically important because it proves the productization concept.

### 6.4 Product Director Demo Design Additions

For a product director demo, the three pages are enough, but they must contain several explicit proof moments. The demo should not rely only on verbal explanation.

#### A. Before / After Coverage Framing

The Overview page should make the original business gap visible:

```text
Before: line-level meters exist, but machine-level, cycle-level, and wheel-type energy are incomplete.
After: soft sensing generates measured, soft-measured, hybrid, and unavailable energy results with confidence metadata.
```

Recommended Overview metrics:

| Metric | Purpose |
|---|---|
| Physical meter coverage | Shows the original measurement limitation |
| Soft measurement coverage | Shows the additional visibility created by the MVP |
| Newly visible machines | Shows how many machines gained usable energy estimates |
| Allocated production cycles | Shows cycle-level value |
| Wheel types benchmarked | Shows product-level value |
| High-deviation machines | Shows actionable operating insight |

#### B. Config Swap Proof

The product claim is repeatability. The UI should include a small visible proof that the application is generated by configuration:

```text
Loaded Config: Dicastal Line 6
Alternative Config: Sample Line 7 / Demo Customer A
```

The second config does not need to be rich. It only needs enough assets, tags, meter boundaries, and results to show that the same Core and Industry Template can render another line without changing business logic.

#### C. Confidence Explanation

Confidence should not be only a badge. For any selected soft-measured or low-confidence value, the UI should explain why the confidence level was assigned.

Example:

```text
DC-03 confidence: Medium
Reasons:
- No direct machine-level meter
- Current signal is mapped
- Cycle signal is mapped
- Required tag coverage is partial
- Estimate is derived from similar measured machines
```

This is critical because customers will naturally challenge estimated energy values when no physical meter exists at the target boundary.

#### D. Replication Path

The Confidence & Configuration page should explicitly show how another line would be deployed:

```text
To deploy another line:
1. Add asset list
2. Map source tags to standard tags
3. Define meter boundaries
4. Define cycle identification rule
5. Load the same die-casting energy template
```

This should be shown as a product capability, not as developer documentation.

#### E. Boundary of Truth

The demo must include at least one low-confidence or unavailable case. This makes the product more credible by showing that it does not hide uncertainty or pretend that every estimate is valid.

The four source states should be visible in the UI:

| Source state | Meaning |
|---|---|
| Measured | Direct physical measurement exists |
| Soft-measured | Estimated by the soft-sensing engine |
| Hybrid | Physical measurement and soft-sensing logic are combined |
| Unavailable | Data is insufficient to produce a credible value |

---

## 7. MVP Result Semantics

Every energy result must carry enough metadata for industrial trust.

A result should never be displayed as only:

```text
DC-06 Energy: 1,245 kWh
```

It should be displayed as:

```text
DC-06 Energy: 1,245 kWh
Source: Soft-measured
Confidence: High
Confidence Interval: 1,190–1,310 kWh
Data Quality Score: 0.89
Confidence Reason: No direct meter; current, run-status, and cycle signals are mapped; data quality score is above threshold
Template: Die Casting Energy Soft Meter v0.1
Config: Dicastal Line 6 v0.1
```

This is a key product principle:

> A soft-sensing product must make uncertainty visible instead of hiding it.

---

## 8. MVP Data and Model Scope

For the mock demo, real plant connectivity is not required. Mock data is sufficient as long as it represents realistic industrial semantics.

Minimum mock dataset:

| Dataset | Description |
|---|---|
| Asset list | Line 6, several machines, several meters |
| Alternative config | A small second line or demo customer config to prove configuration-driven replication |
| Tag mapping | Site tags mapped to standard fields |
| Time-series points | Power/current, run status, cycle signal, wheel type, optional process variables |
| Soft-sensor results | Machine energy, cycle energy, energy per wheel |
| Confidence summary | Confidence level, confidence interval, data quality score, and confidence reasons |
| Configuration summary | Core version, template version, customer config version |

The engine can be rule-based or semi-simulated in the MVP. It does not need to call a real GTT model yet. However, the interface should be designed so a GTT/ML model can be plugged in later.

Recommended model abstraction:

```text
SoftSensorEngine.infer(input, template, config) -> SoftSensorResult[]
```

---

## 9. What to explicitly exclude from MVP

To protect focus, the following should be excluded from the first MVP:

| Excluded item | Reason |
|---|---|
| Full optimization | Requires credible measurement foundation first |
| What-if simulation | Belongs to later advisory optimization stage |
| Quality prediction | Expands the scope beyond energy soft sensing |
| Full work-order flow | Can be added after anomaly logic matures |
| Multi-factory management | Not required to prove the product architecture |
| Automated training UI | Not needed for a mock product MVP |
| Agent interface | Nice future UX, but not core to productization proof |

---

## 10. Product-level Acceptance Criteria

The MVP should be evaluated by whether it proves repeatability, not by the number of screens.

| Acceptance point | Criteria |
|---|---|
| Core decoupling | No Dicastal-specific fields or logic exist inside the Core layer |
| Template independence | Die Casting Energy Template can theoretically be reused by another die-casting customer |
| Configuration clarity | Dicastal-specific differences are expressed in the configuration pack |
| UI template usage | Page terminology, KPIs, and objects come from template/config definitions |
| Standard result schema | Soft-sensing results use a stable customer-independent schema |
| Trust metadata | Every displayed energy value includes source, confidence, and data-quality information |
| Replication path | Adding a new line should mainly require a new config pack, not new business logic |
| Config swap proof | Demo includes a second small config or scenario showing the same app rendered from another configuration |
| Confidence explanation | Soft-measured and low-confidence values explain why confidence was assigned |
| Boundary of truth | Demo includes measured, soft-measured, hybrid or unavailable states, including at least one low-confidence or unavailable case |

---

## 11. Recommended Deliverables

The first MVP should deliver the following artifacts:

```text
Soft Sensing Core v0.1
Die Casting Energy Template v0.1
Dicastal Line 6 Config Pack v0.1
Sample Line 7 / Demo Customer Config Pack v0.1
Mock Energy Soft Meter Web App v0.1
Sample Result API Schema
Sample Mock Dataset
Short Demo Script
```

The demo should clearly show the relationship:

```text
Core + Template + Config = Runnable Application
```

---

## 12. Recommended Demo Storyline

A concise demo flow for product leadership:

1. Start from the Overview page and show the before / after measurement gap: physical meter coverage is incomplete, but soft measurement expands usable visibility.
2. Show business value metrics: newly visible machines, allocated cycles, wheel types benchmarked, and high-deviation machines.
3. Open Machine Detail and show a machine with soft-measured energy, confidence interval, cycle energy, wheel-type context, and confidence reasons.
4. Show at least one low-confidence or unavailable case to demonstrate that the product makes uncertainty explicit.
5. Open Confidence & Configuration and show that Dicastal-specific machine tags, meter boundaries, and cycle rules are provided by the config pack.
6. Switch to a small second config or scenario and show that the same Core and Template can render another line.
7. Explain that replacing the customer config pack can generate another line or another customer deployment with the same Core and industry template.

The key message:

> This is not just a demo dashboard. It is the first reusable product skeleton for die-casting soft sensing.

---

## 13. Future Roadmap

After the MVP proves the architecture, the roadmap can proceed in stages:

### V1: Energy Soft Meter

- Better machine-level and cycle-level soft measurement
- Real data connector
- Historical validation
- Basic anomaly detection

### V2: Energy Intelligence

- Idle energy loss detection
- Wheel-type benchmark
- Shift comparison
- Baseline management
- Deviation explanation

### V3: Process Soft Sensing

- Mold thermal readiness
- Melt stability proxy
- Process stability index
- Quality-risk proxy indicators

### V4: Advisory Optimization

- What-if simulation
- Optimization recommendation
- KPI comparison before and after recommended actions
- Human-in-the-loop advisory workflow

---

## 14. Final Product Positioning

The MVP should be positioned as:

> A configuration-driven soft-sensing product skeleton that converts incomplete die-casting energy measurements into credible virtual measurements by combining a reusable Core, an industry-specific template, and a customer-specific configuration pack.

A shorter version:

> **The first MVP proves that soft sensing can be productized: core capabilities are reusable, industry knowledge is templated, and customer differences are configurable.**
