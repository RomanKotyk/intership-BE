import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  password: process.env.POSTGRES_PASSWORD,
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  entities: ['dist/src/**/*.entity.{js,ts}'],
  migrations: ['dist/db/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
