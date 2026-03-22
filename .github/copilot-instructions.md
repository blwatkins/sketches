# Copilot Instructions

## Project Overview

This repository contains generative art sketches built using [p5.js](https://p5js.org/) with shared utility classes for creative coding. The project is authored by Brittni Watkins and is licensed under the MIT License.

- **Repository:** [blwatkins/sketches](https://github.com/blwatkins/sketches)
- **Homepage:** [blwatkins.github.io/sketches](https://blwatkins.github.io/sketches/)
- **Documentation:** Generated via TypeDoc to `_doc/` and copied manually to the GitHub Pages site in `docs/`

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Node.js | `^20.19.0 \|\| ^22.13.0 \|\| >=24` | Runtime |
| TypeScript | `^5.9.3` | Language |
| p5.js | `^2.2.2` | Creative coding / rendering |
| Zod | `^4.3.6` | Runtime schema validation |
| Vitest | `^4.1.0` | Unit testing |
| Webpack | `^5.105.4` | Bundling |
| TypeDoc | `^0.28.17` | API documentation |
| ESLint | `^10.1.0` | Linting (JS and TS) |

---

## Directory Structure

```
sketches/
├── .github/                  # GitHub Actions workflows, Dependabot config, CODEOWNERS
├── assets/                   # Static assets (e.g., favicon)
├── docs/                     # Jekyll-based GitHub Pages site (TypeDoc output copied here manually)
├── src/
│   ├── lib/                  # Shared utility library (validators, palette, sketch, etc.)
│   │   ├── discriminator/    # Discriminable interface, Discriminator, Discriminators
│   │   ├── number/           # NumberValidator
│   │   ├── palette/          # Palette
│   │   ├── palette-color/    # PaletteColor
│   │   ├── sketch/           # Sketch, SketchGrid, AspectRatio, render utilities
│   │   ├── string/           # StringValidator
│   │   └── index.ts          # Barrel export for the entire library
│   ├── sketches/             # Individual p5.js sketch implementations
│   └── main.ts               # Application entry point
├── tests/
│   └── lib/                  # Unit tests mirroring the src/lib/ structure
├── typedoc/                  # Custom TypeDoc CSS
├── _compiled/                # TypeScript compiler output (gitignored)
├── _coverage/                # Vitest coverage output (gitignored)
├── _dist/                    # Webpack bundle output (gitignored)
├── _doc/                     # TypeDoc documentation output (gitignored)
├── .gitignore
├── .node-version             # Pinned Node.js version (v24.14.0)
├── eslint.config.js.mjs      # ESLint config for JavaScript/ESM files
├── eslint.config.ts.mjs      # ESLint config for TypeScript files
├── package.json
├── tsconfig.json
├── typedoc.json
├── vitest.config.ts
└── webpack.config.mjs
```

---

## npm Scripts

| Script | Command | Description |
|---|---|---|
| `docs` | `typedoc` | Generate API documentation to `_doc/` |
| `lint:js` | `eslint -c eslint.config.js.mjs .` | Lint JavaScript/ESM files |
| `lint:ts` | `eslint -c eslint.config.ts.mjs .` | Lint TypeScript files |
| `lint:all` | `npm run lint:js && npm run lint:ts` | Lint all files |
| `test` | `vitest run` | Run all unit tests once |
| `test:watch` | `vitest` | Run tests in watch mode |
| `test:ui` | `vitest --ui` | Run tests with the Vitest UI dashboard |
| `test:coverage` | `vitest run --coverage` | Run tests and generate a coverage report |
| `build` | `webpack --mode production` | Build for production |
| `build:dev` | `webpack --mode development` | Build for development |
| `build:check` | `npm run build:dev && npm run build` | Verify both builds succeed |
| `serve` | `webpack-dev-server --mode production` | Serve the production build |
| `serve:dev` | `webpack-dev-server --mode development` | Serve the development build |

---

## TypeScript Conventions

- **Target:** ES2022
- **Module system:** ESNext with `bundler` module resolution
- **Strict mode:** Enabled (`strict: true`) with all additional strict checks turned on
- **Output directory:** `_compiled/` (from `tsc`)
- **No implicit `any`**, no implicit returns, no unused locals or parameters
- **`noEmitOnError: true`** — the compiler will not emit output if there are errors
- **Type definitions:** Use `interface` (not `type`) for object type definitions, enforced by ESLint rule `@typescript-eslint/consistent-type-definitions: ['error', 'interface']`
- **Module exports:** Use barrel `index.ts` files for each module in `src/lib/`

### Static Classes

Static utility classes (e.g., `StringValidator`, `NumberValidator`) must:
- Have a `private constructor()` that throws an `Error` to prevent instantiation
- Expose public static getters or methods only
- Include a JSDoc `@throws` on the constructor documenting the instantiation error

---

## Code Style (ESLint-Enforced)

The project uses two ESLint configs:
- `eslint.config.js.mjs` — for JavaScript/ESM files (`.js`, `.mjs`, etc.)
- `eslint.config.ts.mjs` — for TypeScript files (`.ts`, `.mts`, etc.)

### Formatting Rules

| Rule | Value |
|---|---|
| Indentation | 4 spaces |
| Quotes | Single quotes (template literals always allowed) |
| Semicolons | Always required |
| Brace style | `1tbs` (opening brace on same line) |
| Trailing commas | Never |
| Operator linebreak | Before the operator |
| ES version | ES2022 |

### Control Flow

- **Prefer conditional blocks (`if`/`else`) over ternary expressions (`? :`).**
  Use `if`/`else` statements for all conditional logic.

---

## Hex Color String Conventions

- Hex color strings are validated by the patterns in `StringValidator`:
  - `HEX_COLOR_PATTERN` — matches `#RRGGBB` or `#RRGGBBAA`
  - `HEX_COLOR_PATTERN_RGB` — matches `#RRGGBB` only
  - `HEX_COLOR_PATTERN_RGBA` — matches `#RRGGBBAA` only
- **Mixed case hex strings are not accepted.** Case must be consistent: either all uppercase (`#A1B2C3`) or all lowercase (`#a1b2c3`). Mixed case strings like `#A1b2C3` are invalid.

---

## Documentation

- **JSDoc comments** are required on all public APIs
- Use `@param`, `@returns`, and `@throws` tags as appropriate
- TypeDoc generates API docs from the entry points listed in `typedoc.json`
- TypeDoc output goes to `_doc/` (gitignored); the GitHub Pages docs site is in `docs/`
- `typedoc.json` has `"treatWarningsAsErrors": true` and `"validation": { "notExported": true, "invalidLink": true, "notDocumented": true }`
- All public members must be documented; undocumented public members will fail the TypeDoc build

---

## Testing Conventions

- **Framework:** Vitest (with `globals: true` in `vitest.config.ts`)
- **Environment:** `jsdom`
- **Test file location:** `tests/lib/<module>/<file>.test.ts` (mirrors `src/lib/` structure)
- **Test file pattern:** `tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`
- **Coverage output:** `_coverage/` (gitignored)
- Always explicitly import Vitest utilities from `'vitest'` (e.g., `import { describe, test, expect } from 'vitest';`)
- Parameterized tests use `test.each` with a descriptive label
- Helper interfaces and functions for test cases are defined inside the enclosing `describe` block
- Import library classes and types from `'../../../src/lib'` (via the barrel `index.ts`)

---

## GitHub Actions CI

The following workflows run on pull requests:

| Workflow | File | Description |
|---|---|---|
| Build | `npm-build.yml` | Runs `npm run build:check` |
| Test | `npm-test.yml` | Runs `npm test` |
| CodeQL | `codeql.yml` | Static code analysis |
| GitHub Pages | `gh-pages-jekyll.yml` | Deploys the Jekyll docs site |

CI uses a Node.js matrix of `20.x`, `22.x`, and `24.x`.

---

## File Headers

All source files must include the MIT License copyright header at the top:

```typescript
/*
 * Copyright (c) <year> Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
```
