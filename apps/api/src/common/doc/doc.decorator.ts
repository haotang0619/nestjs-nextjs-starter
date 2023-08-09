import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiConsumes,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { AppResponseSerialization } from '../../app/app.serialization';
import { IDocDefaultOptions, IDocOptions } from './doc.interface';

export function Doc<T>(options?: IDocOptions<T>): MethodDecorator {
  const docs = [];
  const normDoc: IDocDefaultOptions = {
    httpStatus: options?.response?.httpStatus ?? HttpStatus.OK,
    messageExample: options?.response?.messageExample ?? 'OK',
    serialization: options?.response?.classSerialization ?? undefined,
  };

  if (options?.request?.bodyType === 'FORM_DATA') {
    docs.push(ApiConsumes('multipart/form-data'));
  } else docs.push(ApiConsumes('application/json'));

  docs.push(ApiProduces('application/json'));
  docs.push(DocDefault(normDoc));

  if (options?.request?.params) {
    docs.push(
      ...(options?.request?.params || []).map((param) => ApiParam(param)),
    );
  }

  if (options?.request?.queries) {
    docs.push(
      ...(options?.request?.queries || []).map((query) => ApiQuery(query)),
    );
  }

  if (options?.summary) {
    docs.push(ApiOperation({ summary: options.summary }));
  }

  return applyDecorators(...docs);
}

export function DocDefault<T>({
  httpStatus: status,
  messageExample,
  serialization,
}: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    allOf: [{ $ref: getSchemaPath(AppResponseSerialization<T>) }],
    properties: {
      statusCode: { type: 'number', example: status },
      message: { type: 'string', example: messageExample },
      success: { type: 'boolean', example: true },
    },
  };

  if (serialization) {
    docs.push(ApiExtraModels(serialization));
    schema.properties.data = { $ref: getSchemaPath(serialization) };
  }

  return applyDecorators(
    ApiExtraModels(AppResponseSerialization<T>),
    ApiResponse({ status, schema }),
    ...docs,
  );
}
