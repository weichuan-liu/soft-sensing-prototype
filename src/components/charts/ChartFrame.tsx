import type { ReactNode } from "react";

export function ChartFrame({ children }: { children: ReactNode }) {
  return <div className="h-72 w-full min-w-0">{children}</div>;
}
