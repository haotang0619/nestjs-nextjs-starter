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

## Using This as a Starter for a New Project

To spin `nest-only` off into its own standalone repo, with a single, complete initial commit and no shared git history with `nestjs-nextjs-starter`:

```bash
# Export the tree only — .gitignore'd files (node_modules, dist, ...) are excluded automatically
git archive nest-only | (mkdir -p /path/to/new-project && cd /path/to/new-project && tar -x)
cd /path/to/new-project
```

Before making the first commit:

1. Delete `CLAUDE.md`'s "Relationship to other branches" section (see the note left there) — it describes this repo's multi-branch setup, which won't exist in the new repo.
2. Rename `package.json`'s `"name"` and README's title/Overview for the real project.

```bash
git init -b main
git add -A
git commit -m "feat: initial commit"

git remote add origin <new-project-repo-url>
git push -u origin main
```

Then `npm install` once — husky's hooks are installed via the `prepare` script and won't exist until then.

## Resources

- To check out the [guide](https://docs.nestjs.com), visit [docs.nestjs.com](https://docs.nestjs.com). 📚

## Structure

> Reference: https://github.com/andrechristikan/ack-nestjs-boilerplate

### Folder Structure (in `/src`)

1. `/app` The final wrapper module
2. `/common` The common module
3. `/configs` The configurations for this project
4. `/e2e` End-to-end tests that boot the whole app and hit real HTTP routes
5. `/languages` json languages
6. `/modules` other modules based on service/project
7. `/queues` background/scheduled job processing
8. `/scripts` One-off/maintenance scripts run via `npm run script <name>`
9. `/utils` Small stateless helper functions shared across modules

### Module structure

Full structure of a module. `controllers/` and `services/` only exist as subfolders when a module has more than one controller or service — a module with just one of each keeps that file flat at the module's root instead.

A module with a single controller and a single service:

```txt
.
└── module1
    ├── constants // constant like enum, static value, status code, etc
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
    ├── module1.controller.ts
    ├── module1.service.ts
    └── module1.module.ts
```

A module with more than one controller and/or service moves them into subfolders instead:

```txt
.
└── module2
    ├── controllers
    │   ├── module2.controller.ts
    │   └── module2-admin.controller.ts
    ├── services
    │   ├── module2.service.ts
    │   └── module2-cache.service.ts
    └── module2.module.ts
```

### Testing

- Unit tests (`*.spec.ts`) live next to the code they test and run via `npm test`.
- End-to-end tests (`*.e2e-spec.ts`) live under `/e2e`, boot the whole app with `Test.createTestingModule` + `supertest`, and run via `npm run test:e2e` (separate config: `jest-e2e.config.ts`). `AppModule` alone doesn't carry `main.ts`'s global prefix/interceptor setup, so an e2e test that needs them has to set them up itself — see `e2e/app.e2e-spec.ts`.

### CLI Scripts

`/scripts` holds one-off/maintenance scripts that need the app's DI container but not an HTTP server (`NestFactory.createApplicationContext`, not `NestFactory.create`). Run one with `npm run script <name>`, where `<name>` matches a file under `/scripts/commands` — copy `hello.ts` as a starting point.

New scripts should extend `AbstractScript` (`scripts/abstract-script.ts`) rather than hand-rolling their own bootstrap: it handles creating/closing the app context, consistent start/end logging, and setting a non-zero exit code on failure, so a script only has to implement `execute(app)`. It deliberately stops there — no input/output file conventions or CLI argument parsing are baked in; add that in the script itself (or factor it out once more than one script actually needs the same shape).

`runner.ts` is the shared entry point: it loads `commands/<name>.ts` and calls its exported `run()`, so a new script just needs to export that function (typically a one-liner that does `new MyScript().run()`).

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
- `npm test` — Runs unit tests (`*.spec.ts`).
- `npm run test:e2e` — Runs end-to-end tests (`*.e2e-spec.ts` under `/e2e`).
- `npm run script <name>` — Runs a one-off script under `/scripts/commands` (e.g. `npm run script hello`).

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
