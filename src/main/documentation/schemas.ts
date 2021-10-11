import {
  loginParamsSchema,
  authenticatedUserSchema,
  integrationParamsSchema,
  integrationResponseUserSchema,
  errorSchema,
  collectionsPedidosSchema,
} from './schemas/';

export default {
  integrationResponse: integrationResponseUserSchema,
  loginParams: loginParamsSchema,
  integrationParams: integrationParamsSchema,
  authenticatedUser: authenticatedUserSchema,
  error: errorSchema,
  collectionsPedidos: collectionsPedidosSchema,
};
