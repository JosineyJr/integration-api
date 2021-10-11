import {
  loginParamsSchema,
  authenticatedUserSchema,
  integrationParamsSchema,
  integrationResponseUserSchema,
  errorSchema,
} from './schemas/';

export default {
  integrationResponse: integrationResponseUserSchema,
  loginParams: loginParamsSchema,
  integrationParams: integrationParamsSchema,
  authenticatedUser: authenticatedUserSchema,
  error: errorSchema,
};
