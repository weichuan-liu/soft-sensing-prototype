import type { DataSourceType } from "../core/types";

export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatPct(value?: number, digits = 1) {
  if (value === undefined || Number.isNaN(value)) return "n/a";
  return `${formatNumber(value, digits)}%`;
}

export function formatEnergy(value: number, unit = "kWh") {
  return `${formatNumber(value, value < 100 ? 1 : 0)} ${unit}`;
}

export function formatTime(timestamp: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export function sourceLabel(source: DataSourceType) {
  const labels: Record<DataSourceType, string> = {
    measured: "Measured",
    soft_measured: "Soft-measured",
    hybrid: "Hybrid",
    unavailable: "Unavailable",
  };
  return labels[source];
}
