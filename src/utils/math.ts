import type { SoftSensorResult } from "../core/types";

export function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

export function average(values: number[]) {
  return values.length === 0 ? 0 : sum(values) / values.length;
}

export function groupBy<T>(items: T[], getKey: (item: T) => string) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    const key = getKey(item);
    groups[key] = groups[key] ?? [];
    groups[key].push(item);
    return groups;
  }, {});
}

export function resultValue(result: SoftSensorResult) {
  return result.source === "unavailable" ? 0 : result.value;
}
