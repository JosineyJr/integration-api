import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeIntegratedController } from '../factories/controllers/integrated-controller';
import { makeIntegrationController } from '../factories/controllers/integration-controller';
import { adminAuth } from '../middlewares';

export default (router: Router): void => {
  router.post('/integrate', adminAuth, adaptRoute(makeIntegrationController()));
  router.get('/collections/pedidos', adminAuth, adaptRoute(makeIntegratedController()));
};
