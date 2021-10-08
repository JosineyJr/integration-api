import express, { Express } from 'express';

export const setupApp = async (): Promise<Express> => {
  const app = express();

  return app;
};
