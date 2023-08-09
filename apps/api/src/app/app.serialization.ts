import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckSerialization {
  @ApiProperty({ example: 'Welcome to api!' })
  readonly message: 'Welcome to api!';
}
