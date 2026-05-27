import { useMemo, useState } from "react";
import { Shell } from "./app/layout/Shell";
import { AppRoutes } from "./app/routing";
import { configOptions } from "./configs";
import type { CustomerConfig } from "./core/types";

export default function App() {
  const [configId, setConfigId] = useState(configOptions[0].id);

  const activeConfig = useMemo<CustomerConfig>(() => {
    return configOptions.find((config) => config.id === configId) ?? configOptions[0];
  }, [configId]);

  return (
    <Shell
      activeConfig={activeConfig}
      configs={configOptions}
      onConfigChange={setConfigId}
    >
      <AppRoutes activeConfig={activeConfig} />
    </Shell>
  );
}
