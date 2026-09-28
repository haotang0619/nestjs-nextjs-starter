import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';

import { AppInterceptor } from '../app/app.interceptor';
import { AppModule } from '../app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // AppModule alone doesn't carry the global prefix/interceptor set up in
    // main.ts's bootstrap() — replicate the bits this test actually needs.
    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new AppInterceptor());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /api should return the response envelope', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          message: 'Welcome to api!',
          statusCode: 200,
          success: true,
        });
      });
  });
});
