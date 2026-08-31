# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this folder.

## `doc/` — how to document a new route

`Doc()` (in `doc/doc.decorator.ts`) is the one decorator every controller method should use instead of stacking raw `@Api*` decorators from `@nestjs/swagger` by hand. It exists to keep the Swagger schema in sync with the runtime response envelope that `AppInterceptor` builds (see root `CLAUDE.md`) — every documented response is shaped as `{ statusCode, message, success, data }`, so the schema has to match that, not just whatever DTO you're returning.

Worked example — `src/app/app.doc.ts` wraps `Doc()` for the one existing route:

```ts
export function HealthCheckDoc(): MethodDecorator {
  return applyDecorators(
    Doc({
      response: { messageExample: 'Welcome to api!' },
      summary: 'Welcome to api!',
    }),
  );
}
```

For a new endpoint that actually returns a typed payload, define a serialization class (like `app/app.serialization.ts` does for the envelope itself, with `@ApiProperty()` on each field) and pass it as `response.classSerialization` — `Doc()` will `ApiExtraModels()` it and slot it into the envelope's `data` field in the generated schema automatically. `request.params` / `request.queries` take plain `ApiParamOptions[]` / `ApiQueryOptions[]` arrays if the route needs them documented; `request.bodyType: 'FORM_DATA'` switches the `ApiConsumes` from JSON to multipart.

Don't add `@ApiResponse`/`@ApiOperation`/etc. directly on a controller method — route it through `Doc()` (or a per-route wrapper decorator like `HealthCheckDoc()`, which is the preferred pattern once a route's doc options stop being a one-liner) so the envelope shape stays centralized in one place (`DocDefault()`).

## `common.module.ts` — adding config

Global `ConfigModule` setup lives here; see root `CLAUDE.md`'s "Config" section for the `registerAs('', ...)` empty-namespace pattern used in `../configs/index.ts`. Nothing in this file itself needs to change when adding new config values — only `configs/index.ts`.
