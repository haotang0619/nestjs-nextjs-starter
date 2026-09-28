# nestjs-nextjs-starter

## Overview

- 🗂 [pnpm workspaces](https://pnpm.io/workspaces) monorepo — `apps/api` + `apps/web`
- 🚀 [NestJS](https://nestjs.com/) 12 — see [`apps/api`](./apps/api)
- ⚡️ [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 — see [`apps/web`](./apps/web)
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🧪 Jest — Testing framework (`apps/api`)
- 🚓 Commitlint — To make sure your commit messages follow the [convention](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs

This is the full-stack mode of the starter. For a backend-only or frontend-only project, use the `nest-only` or `next-only` branch — `apps/api` and `apps/web` are imported from those branches and kept as close to them as possible.

## Prerequisite

- Node.js >= 24.9 (required by `apps/api`'s Jest setup, see [`apps/api/README.md`](./apps/api/README.md)).
- pnpm — the exact version is pinned by `package.json`'s `packageManager` field:

```bash
corepack enable pnpm # or: brew install pnpm
```

## Development

To start the project locally, run:

```bash
pnpm install # only for the first time or for installing new dependencies
pnpm dev
```

- Check `http://localhost:4000/api` for backend (NestJS).
- Check `http://localhost:4000/api/docs` for backend docs (Swagger).
- Check `http://localhost:3000` for frontend (Next.js).

Each app reads its own `.env` (see `apps/api/example.env` and `apps/web/example.env`).

## Directory Structure

- [`.husky`](.husky) — Husky configuration and hooks (shared by both apps).
- [`apps/api`](./apps/api) — NestJS codes.
- [`apps/web`](./apps/web) — Next.js codes.

## Scripts

Run from the repo root:

- `pnpm dev` — Starts both apps in development mode (`pnpm dev:api` / `pnpm dev:web` for one of them).
- `pnpm build` — Creates optimized production builds of both apps.
- `pnpm lint` — Runs Prettier + ESLint (with auto-fix) in both apps.
- `pnpm test` — Runs unit tests.
- `pnpm test:e2e` — Runs `apps/api`'s end-to-end tests.

To run any app-level script, use `pnpm --filter ./apps/<app> <script>` (e.g. `pnpm --filter ./apps/api script hello`), or `cd` into the app and run `pnpm <script>`. See each app's README for its own scripts. Add a dependency to one app with `pnpm --filter ./apps/<app> add <pkg>`.

Dependency build scripts are blocked by default in pnpm; allow or deny them under `allowBuilds` in `pnpm-workspace.yaml` (`pnpm approve-builds`).

## Using This as a Starter for a New Project

To spin `main` off into its own standalone repo, with a single, complete initial commit and no shared git history with `nestjs-nextjs-starter`:

```bash
# Export the tree only — .gitignore'd files (node_modules, dist, .next, ...) are excluded automatically
git archive main | (mkdir -p /path/to/new-project && cd /path/to/new-project && tar -x)
cd /path/to/new-project
```

Before making the first commit:

1. Delete the "Relationship to other branches" section in `CLAUDE.md` and `apps/api/CLAUDE.md` — they describe this repo's multi-branch setup, which won't exist in the new repo.
2. Rename the root `package.json`'s `"name"` and README's title/Overview for the real project.

```bash
git init -b main
git add -A
git commit -m "feat: initial commit"

git remote add origin <new-project-repo-url>
git push -u origin main
```

Then `pnpm install` once — husky's hooks are installed via the root `prepare` script and won't exist until then.

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
