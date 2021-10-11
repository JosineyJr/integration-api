import express, { Express } from 'express';
import { setupRoutes } from '@/main/config/routes';
import setupSwagger from '@/main/config/swagger';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  app.use(express.json());

  setupSwagger(app);
  setupRoutes(app);

  return app;
};
