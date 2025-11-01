import { defineEndpoint } from '@directus/extensions-sdk';
import { createControllers } from '../../../controllers/index.js';
import { Router } from 'express';
import * as endpoints from './endpoints.js';

// export default defineEndpoint((router) => {
// 	router.get('/', (_req, res) => res.send('Hello, World!'));
// });

interface EndpointModule<T = any> {
  (controller: T): Router;
}

export default defineEndpoint({
  id: 'custom',
  handler: async (router, context) => {
    const schema = await context.getSchema();
    const controllers = createControllers({ context, schema });

    // Centralized route definitions
    const routes: Record<string, [EndpointModule, any]> = {
      '/dramas': [endpoints.setupDramaEndpoints, controllers.dramas],
    };

    // Dynamically register routes
    for (const [path, [setupFn, controller]] of Object.entries(routes)) {
      if (controller && typeof setupFn === 'function') {
        router.use(path, setupFn(controller));
      }
    }
  },
});