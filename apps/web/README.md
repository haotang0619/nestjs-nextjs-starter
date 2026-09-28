# nextjs-starter

## Overview

- ⚡️ [Next.js](https://nextjs.org/) 16 (App Router)
- ⚛️ [React](https://react.dev/) 19
- ⛑ TypeScript
- 🎨 [MUI](https://mui.com/) — Component library
- 🌬️ [Tailwind CSS](https://tailwindcss.com/) + CSS Modules — Utility styling for non-MUI markup
- 📏 ESLint — To find and fix problems in your code
- 💖 Prettier — Code Formatter for consistent style
- 🚓 Commitlint — To make sure your commit messages follow the [convention](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- 🐶 Husky — For running scripts before committing
- 🚫 lint-staged — Run ESLint and Prettier against staged Git files
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs

## Development

To start the project locally, run:

```bash
pnpm install # only for the first time or for installing new dependencies
pnpm dev
```

- Check `http://localhost:3000` for frontend.
- Check `http://localhost:3000/api` for backend.

## Using This as a Starter for a New Project

This app is one half of the `main` monorepo — see the root README for how to spin the whole monorepo off into a new project. To start from this app alone, use the `next-only` branch instead.

## Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Directory Structure

> Reference: https://nextjs.org/docs/app/getting-started/project-structure

1. `/app`: Contains Next.js App Router routes, layouts, and route-level conventions (`layout.tsx`, `page.tsx`, `error.tsx`, `sitemap.ts`, `robots.ts`, `globals.css`).
2. `/components`: Contains shared/reusable UI components (e.g. `Center`, `ConfirmModal`) and app-wide components, incl. `Providers.tsx` (client-side context providers).
3. `/constants`: Constant like enum, static value, status code, etc.
4. `/i18n`: Contains i18n files.
5. `/icon`: Contains icon components.
6. `/hooks`: Contains shared React hooks.
7. `/lib`: API client instances and other application/business logic.
8. `/public`: Static file serving.
9. `/query`: TanStack Query related code.
10. `/theme`: MUI theme configuration.

## Scripts

- `pnpm dev` — Starts the application in development mode.
- `pnpm start` — Starts the application in production mode (after build).
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm lint` — Runs ESLint for all files in the `apps` & `libs` directory.

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
