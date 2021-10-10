import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeIntegratedController } from '../factories/controllers/integrated-controller';
import { makeIntegrationController } from '../factories/controllers/integration-controller';

export default (router: Router): void => {
  router.post('/integrate', adaptRoute(makeIntegrationController()));
  router.get('/integrated', adaptRoute(makeIntegratedController()));
};
