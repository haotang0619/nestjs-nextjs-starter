import { Controller, Get } from '@nestjs/common';

import { HealthCheckDoc } from './app.doc';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @HealthCheckDoc()
  @Get()
  getData() {
    return this.appService.getData();
  }
}
