import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const getOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => {
  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.username'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    synchronize: true,
    autoLoadEntities: true,
    logger: 'advanced-console',
    logging: configService.get('isDevEnv') ? 'all' : false,
    cache: true,
  };
  return config;
};
export { getOrmConfig };
