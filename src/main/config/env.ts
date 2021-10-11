export default {
  port: process.env.APPLICATION_PORT || 3032,
  customerJwtSecret: process.env.ADMIN_JWT_SECRET || '377a4bee-1aec-4668-9cb8-823868228342',
  adminJwtSecret: process.env.CUSTOMER_JWT_SECRET || 'e5348e71-52fb-49ca-9898-a84af6a9e14f',
  connectionName: process.env.CONNECTION_NAME || 'pg',
  mongoUri:
    process.env.MONGO_URI ||
    `mongodb://${
      process.env.TS_NODE_DEV === undefined ? 'mongo_db' : 'localhost'
    }:27017/pipedrive-bling-integration-api`,
  pg_port: process.env.POSTGRES_PORT || 5432,
  pg_host: process.env.POSTGRES_HOST || 'localhost',
  pg_db: process.env.POSTGRES_DB || 'database',
  pg_user: process.env.POSTGRES_USER || 'postgres',
  pg_password: process.env.POSTGRES_PASSWORD || 'docker',
  blingApiKey: process.env.BLING_API_KEY || '3e32fd3bf46d21020bea4929dccc0f0d16e05f00d22aa312d1a1b354702f6c7e554bf093',
  redisHost: process.env.TS_NODE_DEV === undefined ? 'redis' : 'localhost',
  redisPort: 6379,
  redisInsightPort: 8001,
  pgadminPort: 15432,
  mongoExpressPort: 8081,
};
