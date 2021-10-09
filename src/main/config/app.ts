import express, { Express } from 'express';
import { setupRoutes } from '@/main/config/routes';

export const setupApp = async (): Promise<Express> => {
  const app = express();
  app.use(express.json());
  setupRoutes(app);

  return app;
};
