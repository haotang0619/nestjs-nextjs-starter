import { ApiProperty } from '@nestjs/swagger';

export class AppResponseSerialization<T = Record<string, any>> {
  data: T;

  @ApiProperty({ example: 'OK' })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;
}
