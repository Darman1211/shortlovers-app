import { RegisterEndpointFunctions } from '../types/directus_types.js';
import { DramaController } from './DramaController.js';

// Map controller keys to their classes
const controllerMap = {
  dramas: DramaController,
} as const;

export type Controllers = {
  [K in keyof typeof controllerMap]: InstanceType<(typeof controllerMap)[K]>;
};

/**
 * Dynamically instantiates all controllers from controllerMap.
 */
export const createControllers = (
  contextData: RegisterEndpointFunctions
): Controllers => {
  return Object.fromEntries(
    Object.entries(controllerMap).map(([key, Controller]) => [
      key,
      new Controller(contextData),
    ])
  ) as Controllers;
};
