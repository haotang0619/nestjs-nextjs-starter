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

import { IDocDefaultOptions, IDocOptions } from './doc.interface';

export function Doc<T>(options?: IDocOptions<T>): MethodDecorator {
  const docs = [];
  const normDoc: IDocDefaultOptions = {
    httpStatus: options?.response?.httpStatus ?? HttpStatus.OK,
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

export function DocDefault(options: IDocDefaultOptions): MethodDecorator {
  const docs = [];
  const schema: Record<string, any> = {
    properties: {},
  };

  if (options.serialization) {
    docs.push(ApiExtraModels(options.serialization));
    schema.$ref = getSchemaPath(options.serialization);
  }

  return applyDecorators(
    ApiResponse({
      status: options.httpStatus,
      schema,
    }),
    ...docs,
  );
}
