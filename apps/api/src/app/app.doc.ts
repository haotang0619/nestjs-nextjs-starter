import { applyDecorators } from '@nestjs/common';

import { Doc } from '../common/doc/doc.decorator';
import { HealthCheckSerialization } from './app.serialization';

export function HealthCheckDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      response: { classSerialization: HealthCheckSerialization },
      summary: 'Welcome to api!',
    }),
  );
}
