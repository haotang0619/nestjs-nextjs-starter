import { STATUS_CODES } from 'http';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import stringify from 'safe-stable-stringify';

// To make response.body follows lexicographical order:
const transformer = (data: any) => {
  if (!data) return data;
  const formattedData = JSON.parse(stringify(data));
  if (data?.id) {
    // Make id the first key:
    return { id: data.id, ...formattedData };
  }
  return formattedData;
};

@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      const ctx = context.switchToHttp();
      const res = ctx.getResponse<Response>();
      const { statusCode, statusMessage } = res;

      return next.handle().pipe(
        map((data) => {
          const message =
            res.message || statusMessage || STATUS_CODES[statusCode] || 'OK';
          const success = res.success ?? true;
          return { statusCode, message, success, data: transformer(data) };
        }),
      );
    }

    return next.handle();
  }
}
