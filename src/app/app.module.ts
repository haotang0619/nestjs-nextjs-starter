import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { AppController } from './app.controller';
import { AppMiddleware } from './app.middleware';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [CommonModule],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    // Express 5 / path-to-regexp v8 requires the wildcard to be named
    // (bare '*' still works via Nest's LegacyRouteConverter shim, but warns).
    consumer.apply(AppMiddleware).forRoutes('*path');
  }
}
