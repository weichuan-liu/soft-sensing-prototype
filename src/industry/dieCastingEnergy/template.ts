import type { IndustryTemplate } from "../../core/types";
import { dieCastingEnergyKpis } from "./kpis";

export const dieCastingEnergyTemplate: IndustryTemplate = {
  id: "die-casting-energy-soft-meter",
  name: "Die Casting Energy Soft Meter",
  version: "0.1.0",
  domain: "die_casting_energy",
  objects: [
    "Line",
    "Machine",
    "Meter",
    "Cycle",
    "Wheel Type",
    "Shift",
    "Energy Boundary",
    "Soft Sensor",
  ],
  kpis: dieCastingEnergyKpis,
  defaultPages: ["overview", "machine_detail", "confidence_configuration"],
};
