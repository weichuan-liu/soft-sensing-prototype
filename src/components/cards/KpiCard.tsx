interface KpiCardProps {
  title: string;
  value: string;
  unit?: string;
  description?: string;
  tone?: "cyan" | "green" | "yellow" | "red";
}

const toneClass = {
  cyan: "text-cyan",
  green: "text-mint",
  yellow: "text-warning",
  red: "text-danger",
};

export function KpiCard({ title, value, unit, description, tone = "cyan" }: KpiCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-cyan/20 bg-gradient-to-br from-cyan/10 to-mint/5 p-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />
      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/55">{title}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className={`font-mono text-2xl font-bold ${toneClass[tone]}`}>{value}</span>
        {unit && <span className="pb-1 text-xs text-white/55">{unit}</span>}
      </div>
      {description && <p className="mt-2 text-xs leading-5 text-white/55">{description}</p>}
    </div>
  );
}
