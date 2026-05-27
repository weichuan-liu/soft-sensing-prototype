import type { TimeSeriesPoint } from "../core/types";

export const mockTimeSeries: TimeSeriesPoint[] = [
  {
    timestamp: "2026-05-20T08:00:00+08:00",
    assetId: "dc-02",
    values: {
      "machine.current": 318,
      "machine.run_status": true,
      "machine.cycle_signal": false,
      "mes.wheel_type": "W18-A",
    },
  },
  {
    timestamp: "2026-05-20T08:05:00+08:00",
    assetId: "dc-02",
    values: {
      "machine.current": 342,
      "machine.run_status": true,
      "machine.cycle_signal": true,
      "mes.wheel_type": "W18-A",
    },
  },
];
