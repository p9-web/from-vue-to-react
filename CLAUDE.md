# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

A learning platform for **senior Vue developers transitioning to React** (see `README.md`). The substance of the project is the **VitePress documentation site under `docs/`** — that is where course content lives and grows. The course is framed as a **translation layer**: each module maps a Vue mental model to its React equivalent, then goes a layer deeper to where the two diverge in execution.

The curriculum (`docs/course-syllabus.md`) is **10 modules across four parts**:

- **Part I · The Mental-Model Shift** — 01 Architecture & Ecosystem · 02 Reactivity & Rendering · 03 Identity & Equality
- **Part II · The Execution Engine** — 04 Fiber vs. Vapor · 05 Hooks, Closures & Effects
- **Part III · State & Composition** — 06 State Management · 07 Composition Patterns
- **Part IV · Modern React (19+)** — 08 The React Compiler · 09 Actions & Forms · 10 Suspense & Server Components

AI assistants are expected to (per `README.md`): augment the content with high-value material aligned to the stated objectives, organize/normalize docs as they accumulate, act as pedagogical guides, and eventually implement per-user progress tracking.

## The stack

The site is a **VitePress** app under `docs/`. Content is Markdown; nav/sidebar are configured in `docs/.vitepress/config.mts`; the custom "terminal/silicon" theme lives in `docs/.vitepress/theme/`. New course material goes here as `.md` pages wired into the sidebar.

## Commands

```bash
npm run docs:dev        # dev server on port 5180 (set in config.mts, not the Vite default)
npm run docs:build      # build to docs/.vitepress/dist — also FAILS on dead internal links
npm run docs:preview    # preview the built site
```

There is **no test runner and no linter**. The only static gate is `npm run docs:build`, which compiles the theme/Vue and **fails on broken internal links** — run it to verify changes. Don't claim tests pass; there are none.

## Authoring course content (the primary work)

Writing and curating course material is the main job here. When adding or editing docs under `docs/`, follow these rules (derived from `README.md`):

- **Depth over breadth; execution over APIs.** Explain how things actually run — the mechanism, the memory, the cost — not how to call the API. The audience is senior devs; skip the basics and go a layer below where their mental model usually stops. Match the rigor of `docs/course-syllabus.md` (e.g. reference identity, stale closures, reconciliation keys, the render snapshot).
- **Teach, don't just document.** Lead with the question or the misconception, then reveal the mechanism. Use concrete, runnable Vue↔React examples and self-tests (the `> **Self-Test:**` blocks are the model). Anticipate where a Vue developer's intuition breaks.
- **Stay consistent as the docs grow.** Reuse the terminology, module numbering, and structure already established in `docs/course-syllabus.md`. Each module page opens with an H1 and a one-line question hook (`<p class="module-hook">`), then a `learn:` frontmatter-driven study guide.
- **Stay aligned with the goal.** New content must serve the Vue→React "translation layer" mission — deepening execution-level understanding of how React differs from Vue. If a topic doesn't do that, it probably doesn't belong.
- Claims about runtime/engine behavior must be **correct and verifiable** — prefer referencing real source (react.dev, vuejs.org, the React Compiler docs, V8) over hand-waving.

## Conventions worth knowing

- **Adding a doc page:** create `docs/<name>.md` with a `learn:` frontmatter block, then register it in the `part1`–`part4` arrays in `docs/.vitepress/config.mts` (nav + sidebar derive from those) or it won't be reachable. Keep `selfTests:` equal to the page's actual number of `> **Self-Test:**` blocks.
- **Single source of truth:** the `learn:` frontmatter feeds the on-page StudyGuide, the schema.org JSON-LD, and the generated `llms.txt` / `llms-full.txt` (see `config.mts`).
- **Custom markdown:** ` ```mermaid ` fences render as the `<Mermaid>` component; blockquotes opening with "Self-Test" get a `.self-test` REPL-probe style. Note: `{{ }}` in **inline** code is parsed as Vue interpolation and breaks the build — write `{ {…} }` or use a fenced code block.
- This **is** a git repository; pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
