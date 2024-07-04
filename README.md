# nestjs-nextjs-starter

## Overview

- 🗂 [Nx](https://nx.dev/) monorepo
- 🚀 [NestJS](https://nestjs.com/) 10
- ⚡️ [Next.js](https://nextjs.org/) 14
- ⚛️ [React](https://beta.reactjs.org/) 18
- ⛑ TypeScript
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🚓 Commitlint — To make sure your commit messages follow the [convention](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs

## Prerequisite

Install `pnpm`

```bash
brew install pnpm # macOS
```

## Development

To start the project locally, run:

```bash
pnpm install # only for the first time or for installing new dependencies
pnpm start
```

- Check `http://localhost:3333/api` for backend (NestJS).
- Check `http://localhost:3333/api/docs` for backend docs (NestJS).
- Check `http://localhost:4200` for frontend (Next.js).

## Directory Structure

- [`.husky`](.husky) — Husky configuration and hooks.
- [`.storybook`](.storybook) - Folder used by Storybook.
- [`apps/api`](./apps/api) — NestJS codes.
- [`apps/web`](./apps/web) — Next.js codes.

## Scripts

- `pnpm start` — Starts the application in development mode.
- `pnpm start:prod` — Starts the application in production mode (after build).
- `pnpm start:story` — Starts the Storybook in development mode.
  - Check `http://localhost:4400`.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm build:story` — Creates an optimized production build of Storybook into `/storybook-static`.
- `pnpm lint` — Runs ESLint for all files in the `apps` & `libs` directory.
- `pnpm test` — Runs tests for all files in the `apps` & `libs` directory.

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
