import type { CustomerConfig } from "../../core/types";
import { dieCastingEnergyTemplate } from "../../industry/dieCastingEnergy/template";

interface HeaderProps {
  activeConfig: CustomerConfig;
  configs: CustomerConfig[];
  onConfigChange: (configId: string) => void;
}

export function Header({ activeConfig, configs, onConfigChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-app/80 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">Die Casting Energy Soft Meter</h1>
          <p className="mt-1 text-xs text-white/55">
            Template {dieCastingEnergyTemplate.version} / Active config {activeConfig.version}
          </p>
        </div>
        <label className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.1em] text-white/55">
          Config
          <select
            value={activeConfig.id}
            onChange={(event) => onConfigChange(event.target.value)}
            className="rounded-md border border-cyan/30 bg-app px-3 py-2 text-sm font-semibold normal-case tracking-normal text-white outline-none transition focus:border-cyan"
          >
            {configs.map((config) => (
              <option key={config.id} value={config.id}>
                {config.siteName}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
