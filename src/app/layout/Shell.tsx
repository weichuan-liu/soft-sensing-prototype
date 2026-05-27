import type { ReactNode } from "react";
import type { CustomerConfig } from "../../core/types";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface ShellProps {
  activeConfig: CustomerConfig;
  configs: CustomerConfig[];
  onConfigChange: (configId: string) => void;
  children: ReactNode;
}

export function Shell({ activeConfig, configs, onConfigChange, children }: ShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-app text-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header activeConfig={activeConfig} configs={configs} onConfigChange={onConfigChange} />
        <main className="min-h-0 flex-1 overflow-y-auto bg-surface">
          <div className="mx-auto max-w-[1440px] px-4 py-5 lg:px-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
