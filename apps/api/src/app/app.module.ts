import { MiddlewareConsumer, Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { AppController } from './app.controller';
import { AppMiddleware } from './app.middleware';
import { AppService } from './app.service';

@Module({
  imports: [CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
