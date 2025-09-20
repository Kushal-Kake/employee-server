import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(AppModule);

  const iNestConfigService: ConfigService = app.get(ConfigService);

  app.enableCors(iNestConfigService.get('cors'));

  try {
    const port: number = iNestConfigService.get<number>('port') as number;

    const severUrl: string = `http://${iNestConfigService.get('host')}`;

    await app.listen(port, '0.0.0.0', () =>
      console.info(`🚀 Server ready at ${severUrl}:${port}`),
    );
  } catch (error: any) {
    console.error(`Error while trying to start the server: ${error?.message}`);
  }
}
bootstrap();
