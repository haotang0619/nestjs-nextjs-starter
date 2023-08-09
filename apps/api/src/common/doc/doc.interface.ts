import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export interface IDocDefaultOptions {
  httpStatus: HttpStatus;
  serialization?: ClassConstructor<any>;
}

export interface IDocOptions<T> {
  response?: IDocResponseOptions<T>;
  request?: IDocRequestOptions;
  summary?: string;
}

interface IDocResponseOptions<T> {
  httpStatus?: HttpStatus;
  classSerialization?: ClassConstructor<T>;
}

interface IDocRequestOptions {
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
  bodyType?: 'FORM_DATA' | 'JSON';
}
