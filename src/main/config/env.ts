export default {
  port: process.env.APPLICATION_PORT || 3032,
  jwtSecret: process.env.JWT_SECRET || '307eb648-937a-451b-9e5f-f8a6e46b96fb',
  connectionName: process.env.CONNECTION_NAME || 'pg',
  mongoUri: process.env.MONGO_URI || `mongodb://${process.env.TS_NODE_DEV === undefined ? 'mongo_db' : 'localhost'}:27017/pipedrive-bling-integration-api`,
  pg_port: process.env.POSTGRES_PORT || 5432,
  pg_host: process.env.POSTGRES_HOST || 'localhost',
  pg_db: process.env.POSTGRES_DB || 'database',
  pg_user: process.env.POSTGRES_USER || 'postgres',
  pg_password: process.env.POSTGRES_PASSWORD || 'docker',
};
