import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should set the response message to "Welcome to api!"', () => {
      const appController = app.get<AppController>(AppController);
      const res = {} as Response;
      appController.getData(res);
      expect(res.message).toEqual('Welcome to api!');
    });
  });
});
