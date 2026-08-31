import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getData(res: Response) {
    res.message = 'Welcome to api!';
  }
}
