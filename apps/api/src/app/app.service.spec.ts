import { Test } from '@nestjs/testing';
import { Response } from 'express';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should set the response message to "Welcome to api!"', () => {
      const res = {} as Response;
      service.getData(res);
      expect(res.message).toEqual('Welcome to api!');
    });
  });
});
