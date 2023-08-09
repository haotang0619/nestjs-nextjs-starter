import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    req._metadata = {
      timestamp: +new Date(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent: new UAParser(req['User-Agent']).getResult(),
    };
    helmet()(req, res, next);
  }
}
