# Die Casting Energy Soft Meter Demo

This is a mock demo for a configuration-driven soft-sensing product MVP.

## Product architecture

```text
Soft Sensing Core + Die Casting Energy Template + Customer Config = Runnable Soft Meter App
```

## Run

```bash
npm install
npm run dev
```

## Demo pages

- Overview
- Machine Detail
- Confidence & Configuration

## What this demo proves

- The Core is reusable and not customer-specific.
- The die-casting energy logic is captured in a template.
- Customer line differences are represented as configuration packs.
- A second small config proves the same app can render another line.
- Every energy value includes source, confidence, confidence interval, and data-quality metadata.

## Design direction

The frontend uses a dark industrial dashboard style: deep navy shell, cyan/teal product accents, compact cards, dense tables, and explicit confidence/status colors.
