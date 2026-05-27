import type { CustomerConfig, IndustryTemplate, SoftSensorResult } from "./types";
import { getSoftSensorResults } from "./resultApi";

export interface SoftSensorEngineInput {
  config: CustomerConfig;
  template: IndustryTemplate;
}

export const SoftSensorEngine = {
  infer(input: SoftSensorEngineInput): SoftSensorResult[] {
    return getSoftSensorResults({ configId: input.config.id }).filter(
      (result) => result.templateId === input.template.id,
    );
  },
};
