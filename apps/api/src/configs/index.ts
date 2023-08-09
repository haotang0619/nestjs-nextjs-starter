import { registerAs } from '@nestjs/config';

const generalConfig = registerAs(
  '',
  (): Record<string, any> => ({
    nodeEnv: process.env.NODE_ENV || 'development', // 'development' | 'production'
    serverEnv: process.env.SERVER_ENV || 'local', // 'local' | 'development' | 'production'
    webUrl: process.env.WEB_URL || 'http://localhost:4200',
  }),
);

export default [generalConfig];
