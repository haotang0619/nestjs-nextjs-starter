# nestjs-starter

## Overview

- 🚀 [NestJS](https://nestjs.com/) 12
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🧪 Jest — Testing framework
- 🚓 Commitlint — To make sure your commit messages follow the [convention](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs

## Prerequisite

- Node.js >= 24.9 — required by `npm test` (`@nestjs/*` ships as pure ESM in Nest 12; Jest needs Node's `require(esm)` support, available from 24.9). The `test` scripts already pass `--experimental-vm-modules` to enable it.

## Development

To start the project locally, run:

```bash
npm install # only for the first time or for installing new dependencies
npm run start:dev
```

- Check `http://localhost:4000/api` for the API.
- Check `http://localhost:4000/api/docs` for the API docs (Swagger).

## Resources

- To check out the [guide](https://docs.nestjs.com), visit [docs.nestjs.com](https://docs.nestjs.com). 📚

## Structure

> Reference: https://github.com/andrechristikan/ack-nestjs-boilerplate

### Folder Structure (in `/src`)

1. `/app` The final wrapper module
2. `/common` The common module
3. `/configs` The configurations for this project
4. `/health` health check module for every service integrated
5. `/jobs` cron job or schedule task
6. `/language` json languages
7. `/modules` other modules based on service/project

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

## Scripts

- `npm run start:dev` — Starts the application in development mode (watch).
- `npm start` — Starts the application in production mode (after build).
- `npm run build` — Creates an optimized production build of your application.
- `npm run lint` — Runs ESLint for all files in `src`.
- `npm test` — Runs tests for all files in `src`.

## Conventional Commits

- `feat` - A new feature
- `fix` - A bug fix
- `docs` - Documentation only changes
- `style` - Changes to UIUX or changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor` - A code change that neither fixes a bug nor adds a feature
- `perf` - A code change that improves performance
- `test` - Adding missing tests or correcting existing tests
- `build` — Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci` - Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore` - Other changes that don't modify src or test files
- `revert` - Reverts a previous commit
