# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is npm (not pnpm/yarn). Node **>= 24.9** is required (see "Testing" below for why).

```bash
npm install          # install deps, also runs `husky` via the `prepare` script
npm run start:dev    # dev server with watch, on :4000 (globalPrefix "api" -> http://localhost:4000/api)
npm run build         # nest build (tsc) -> dist/
npm start             # start (no watch)
npm run start:prod    # node dist/main, run against the build output
npm run lint           # prettier --write + eslint --fix over src/**/*.ts
npm run format          # prettier --write only
npm test                # jest, unit specs (*.spec.ts) only — e2e specs are excluded, see below
npm run test:watch      # jest --watch
npm run test:cov        # jest --coverage
npm run test:e2e        # jest -c jest-e2e.config.ts, runs src/e2e/**/*.e2e-spec.ts
npm run script <name>   # ts-node src/scripts/runner.ts, runs src/scripts/commands/<name>.ts's exported run()
```

Run a single test file or a single test case with jest's own flags, passed through the `test` script:

```bash
npm test -- src/app/app.service.spec.ts
npm test -- -t "should set the response message"
```

### Testing needs Node >= 24.9 + `--experimental-vm-modules`

`@nestjs/*` ships as pure ESM in Nest 12 (`"type": "module"` in every `@nestjs/*` package.json, no CJS export condition). Jest's own module loader can only `require()` a real ES module via Node's native `require(esm)`, which needs Node 24.9+, **and** Jest still needs `--experimental-vm-modules` on top of that (Node 24.9 alone is not enough — confirmed by hand, both are required). The `test`/`test:watch`/`test:cov` scripts already pass `node --experimental-vm-modules node_modules/.bin/jest` for this reason — don't strip that flag or the specs fail with `ERR_REQUIRE_ESM`, regardless of Node version.

The app itself (this project's own code, compiled to CommonJS) is unaffected at runtime — `node dist/main.js` boots fine on Node 20+, because Node's own `require(esm)` interop (unflagged since Node 20.19/22.12) handles it. The Node 24.9 requirement is a Jest-runtime-specific limitation, not an app requirement.

## Architecture

### Module system: CommonJS app, ESM dependencies

This app compiles to CommonJS (`tsconfig.json`: `module: nodenext`, resolved as CJS since `package.json` has no `"type": "module"`). This was a deliberate choice over Nest 12's newer ESM+Vitest+oxlint scaffold default, to keep Jest + ESLint + Prettier. See "Testing" above for the one place this tradeoff still bites.

### Global response envelope (`src/app/app.interceptor.ts`)

Every HTTP response is wrapped by `AppInterceptor` (registered globally in `main.ts`) into:

```ts
{ statusCode, message, success, data }
```

Controllers/services do **not** return this envelope themselves. Instead they mutate the injected Express `Response` object directly — `res.message` and `res.success` — and the interceptor reads those off `res` after the handler runs (falling back to `res.statusMessage`, then `http.STATUS_CODES[statusCode]`, then `'OK'` for the message; `success` defaults to `true`). This is why `AppService.getData(res: Response)` takes and mutates `res` instead of returning a value, and why controller methods use `@Res({ passthrough: true })`. The `Response.message`/`Response.success` fields are ambient-typed in `src/global.d.ts` (an Express namespace augmentation) — that file has to stay picked up by `tsconfig.json`'s default `include` even though nothing imports it explicitly.

`data` is re-serialized through `safe-stable-stringify` so response bodies have lexicographically sorted keys, except `id` is hoisted to be the first key when present (see the `transformer()` helper in `app.interceptor.ts`).

When documenting a route in Swagger, the response schema must mirror this envelope — that's what `common/doc/`'s decorators exist for (see `src/common/CLAUDE.md`).

### Global middleware (`src/app/app.middleware.ts`)

`AppMiddleware` runs on every request (`AppModule.configure()` applies it via `forRoutes('*')`). It attaches `req._metadata` (timestamp, resolved IANA timezone, parsed user-agent via `ua-parser-js`) and then delegates to `helmet()`. Note: `new UAParser(req['User-Agent'])` looks like a pre-existing bug (almost certainly meant `req.headers['user-agent']`) inherited from the original `main` branch — it hasn't been fixed, since a mechanical port shouldn't silently change behavior. Flag it rather than "fixing" it if you're not explicitly asked to.

### Config (`src/configs/index.ts`, `src/common/common.module.ts`)

Uses `@nestjs/config` with the `registerAs` factory pattern, registered under an **empty namespace** (`registerAs('', ...)`), so config keys land at the config root (`configService.get('webUrl')`, not `configService.get('general.webUrl')`). `configs/index.ts` exports an array of factories — adding a new config group means adding another `registerAs('someNamespace', ...)` entry to that array, not editing the existing one. `CommonModule` wires `ConfigModule.forRoot({ load: configs, isGlobal: true, envFilePath: ['.env'] })` — env vars are read from a local `.env` (gitignored; `example.env` documents the expected keys) plus `process.env` directly for anything read outside the config system (e.g. `PORT` in `main.ts`).

`webUrl` currently drives the CORS allowlist in `main.ts` — it's the one config value actually wired into app startup logic today.

### Folder structure is aspirational beyond what exists

`README.md`'s "Folder Structure" section documents `languages/`, `modules/`, `queues/` and a full per-module layout (`dtos/guards/serializations/...`, following the [ack-nestjs-boilerplate](https://github.com/andrechristikan/ack-nestjs-boilerplate) convention, cross-checked against that project's current source) — **none of that exists yet**. The only real modules today are `app/` (the root wrapper module, a single health-check route) and `common/` (global config + the Swagger doc decorator toolkit). When adding a real feature module, follow the structure the README already documents rather than improvising a new one — in particular, a health-check module belongs under `modules/health`, not as its own top-level folder, and scheduled/background job processing belongs under `queues/`, not a `jobs/` folder.

Per README: a module's `controller`/`service` file(s) live flat at the module's root when there's only one of each; they only move into `controllers/`/`services/` subfolders once a module has more than one.

### Unit vs e2e tests use separate Jest configs

`jest.config.ts` (`npm test`) and `jest-e2e.config.ts` (`npm run test:e2e`) both match on filename, not folder — `jest.config.ts` explicitly excludes `*.e2e-spec.ts` via `testPathIgnorePatterns` so the two runs never overlap. `src/e2e/app.e2e-spec.ts` boots `AppModule` directly via `Test.createTestingModule`, which does **not** carry `main.ts`'s imperative `app.setGlobalPrefix('api')` / `app.useGlobalInterceptors(new AppInterceptor())` calls — an e2e test has to set up whatever subset of that it actually needs itself (see that file for the pattern). If `main.ts`'s bootstrap grows more global setup, e2e tests relying on it need the same treatment.

### CLI scripts (`src/scripts/`)

`runner.ts` loads `commands/<name>.ts` with a plain `require()`, not a dynamic `import()` — this project's `tsconfig.json` uses `module: nodenext`, which preserves `import()` as a real native dynamic import instead of downleveling it to `require()` the way classic `module: commonjs` would, and a native dynamic import goes through Node's ESM resolver (which doesn't know about ts-node's CJS require-hook and can't resolve an extensionless `.ts` path). Keep using `require()` here rather than switching back to `import()`.

New scripts should extend `AbstractScript` (`scripts/abstract-script.ts`), not hand-roll their own `NestFactory.createApplicationContext`/`app.close()`/try-catch — it centralizes that plus consistent logging and a non-zero exit code on failure, so a script only implements `execute(app)`. On purpose it has no input/output file or CLI-arg-parsing conventions built in (unlike a heavier script framework you may have seen elsewhere) — add that per-script, or factor it out once it's actually duplicated, rather than speculatively generalizing now.

### Relationship to other branches

> **Spinning this branch off into a new standalone project?** Delete this section — it only describes `nest-only`'s relationship to the other branches of `nestjs-nextjs-starter`, which won't exist once this stops being a branch of that repo. See README's "Using This as a Starter for a New Project" for the extraction steps.

This branch (`nest-only`) is an orphan branch (no shared git history with `main`) that extracted and modernized the NestJS half of `main`'s Nx monorepo (`apps/api`, was NestJS 10) into this standalone, npm-managed, Nest 12 repo. It mirrors the same treatment the `next-only` branch already did for the Next.js half (`apps/web`). Do not assume any shared tooling/config with `main` — this repo has no Nx, no monorepo, and a different toolchain (npm vs pnpm, ESLint flat config vs legacy `.eslintrc`).

## Lint conventions worth knowing

- `eslint-plugin-perfectionist`'s `recommended-natural` preset is active, which alphabetically sorts imports **and class members**. `*.controller.ts` files are exempted from member sorting (`perfectionist/sort-classes: off`) because route handler order can be meaningful (e.g. a more specific route must be declared before a catch-all one) and must not be auto-reshuffled.
