export default {
  port: process.env.APPLICATION_PORT || 3032,
  jwtSecret: process.env.JWT_SECRET || '307eb648-937a-451b-9e5f-f8a6e46b96fb',
  connectionName: process.env.CONNECTION_NAME || 'pg',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/pipedrive-bling-integration-api',
};
