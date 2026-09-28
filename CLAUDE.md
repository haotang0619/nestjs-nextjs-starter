# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

pnpm-workspace monorepo (no Nx, no shared libs) with two independent apps. Each app has its own `package.json`, `tsconfig.json`, `eslint.config.mjs` and `lint-staged` config, and its own agent docs — read those before working inside an app:

- `apps/api` — NestJS 12 backend on :4000. See `apps/api/CLAUDE.md` (and `apps/api/src/common/CLAUDE.md`).
- `apps/web` — Next.js 16 frontend on :3000. See `apps/web/AGENTS.md`.

Only the cross-app tooling lives at the root: husky hooks, commitlint, `.prettierrc`, `.editorconfig`, and the workspace scripts.

## Commands

Package manager is pnpm (version pinned by `packageManager` in `package.json`). Node **>= 24.9**.

```bash
pnpm install     # from the root only; also installs husky via the root `prepare` script
pnpm dev         # both apps in parallel (runs every root `dev:*` script); `pnpm dev:api` / `pnpm dev:web` for one
pnpm build       # pnpm -r build
pnpm lint        # pnpm -r lint (prettier --write + eslint --fix)
pnpm test        # pnpm -r --if-present test (only apps/api has tests)
pnpm test:e2e    # apps/api e2e
pnpm --filter ./apps/api <script>   # any app-level script, e.g. `pnpm --filter ./apps/api script hello`
```

pnpm passes arguments after the script name straight through — don't add `--` (e.g. `pnpm test -t "name"`, not `pnpm test -- -t "name"`; with `--`, Jest receives it literally and treats `-t` as a path pattern).

The pre-commit hook runs root `lint-staged`, which picks the nearest `lint-staged` config (each app's `package.json`) per staged file and runs the tasks from that app's directory, so each app's own ESLint flat config applies.

Dependency lifecycle scripts are blocked by pnpm unless listed under `allowBuilds` in `pnpm-workspace.yaml`.

## Relationship to other branches

> **Spinning this repo off into a new standalone project?** Delete this section (and the same-named one in `apps/api/CLAUDE.md`). See README's "Using This as a Starter for a New Project".

`nest-only` and `next-only` are orphan branches (no shared git history with `main`) holding standalone, npm-managed versions of the two apps. `apps/api` / `apps/web` are imported from them and should stay as close to them as possible — dependency versions and app code included. The intended differences are only the monorepo-specific ones: no husky/`prepare` inside the apps, shared root configs (`.prettierrc`, `.editorconfig`, `.commitlintrc.json`, `.husky/`), `pnpm` instead of `npm` in scripts and docs, and `apps/api`'s test scripts running `node_modules/jest/bin/jest.js` (pnpm's `.bin/jest` is a shell shim that `node` can't run). When changing app code here, consider whether the matching branch needs the same change, and vice versa.
