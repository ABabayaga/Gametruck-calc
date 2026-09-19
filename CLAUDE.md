# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page fuel-savings calculator for Game Truck (pt-BR). The user enters fleet data (vehicle count, km per vehicle per month, km/l consumption, diesel price), and the app shows monthly/annual diesel cost and the savings from a fixed efficiency gain. There is no backend, router or state library: it's React 19 + TypeScript + Vite 8 + Tailwind CSS v4.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # tsc -b (type-check both tsconfig projects), then vite build → dist/
npm run lint     # eslint . (flat config in eslint.config.js)
npm run preview  # serve the production build
```

There is no test runner configured.

## Architecture

- **Data flow**: `Hero` owns the form state as **strings** (so pt-BR formatting like `10.000` / `2,5` survives typing). On submit it runs `parseBR` to turn them into numbers, validates them with `validateFleet`, and then calls `onCalculate(FleetData)`. `App` runs `calculateImpact` and keeps the `ImpactResult`. `Results` renders only after the first calculation, and `App` scrolls it into view through a forwarded `ref`. React 19 passes `ref` as a normal prop, so there is no `forwardRef`.
- **`src/lib/calculator.ts`** holds all the business logic and formatting: the `EFFICIENCY_GAIN` constant (3%), the cost and savings formula, validation messages, and the `Intl` pt-BR formatters (`formatBRL`, `formatNumber`). Keep calculations and number formatting here, not in components. The `FleetData` type is defined in `Hero.tsx` and imported by the lib.
- **Styling**: Tailwind v4 through the `@tailwindcss/vite` plugin. There is no `tailwind.config.js`. Design tokens (`--color-surface`, `--color-brand`, `--color-card`, etc. and `--font-display`) live in the `@theme` block in `src/index.css`, with dark-mode overrides under `prefers-color-scheme: dark`. Use the token utilities (`bg-card`, `text-muted`, `border-field-line`, …) rather than raw colors so dark mode keeps working. The Manrope font loads from Google Fonts in `index.html`.
- Static brand assets (`LogoGameTruck.png`, `Logo-Game-Truck-Branca.png` for dark backgrounds) are served from `public/`.

## Conventions

- All user-facing text and code comments are in Brazilian Portuguese. Identifiers are in English.
- The TS config is strict about unused code (`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly`). Use `import type` for type-only imports and avoid `enum`/namespaces.
- Code style: no semicolons, single quotes, function components with a default export.
