import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configs from '../configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
      isGlobal: true,
      load: configs,
    }),
  ],
})
export class CommonModule {}
