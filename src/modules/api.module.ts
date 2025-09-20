import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Controllers from './controllers/index.js';
import * as Entities from './entities/index.js';
import * as Services from './services/index.js';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SeedingService } from './seeder/seeder.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([...Object.values(Entities)]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService?.get('jwtSecret'),
        signOptions: { expiresIn: configService?.get('jwtExpiresIn') },
      }),
    }),
  ],
  providers: [ConfigService, JwtService, SeedingService, ...Object.values(Services)],
  controllers: [...Object.values(Controllers)],
})
export class ApiModule {}
