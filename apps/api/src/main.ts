/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppInterceptor } from './app/app.interceptor';
import { AppModule } from './app/app.module';

const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setDescription('API documents.')
    .setTitle('API')
    .setVersion('0.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup('/api/docs', app, document, {
    customSiteTitle: 'Api Docs',
  });
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new AppInterceptor());
  initSwagger(app);
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
