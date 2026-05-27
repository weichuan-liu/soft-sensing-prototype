import type { ReactNode } from "react";

interface PanelProps {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function Panel({ title, eyebrow, children, className = "", action }: PanelProps) {
  return (
    <section className={`rounded-lg border border-white/10 bg-white/[0.035] shadow-glow ${className}`}>
      {(title || eyebrow || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-4 py-3">
          <div>
            {eyebrow && <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan">{eyebrow}</p>}
            {title && <h2 className="mt-1 text-sm font-semibold text-white">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
