import { Navigate, Route, Routes } from "react-router-dom";
import type { CustomerConfig } from "../core/types";
import { ConfidenceConfigPage } from "./pages/ConfidenceConfigPage";
import { MachineDetailPage } from "./pages/MachineDetailPage";
import { OverviewPage } from "./pages/OverviewPage";

export function AppRoutes({ activeConfig }: { activeConfig: CustomerConfig }) {
  return (
    <Routes>
      <Route path="/" element={<OverviewPage activeConfig={activeConfig} />} />
      <Route path="/machine" element={<MachineDetailPage activeConfig={activeConfig} />} />
      <Route path="/confidence" element={<ConfidenceConfigPage activeConfig={activeConfig} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
