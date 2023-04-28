# api (NestJS)

## Resources

- To check out the [guide](https://docs.nestjs.com), visit [docs.nestjs.com](https://docs.nestjs.com). 📚
- 要查看中文 [指南](readme_zh.md), 请访问 [docs.nestjs.cn](https://docs.nestjs.cn). 📚
- [가이드](readme_kr.md) 문서는 [docs.nestjs.com](https://docs.nestjs.com)에서 확인하실 수 있습니다. 📚
- [ガイド](readme_jp.md)は [docs.nestjs.com](https://docs.nestjs.com)でご確認ください。 📚

## Structure

> Reference: https://github.com/andrechristikan/ack-nestjs-boilerplate

### Folder Structure (in `/src`)

1. `/app` The final wrapper module
2. `/assets` Static file serving
3. `/common` The common module
4. `/configs` The configurations for this project
5. `/environments` Environment configurations of Nx
6. `/health` health check module for every service integrated
7. `/jobs` cron job or schedule task
8. `/language` json languages
9. `/modules` other modules based on service/project

### Module structure

Full structure of module

```txt
.
└── module1
    ├── constants // constant like enum, static value, status code, etc
    ├── controllers // business logic for rest api
    ├── decorators // warper decorator, custom decorator, etc
    ├── docs // swagger
    ├── dtos // request validation
    ├── errors // custom error
    ├── filters // custom filter
    ├── guards // validate related with database
    ├── indicators // custom health check indicator
    ├── interceptors // custom interceptors
    ├── interfaces
    ├── middlewares // custom middlewares
    ├── schemas // dynamoose schemas
    ├── serializations // response serialization
    ├── services
    ├── tasks // task for cron job
    └── module1.module.ts
```

### Response Structure

This section will describe the structure of the response.

#### Response Metadata

This is useful when we need to give the frontend some information that is not related to the endpoint.

```ts
export interface IResponseMetadata {
  languages: ENUM_MESSAGE_LANGUAGE[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  repoVersion: string;
  nextPage?: string;
  previousPage?: string;
  firstPage?: string;
  lastPage?: string;
  [key: string]: any;
}
```

#### Response Default

Default response for the response

```ts
export interface IResponse {
  metadata?: IResponseMetadata;
  [key: string]: any;
}
```

#### Response Paging

Default response for pagination.

```ts
export interface IResponsePaging {
  totalData: number;
  totalPage?: number;
  currentPage?: number;
  perPage?: number;
  availableSearch?: string[];
  availableSort?: string[];
  metadata?: IResponseMetadata;
  data: Record<string, any>[];
}
```
