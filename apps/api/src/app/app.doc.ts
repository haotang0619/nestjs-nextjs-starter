import { applyDecorators } from '@nestjs/common';

import { Doc } from '../common/doc/doc.decorator';

export function HealthCheckDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      response: { messageExample: 'Welcome to api!' },
      summary: 'Welcome to api!',
    }),
  );
}
