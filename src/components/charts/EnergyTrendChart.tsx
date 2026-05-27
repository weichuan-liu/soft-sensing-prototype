import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { SoftSensorResult } from "../../core/types";
import { chartPalette } from "../../theme/chartPalette";
import { formatTime } from "../../utils/format";

export function EnergyTrendChart({ results }: { results: SoftSensorResult[] }) {
  const data = results.map((result) => ({
    time: formatTime(result.timestamp),
    energy: result.value,
    lower: result.lowerBound,
    upper: result.upperBound,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid stroke={chartPalette.grid} vertical={false} />
        <XAxis dataKey="time" stroke={chartPalette.text} tickLine={false} axisLine={false} />
        <YAxis stroke={chartPalette.text} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            background: "#000028",
            border: "1px solid rgba(0, 204, 204, 0.3)",
            borderRadius: 8,
            color: "#fff",
          }}
        />
        <Area dataKey="upper" fill={chartPalette.confidenceBand} stroke="transparent" />
        <Area dataKey="lower" fill="#171739" stroke="transparent" />
        <Line type="monotone" dataKey="energy" stroke={chartPalette.softMeasured} strokeWidth={2} dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
