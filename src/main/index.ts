import './config/module-alias';
import { MongoHelper } from '@/infra/database/mongo-db';
import { PgConnection } from '@/infra/database/postgres/helpers';
import env from '@/main/config/env';

import 'reflect-metadata';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    MongoHelper.connect(env.mongoUri)
      .then(async () => {
        const { setupApp } = await import('./config/app');
        const app = await setupApp();
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`));
      })
      .catch(console.error);
  })
  .catch(console.error);
