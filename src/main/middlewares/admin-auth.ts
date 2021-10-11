import { adaptMiddleware } from '../adapters';
import { makeAuthMiddleware } from '../factories';

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
