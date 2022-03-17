import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  host: 'localhost',
  port: 5432,
  username: 'employee',
  password: '2020',
  database: 'employee',
  type: 'postgres',
};

export default config;
