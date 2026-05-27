import { BarChart3, Gauge, Settings2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Overview", icon: BarChart3 },
  { to: "/machine", label: "Machine Detail", icon: Gauge },
  { to: "/confidence", label: "Confidence & Configuration", icon: Settings2 },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-app lg:flex lg:flex-col">
      <div className="border-b border-white/10 px-6 py-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan">Soft Meter</div>
        <h1 className="mt-2 text-lg font-bold text-white">Die Casting Energy</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md border px-3 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "border-cyan/35 bg-cyan/10 text-cyan"
                    : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="m-4 rounded-lg border border-cyan/20 bg-cyan/5 p-3 text-xs text-white/60">
        <div className="mb-2 flex items-center justify-between">
          <span>Core</span>
          <span className="text-mint">v0.1</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Runtime</span>
          <span className="text-success">Ready</span>
        </div>
      </div>
    </aside>
  );
}
