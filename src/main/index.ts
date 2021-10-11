import './config/module-alias';
import { MongoHelper } from '@/infra/database/mongo-db';
import { PgConnection } from '@/infra/database/postgres/helpers';
import env from '@/main/config/env';

import 'reflect-metadata';

PgConnection.getInstance()
  .connect()
  .then(async () => {
    console.log('Postgres connected');
    MongoHelper.connect(env.mongoUri)
      .then(async () => {
        console.log('Mongodb connected');
        const { setupApp } = await import('./config/app');
        const app = await setupApp();
        app.listen(env.port, () => {
          console.log(`Server running at port ${env.port}`)
          console.log(`Api documentation at http://localhost:${env.port}/api-docs`)
          console.log(`Mongo express running at http://localhost:${env.mongoExpressPort}`)
          console.log(`Pgadmin running at http://localhost:${env.pgadminPort}`)
          console.log(`Redisinsight running at http://localhost:${env.redisInsightPort}`)
        });
      })
      .catch(console.error);
  })
  .catch(console.error);
