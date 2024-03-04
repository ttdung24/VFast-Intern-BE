import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config = {
  type: 'postgres',
  host: process.env.POSTGRE_HOST || '',
  port: parseInt(process.env.POSTGRE_PORT, 10) || 5431,
  username: process.env.POSTGRE_USERNAME || '',
  password: process.env.POSTGRE_PASSWORD || '',
  database: process.env.POSTGRE_NAME || '',
  entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
