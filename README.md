# From Vue to React

A master-level course that takes a **senior Vue developer** and turns them into a **complete React architect** — not by teaching new syntax, but by inverting the mental model underneath it. Vue tracks your dependencies and updates one node; React re-renders top-down and asks you to prove what changed. Every module maps a deeply-internalized Vue instinct to its React equivalent, then shows exactly where the two diverge in execution.

The content is published as a [VitePress](https://vitepress.dev) documentation site. The full curriculum lives in **[`docs/course-syllabus.md`](./docs/course-syllabus.md)**.

## Curriculum at a glance

Nine modules, grouped into four journey parts, each targeting the point where a Vue mental model breaks down:

| # | Module | Core question it answers |
|---|--------|--------------------------|
| 1 | **Architecture & Ecosystem** | Why do Vue and React feel so different before I write a line — progressive framework vs. unopinionated library, and the ownership it transfers to me? |
| 2 | **Reactivity & Rendering** | Why does React re-render an entire subtree when Vue updates a single node, and when must I reach for `memo`/`useMemo`/`useCallback`? |
| 3 | **Fiber vs. Vapor** | How can Fiber pause and resume a render mid-tree, and what does Vue's Vapor Mode drop to win on memory and patch time? |
| 4 | **Hooks, Closures & Effects** | Why does my component re-run top-to-bottom every render, what is a stale closure, and how does `useEffect`'s dependency array differ from `watchEffect`? |
| 5 | **State Management** | How do I port a mutable Pinia store to React's immutable model with Zustand — and why does mutating then setting render nothing? |
| 6 | **Composition Patterns** | What are React's equivalents of default, named, and scoped slots — children, JSX-as-props, render props, and compound components? |
| 7 | **The React Compiler** | What does React 19's compiler automate, why does it optimize *how* not *whether* to render, and why does it fail silently? |
| 8 | **Actions & Forms** | How do Actions, `useActionState`, `useFormStatus`, and `useOptimistic` erase controlled-form boilerplate and give instant UI with automatic rollback? |
| 9 | **Suspense & Server Components** | How do `use()`, Suspense, and Server Components replace `useEffect` fetching, kill waterfalls, and ship zero JS? |

## Repository layout

This repo holds **two independent Vite stacks**. Know which one you're touching:

- **`docs/` — the project.** The VitePress site where all course content lives. Pages are Markdown; navigation is wired in `docs/.vitepress/config.mts`; the terminal/silicon theme lives in `docs/.vitepress/theme/`. **This is where new material goes.**
- **`src/` + root `index.html` — scaffold.** The leftover Vite vanilla-TS starter (the counter demo). It is *not* the learning platform; treat it as a placeholder for any future interactive app layer. Course content does **not** belong here.

## Getting started

```bash
npm install

# Run the course site (dev server on http://localhost:5180)
npm run docs:dev

# Build / preview the static site (output: docs/.vitepress/dist)
npm run docs:build
npm run docs:preview
```

> The docs dev server uses port **5180**, set in `config.mts` to avoid Vite's default 5173 (and the sibling course on 5179).

There is no test runner or linter configured yet; `tsc` (run via `npm run build`) only type-checks the `src/` scaffold, not the Markdown content.

## Adding a course page

1. Create `docs/<topic>.md`. For a module, include a `learn:` frontmatter block — it drives the on-page **StudyGuide**, the schema.org metadata, and `llms.txt` (see any existing module for the shape).
2. Register it under `nav` **and** `sidebar` in [`docs/.vitepress/config.mts`](./docs/.vitepress/config.mts) — an unregistered page won't be reachable from the site.
3. Verify it renders with `npm run docs:dev`.

Pages support ` ```mermaid ` diagrams (rendered client-side) and `> **Self-Test:**` blockquotes (styled as REPL probes) out of the box.

## Working alongside AI assistants

This project is built collaboratively with AI assistants, who are expected to:

- **Enrich the content** with high-value material, always staying aligned with the curriculum's objective — mapping Vue mental models to React and exposing where they diverge, depth over surface API tours.
- **Organize and normalize** the documentation as it grows, keeping structure and terminology consistent across modules.
- **Teach, not just write** — approach every contribution as a pedagogical guide, anticipating where a senior Vue dev's instincts will mislead them in React.
- **Stay technically current** — React 19 (the Compiler, Actions, `use()`, Server Components) and Vue 3.5 (Vapor Mode) move fast; verify claims against primary sources.
