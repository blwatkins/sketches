---
title: "Portfolio Skills"
layout: page
---

This page is a living technical record of skills, tools, and engineering practices demonstrated in this project.

## Project Overview

- **Project Type:** Creative Coding / Generative Art
- **Primary Runtime:** [Node.js](https://nodejs.org/en)
- **Rendering Library:** [p5.js](https://p5js.org/)
- **Primary Implementation Language:** [TypeScript](https://www.typescriptlang.org/)

## At a Glance

- **Current sketch count (wired to runtime):** 1
- **CI runtime coverage:** 3 Node.js versions (`20.x`, `22.x`, `24.x`)
- **Automation workflows:** 4 GitHub Actions workflows (build, test, security analysis, deployment)
- **Documentation approach:** Source-linked evidence + generated API docs

## Skills and Tooling Inventory

- **Programming Languages:** [TypeScript](https://www.typescriptlang.org/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [Markdown](https://www.markdownguide.org/)
- **Runtime & Libraries:** [Node.js](https://nodejs.org/en), [p5.js](https://p5js.org/), [Zod](https://zod.dev/)
- **Code Quality:** [ESLint](https://eslint.org/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Documentation:** [TypeDoc](https://typedoc.org/)
- **Versioning & Platform:** [Git](https://git-scm.com/), [GitHub](https://github.com/)
- **Automation & Delivery:** [GitHub Actions](https://github.com/features/actions), [GitHub Pages](https://docs.github.com/en/pages)
- **Site Generation:** [Bundler](https://bundler.io/), [Jekyll](https://jekyllrb.com/), [Liquid](https://shopify.github.io/liquid/)
- **Environment Management:** [n](https://github.com/tj/n), [rbenv](https://rbenv.org/)
- **Development Environments:** [WebStorm](https://www.jetbrains.com/webstorm/), [Visual Studio Code](https://code.visualstudio.com/)

## Capability Record

- Interface-driven architecture for sketch implementations
- Class-based visual logic organized around p5 lifecycle hooks
- Typed entrypoint composition and runtime binding
- CI-based lint, build, and test verification
- Automated static site deployment and project documentation generation
- Runtime schema validation with Zod for type-safe data structures
- Discriminated union pattern for runtime type narrowing
- Static utility class pattern with enforced non-instantiability

## Detailed Technical Notes

### Interface-driven sketch model

- A shared `Sketch` interface defines the implementation contract for sketch modules.
- This keeps sketch integration consistent and reduces coupling between entrypoint and sketch logic.
- Evidence:
  - [`src/lib/sketch/sketch.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/sketch/sketch.ts)

### Entrypoint composition

- Application startup instantiates a sketch implementation and binds its `main` function to p5.
- This keeps orchestration logic centralized and minimal.
- Evidence:
  - [`src/main.ts`](https://github.com/blwatkins/sketches/blob/main/src/main.ts)

### Sketch implementation pattern

- Sketch behavior is encapsulated in class methods mapped to p5 lifecycle hooks (`setup`, `draw`).
- This supports focused iteration on visual behavior while preserving shared conventions.
- Evidence:
  - [`src/sketches/00-hello-world/hello-world-sketch.ts`](https://github.com/blwatkins/sketches/blob/main/src/sketches/00-hello-world/hello-world-sketch.ts)

### Quality validation workflows

- CI runs lint/build and test checks on `push` and `pull_request` to `main`.
- Build and test workflows run across multiple Node.js versions to improve compatibility confidence.
- Evidence:
  - [`.github/workflows/npm-build.yml`](https://github.com/blwatkins/sketches/blob/main/.github/workflows/npm-build.yml)
  - [`.github/workflows/npm-test.yml`](https://github.com/blwatkins/sketches/blob/main/.github/workflows/npm-test.yml)

### Documentation and delivery workflows

- TypeDoc is configured for API documentation generation.
- GitHub Pages deployment is automated via Jekyll workflow configuration.
- Evidence:
  - [`typedoc.json`](https://github.com/blwatkins/sketches/blob/main/typedoc.json)
  - [`.github/workflows/gh-pages-jekyll.yml`](https://github.com/blwatkins/sketches/blob/main/.github/workflows/gh-pages-jekyll.yml)
  - [`docs/`](https://github.com/blwatkins/sketches/tree/main/docs)

### Runtime schema validation with Zod

- Zod `strictObject` schemas enforce the shape of shared data types (`PaletteColor`, `AspectRatioConfig`) at runtime.
- Types are derived from schemas using `z.infer<typeof SCHEMA>` for compile-time safety alongside runtime checks.
- Evidence:
  - [`src/lib/palette-color/palette-color.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/palette-color/palette-color.ts)
  - [`src/lib/sketch/aspect-ratio/aspect-ratio-config.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/sketch/aspect-ratio/aspect-ratio-config.ts)

### Discriminated union pattern for runtime type narrowing

- A `DISCRIMINATOR` property on shared data types enables reliable runtime type narrowing without `instanceof`.
- The `Discriminator` static class exposes `isAspectRatioConfig`, `isPalette`, and `isPaletteColor` type guard methods.
- Type guards combine discriminator matching with Zod schema validation where applicable.
- Evidence:
  - [`src/lib/discriminator/discriminator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminator.ts)
  - [`src/lib/discriminator/discriminators.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminators.ts)

### Static utility class pattern

- Utility classes (`StringValidator`, `NumberValidator`, `Discriminator`) expose only static methods and prevent instantiation at runtime.
- Private constructors throw `Error` to guard against accidental instantiation, even when the class is cast or bypassed via TypeScript.
- Evidence:
  - [`src/lib/string/string-validator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/string/string-validator.ts)
  - [`src/lib/number/number-validator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/number/number-validator.ts)
  - [`src/lib/discriminator/discriminator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminator.ts)
