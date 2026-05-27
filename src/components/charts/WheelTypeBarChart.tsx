import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartPalette } from "../../theme/chartPalette";

interface WheelTypeDatum {
  wheelType: string;
  energy: number;
}

export function WheelTypeBarChart({ data }: { data: WheelTypeDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: -18, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid stroke={chartPalette.grid} vertical={false} />
        <XAxis dataKey="wheelType" stroke={chartPalette.text} tickLine={false} axisLine={false} />
        <YAxis stroke={chartPalette.text} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "rgba(0, 204, 204, 0.08)" }}
          contentStyle={{
            background: "#000028",
            border: "1px solid rgba(0, 204, 204, 0.3)",
            borderRadius: 8,
            color: "#fff",
          }}
        />
        <Bar dataKey="energy" name="Energy kWh" fill={chartPalette.softMeasured} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
