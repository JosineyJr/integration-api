import { Router } from 'express';
import { adaptRoute } from '../adapters';
import { makeSignUpController } from '../factories';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
