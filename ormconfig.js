const configs = {
  type: 'postgres',
  name: process.env.CONNECTION_NAME,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrationsRun: true,
  synchronize: true,
  logging: true,
  entities: [
    `${
      process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'
    }/infra/database/postgres/entities/index.{js,ts}`,
  ],
};

module.exports = configs;
