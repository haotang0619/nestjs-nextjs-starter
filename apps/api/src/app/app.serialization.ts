import { ApiProperty } from '@nestjs/swagger';

export class AppResponseSerialization<T = Record<string, any>> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'OK' })
  message: string;

  @ApiProperty({ example: true })
  success: boolean;

  data: T;
}
