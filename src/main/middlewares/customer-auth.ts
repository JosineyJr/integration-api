import { adaptMiddleware } from '../adapters';
import { makeAuthMiddleware } from '../factories';

export const customerAuth = adaptMiddleware(makeAuthMiddleware('customer'));
