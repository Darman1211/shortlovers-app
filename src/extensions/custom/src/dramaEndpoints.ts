import { Router } from 'express';
import { DramaController } from '../../../controllers/DramaController.js';

export const setupDramaEndpoints = (DramaController: DramaController): Router => {
  const router = Router();

  router.post('/create', DramaController.createDrama);

  return router;
};