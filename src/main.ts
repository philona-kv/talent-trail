import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('talent-trail/api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  await app.listen(configService.get('PORT') || 4000);
}
bootstrap();
