<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project conventions

Everything below this line is hand-written project documentation, not managed by `next dev` — it's safe to edit.

## Commands

```bash
npm install    # first time / after adding deps, also runs `husky` via the `prepare` script
npm run dev    # dev server on :3000
npm run build  # production build
npm start      # serve the production build (after npm run build)
npm run lint   # prettier --write + eslint --fix over src/**/*.{ts,tsx}
```

Path alias: `@/*` → `src/*` (see `tsconfig.json`). Import order is enforced by `eslint-plugin-perfectionist` (`eslint.config.mjs`) — builtin → react/next → external → `@/**` ("internal") → parent → sibling, alphabetical within each group; `npm run lint` auto-fixes this.

## CSS variables are the actual source of truth for design tokens — not the MUI theme object

`src/theme/colorVariables.tsx`, `fontVariables.tsx`, and `spacingVariables.tsx` each export a flat `{ '--token-name': value }` map. `src/app/layout.tsx` merges all three and injects them as an inline `<style>` `:root{...}` block on every request — that's the only place they're written to the DOM; there's no separate CSS file for them. Two independent consumption paths read from these same maps, and both must be understood before touching a token:

1. **Raw CSS custom properties**, used directly in `sx` props / CSS throughout the app, e.g. `color: 'var(--neutral-10)'`, `fontWeight: 'var(--weight-M)'`, `zIndex` etc. (see `common/ErrorMessage.tsx`, `globals.css`).
2. **The MUI theme object** (`src/theme/index.tsx`), built with `createTheme()`, reads the *same* `colorVariables` map at build time (e.g. `colorVar['--primary-6']`) to populate `theme.palette.*` — so `theme.palette.primary.main` and `var(--primary-6)` always resolve to the same color by construction, not by convention someone has to keep in sync manually.

Adding a new color/spacing/weight token: add it to the relevant `theme/*Variables.tsx` map (it becomes available as `var(--your-token)` everywhere immediately). If it should also be reachable via `theme.palette`/MUI props, wire it into `theme/index.tsx`'s `palette` too — that step is not automatic.

`--100vh` / `--vh` are seeded inline in this same `:root` block (`--100vh:100vh;--vh:1vh`) so there's no flash-of-wrong-height before JS runs, then kept live by `useViewportHeightVar()` (`hooks/useViewportHeightVar.ts`, invoked once in `Providers.tsx`) — it recalculates them on `resize` because mobile browsers change the visible viewport as their chrome shows/hides, making plain `100vh`/`100dvh` unreliable there. Use `var(--100vh)` for any full-height layout (see `components/Layout.tsx`), not `100vh` directly.

## Typography variants: `T{size}{weight}` naming drives real MUI variants

`theme/util.ts`'s `textHierarchy` array lists every custom `Typography` variant as a string like `'T16M'` (size `16`, weight `M` = Medium). `theme/index.tsx` parses each entry (`key.slice(1,3)` → size, `key[3]` → weight) and auto-generates a `MuiTypography` `styleOverrides` entry for it via `textStyle(size, weight)`, and forces every one of these variants to render as a `<p>` element (`variantMapping`) regardless of MUI's usual per-variant default tag. `theme/type.ts` does the corresponding TS module augmentation so `<Typography variant="T16M">` type-checks at all.

To add a new size or weight: extend `textHierarchy` (and, for a genuinely new size, `sizeMapping`/`TextSize` in `theme/util.ts`) — don't hand-write one-off `sx` font styles for text that should be a design-system variant.

## `mergeSx` — how every reusable component composes its own default `sx` with a caller's

`theme/util.ts`'s `mergeSx(...sxes)` concatenates multiple `sx` values into the array form MUI accepts, instead of shallow-merging (which would let a caller's `sx` silently clobber a component's own default styles for the same key in some cases, or vice versa depending on spread order). Every reusable primitive in `src/components/` (`Center`, `HorizontalBlock`, `VerticalBlock`, `LoaderCircle`, `ConfirmModal`) follows the same shape: accept an `sx` prop, `forwardRef`, and return `mergeSx(ownDefaultSx, sx)`. Follow this pattern for new shared components rather than spreading `sx` directly.

## `Providers.tsx` is the single composition root

`components/Providers.tsx` wires up, in order: a lazily-`useState`-initialized `QueryClient` (deliberately **not** a module-level singleton — see the linked [TanStack Query discussion](https://github.com/TanStack/query/discussions/4920) in the code; a singleton leaks query cache across requests/users in SSR), MUI's `ThemeProvider` + `CssBaseline`, `nextjs-toploader`'s route-change progress bar, the app `Layout` (adds `Footer`, the scrollable main container), and `ToastContainer`. New app-wide providers belong here, in this order relative to the existing ones unless there's a specific reason to change it.

## Mutation errors → toast is centralized, not per-call

`query/client.tsx`'s `defaultOnError`/`defaultErrorMessage` extract a message from an Axios error (`response.data.message`, falling back through `error.message` to a generic string) and fire a `react-hot-toast` error toast. `Providers.tsx` wires this in as `QueryClient`'s `defaultOptions.mutations.onError`, so **every** `useMutation` gets an error toast for free — don't re-implement error-toast handling in an individual mutation unless it genuinely needs different behavior. `lib/local-api.ts`'s shared `axios` instance (`baseURL: '/api'`) is the client for this app's own Next.js API routes. `lib/api.ts` is a separate instance (`baseURL: 'http://localhost:4000/api'`) for the standalone backend on the `nest-only` branch — use whichever instance matches where a given call is actually going, don't default everything to `local-api`.

## `GENERAL_Z_INDEX` (`constants/layout.tsx`) is the z-index scale

Overlays/floating UI should reuse `GENERAL_Z_INDEX.MODAL` / `.POPOVER` / `.IN_FRONT_LEVEL_1..5` (see `ConfirmModal.tsx`'s `CloseButton`/`MobileContainer`/`DesktopContainer`) instead of picking an arbitrary `zIndex`.

## Tailwind + MUI coexist deliberately incompletely

`globals.css` imports only Tailwind's `theme.css` and `utilities.css` layers — **not** `preflight` (Tailwind's own CSS reset). MUI's `CssBaseline` (mounted in `Providers.tsx`) already provides a reset; importing both would have them fight each other. Tailwind utility classes are available for non-MUI markup, but don't expect Tailwind's base/reset styles to be present.

## Some files are intentionally empty stubs, not bugs

`app/page.tsx` and `components/Footer.tsx` currently just `return <></>;` — these are the starter's placeholder content, not accidentally-blank files or something to "fix" by inferring what should go there. `app/layout.tsx`'s `<body suppressHydrationWarning>` is similarly deliberate (suppresses a false-positive hydration warning, most commonly caused by browser extensions injecting attributes into `<body>` before React hydrates) — don't remove it as a "cleanup."
