import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tayssir',
  synchronize: true,
  logging: true,
  autoLoadEntities: true
  // cache: {
  //   type: 'redis',
  //   options: {
  //     host: '127.0.0.1',
  //     port: 6399,
  //   },
  // },
};
