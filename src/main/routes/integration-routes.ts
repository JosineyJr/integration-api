import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeIntegrationController } from '../factories/controllers/integration-controller';

export default (router: Router): void => {
  router.post('/integrate', adaptRoute(makeIntegrationController()));
};
