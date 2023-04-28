import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import stringify from 'safe-stable-stringify';

// To make response.body follows lexicographical order:
const transformer = (data: any) => {
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
    return next.handle().pipe(
      map((data) => {
        if (!!data && !data?.req?.body) {
          // It means that data is the response.body
          return transformer(data);
        }
      }),
    );
  }
}
