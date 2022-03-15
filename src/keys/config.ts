import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: '2020',
  database: 'test',
  type: 'postgres',
};

export default config;
