import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

import { HealthCheckDoc } from './app.doc';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @HealthCheckDoc()
  getData(@Res({ passthrough: true }) res: Response) {
    return this.appService.getData(res);
  }
}
