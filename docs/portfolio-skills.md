---
title: "Portfolio Skills"
layout: page
---

This page is a living technical record of skills, tools, and engineering practices demonstrated in this project.

## Project Overview

*Sketches* is a collection of generative art sketches implemented in p5.js, showcasing a variety of visual styles and techniques.
The project is structured to support iterative development and experimentation with creative coding concepts, while also demonstrating a range of software engineering skills and best practices.

## At a Glance

- **Project Type:** Creative Coding / Generative Art
- **Primary Runtime:** [Node.js](https://nodejs.org/en)
- **Rendering Library:** [p5.js](https://p5js.org/)
- **Primary Implementation Language:** [TypeScript](https://www.typescriptlang.org/)
- **Automation:** GitHub Actions workflow for build and test validation
- **Dependency Automation:** Automated dependency update management with Dependabot
- **Documentation Pattern:** Source-linked evidence with generated API docs via [TypeDoc](https://typedoc.org/)

## Skills and Tooling Inventory

- **Languages:** [TypeScript](https://www.typescriptlang.org/), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML), [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS), [Markdown](https://www.markdownguide.org/), [YAML](https://yaml.org/)
- **Runtime & Libraries:** [Node.js](https://nodejs.org/en), [p5.js](https://p5js.org/)
- **TypeSafety & Validation:** [TypeBox](https://github.com/sinclairzx81/typebox), [Zod](https://zod.dev/)
- **Testing:** [Vitest](https://vitest.dev/)
- **Bundling:** [webpack](https://webpack.js.org/)
- **Code Quality:** [ESLint](https://eslint.org/)
- **Documentation:** [TypeDoc](https://typedoc.org/)
- **Site Generation:** [Bundler](https://bundler.io/), [Jekyll](https://jekyllrb.com/), [Liquid](https://shopify.github.io/liquid/)
- **Dependency Management:** [npm](https://www.npmjs.com/)
- **Versioning & Platform:** [Git](https://git-scm.com/), [GitHub](https://github.com/)
- **Automation:** [GitHub Actions](https://github.com/features/actions)
- **Hosting & Deployment:** [GitHub Pages](https://docs.github.com/en/pages)
- **Code Analysis / Security:** [CodeQL](https://codeql.github.com/)
- **Dependency Automation:** [Dependabot](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-dependabot-version-updates)
- **Environment Management:** [n](https://github.com/tj/n), [rbenv](https://rbenv.org/)
- **Development Environments:** [WebStorm](https://www.jetbrains.com/webstorm/), [Visual Studio Code](https://code.visualstudio.com/)
- **AI-Assisted Development:** [GitHub Copilot](https://github.com/features/copilot)

## Capability Record

- Interface-driven architecture for sketch implementations
- Class-based visual logic organized around p5 lifecycle hooks
- Typed entrypoint composition and runtime binding
- Schema-driven type definitions using TypeBox and Zod
- Runtime type validation via discriminator pattern across multiple schema libraries
- Static validator utilities for number and string types
- Parameterized unit testing with Vitest
- CI-based lint, build, and test verification
- Automated static site deployment and project documentation generation
- AI-assisted development and pair programming using GitHub Copilot workflows

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
- This supports focused iteration on visual behavior while preserving shared conventions across sketch implementations.
- Evidence:
  - [`src/sketches/00-hello-world/hello-world-sketch.ts`](https://github.com/blwatkins/sketches/blob/main/src/sketches/00-hello-world/hello-world-sketch.ts)
  - [`src/sketches/01-experiments/00-sketch-grid/sketch-grid-sketch.ts`](https://github.com/blwatkins/sketches/blob/main/src/sketches/01-experiments/00-sketch-grid/sketch-grid-sketch.ts)

### Quality validation workflows

- Build and test validation is configured through a GitHub Actions workflow file.
- This workflow runs across multiple Node.js versions to improve compatibility confidence.
- Evidence:
  - [`.github/workflows/npm-test.yml`](https://github.com/blwatkins/sketches/blob/main/.github/workflows/npm-test.yml)

### Documentation and delivery workflows

- TypeDoc is configured for API documentation generation.
- GitHub Pages site delivery is configured through the Jekyll workflow and the `docs/` site structure.
- Evidence:
  - [`typedoc.json`](https://github.com/blwatkins/sketches/blob/main/typedoc.json)
  - [`.github/workflows/gh-pages-jekyll.yml`](https://github.com/blwatkins/sketches/blob/main/.github/workflows/gh-pages-jekyll.yml)
  - [`docs/`](https://github.com/blwatkins/sketches/tree/main/docs)

### AI-assisted development with GitHub Copilot

- GitHub Copilot is used for AI-assisted coding workflows, including code generation, refactoring, and implementation of new features via natural language prompts.
- Copilot pair programming is used interactively during development to accelerate iteration and maintain code quality.
- Evidence:
  - [`.github/copilot-instructions.md`](https://github.com/blwatkins/sketches/blob/main/.github/copilot-instructions.md)

### Schema-driven type definitions

- Runtime types for domain objects (`Discriminable`, `Palette`, `PaletteColor`, `AspectRatioConfig`) are derived directly from TypeBox or Zod schemas using `Static<typeof Schema>` or `z.infer<typeof SCHEMA>`.
- This eliminates duplication between the type definition and its validation logic and ensures that compile-time types and runtime validation stay in sync.
- Evidence:
  - [`src/lib/discriminator/discriminable.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminable.ts)
  - [`src/lib/sketch/aspect-ratio/aspect-ratio-config.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/sketch/aspect-ratio/aspect-ratio-config.ts)
  - [`src/lib/palette/palette.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/palette/palette.ts)
  - [`src/lib/palette-color/palette-color.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/palette-color/palette-color.ts)

### Runtime type validation via discriminator pattern

- The `Discriminator` static class validates objects at runtime using a two-step approach: first checking a `discriminator` field for a type tag match, then applying the full TypeBox or Zod schema parse.
- This combines lightweight tag-based narrowing with exhaustive schema validation, and works uniformly across both schema libraries.
- Evidence:
  - [`src/lib/discriminator/discriminator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminator.ts)
  - [`src/lib/discriminator/discriminable.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminable.ts)
  - [`src/lib/discriminator/discriminators.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminators.ts)

### Static validator utilities

- `NumberValidator` and `StringValidator` are static utility classes that expose reusable validation predicates and regular expression patterns (e.g., hex color format matching, single-line lowercase trimmed string validation).
- All static utility classes (including `Discriminator`) use a private constructor with a runtime `throw` to prevent instantiation, ensuring they are always used as namespaces rather than objects. Runtime constructor guards are covered by unit tests.
- Evidence:
  - [`src/lib/number/number-validator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/number/number-validator.ts)
  - [`src/lib/string/string-validator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/string/string-validator.ts)
  - [`src/lib/discriminator/discriminator.ts`](https://github.com/blwatkins/sketches/blob/main/src/lib/discriminator/discriminator.ts)

### Parameterized unit testing with Vitest

- Unit tests use `test.each` for parameterized cases, covering valid and invalid inputs including boundary values (zero, negative numbers, non-finite values, empty strings, non-string types, untrimmed strings, multiline strings, and single-line lowercase/uppercase/mixed-case strings).
- Shared test input constants and test-case builder utilities are centralized under `test/utils/` and reused across test suites to keep coverage consistent and reduce duplication.
- Evidence:
  - [`test/lib/number/number-validator.test.ts`](https://github.com/blwatkins/sketches/blob/main/test/lib/number/number-validator.test.ts)
  - [`test/lib/string/string-validator.test.ts`](https://github.com/blwatkins/sketches/blob/main/test/lib/string/string-validator.test.ts)
  - [`test/lib/discriminator/discriminator.test.ts`](https://github.com/blwatkins/sketches/blob/main/test/lib/discriminator/discriminator.test.ts)
  - [`test/utils/input/`](https://github.com/blwatkins/sketches/tree/main/test/utils/input)
  - [`test/utils/test-case/`](https://github.com/blwatkins/sketches/tree/main/test/utils/test-case)

## Current Gaps / Future Improvements

- Sketch coverage is intentionally narrow at this stage (single runtime-wired sketch); expand to additional sketches to demonstrate broader rendering patterns.
- End-to-end/browser-level tests are not yet implemented; current validation is focused on unit tests for shared library modules.
- Portfolio evidence coverage can be strengthened by adding direct links to workflow trigger blocks and bundling/output configuration where claims reference CI triggers or build output behavior.
- Documentation publishing remains partly manual (TypeDoc output copied into the docs site); automate this handoff to reduce maintenance overhead.
