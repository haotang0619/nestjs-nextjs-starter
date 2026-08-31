import { HttpStatus } from '@nestjs/common';
import { ApiParamOptions, ApiQueryOptions } from '@nestjs/swagger';
import { ClassConstructor } from 'class-transformer';

export interface IDocDefaultOptions {
  httpStatus: HttpStatus;
  messageExample?: string;
  serialization?: ClassConstructor<any>;
}

export interface IDocOptions<T> {
  request?: IDocRequestOptions;
  response?: IDocResponseOptions<T>;
  summary?: string;
}

interface IDocRequestOptions {
  bodyType?: 'FORM_DATA' | 'JSON';
  params?: ApiParamOptions[];
  queries?: ApiQueryOptions[];
}

interface IDocResponseOptions<T> {
  classSerialization?: ClassConstructor<T>;
  httpStatus?: HttpStatus;
  messageExample?: string;
}
