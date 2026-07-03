---
title: "Course Syllabus · From Vue to React"
description: "The full curriculum, organized into four journey parts — from architecture, the reactivity inversion, and identity, through the Fiber engine, hooks, state, and composition, to the React 19 frontier (the Compiler, Actions, Suspense, and Server Components)."
---

# Course Syllabus: From Senior Vue Dev to Complete React Master

Moving from Vue's progressive, intuitively reactive environment to React's strictly functional, unopinionated ecosystem is one of the hardest conceptual leaps a senior frontend engineer makes. Both are component-based; both (mostly) use a Virtual DOM — but their philosophies dictate different mental models. This course is a **translation layer**: every module takes a Vue mental model you already own and maps it to its React equivalent, then goes a layer deeper to where the two diverge in execution.

Vue operates on **compiler-informed, fine-grained reactivity**: components track their own dependencies through reactive proxies and update only what changed. React operates on a **snapshot-rendering model**: updates flow aggressively top-down, and *you* halt the unnecessary work — by hand, or, since React 19, with the compiler. Mastering React is not learning new syntax. It is inverting your model of reactivity, **identity**, state mutation, closures, and component lifecycles.

The curriculum is **four parts**. Work top-down: each part assumes the one before it, and module numbers run in part order — Part I is modules 1–3, Part II is 4–5, Part III is 6–7, Part IV is 8–10.

| Part | What it rewires | Modules |
| :--- | :--- | :--- |
| **I · The Mental-Model Shift** | Philosophy, the reactivity inversion, and reference identity — read until reflexive. | 01 Architecture · 02 Reactivity · 03 Identity |
| **II · The Execution Engine** | How React actually runs: the Fiber reconciler, and functions that re-run every render. | 04 Fiber vs. Vapor · 05 Hooks, Closures & Effects |
| **III · State & Composition** | Global state without mutation, and Vue's slots re-expressed as React composition. | 06 State Management · 07 Composition Patterns |
| **IV · Modern React (19+)** | The release that closes the gap: the Compiler, Actions, Suspense, Server Components. | 08 The React Compiler · 09 Actions & Forms · 10 Suspense & Server Components |

---

## Part I · The Mental-Model Shift
This is the floor. If the reactivity inversion and identity are fuzzy, everything above them is guesswork. Fix them first.

### Module 1 · Architecture & Ecosystem Dynamics
*Why does React hand you so little — and call it a feature?* · **~40 min**

Vue ships an assembled, version-locked toolchain; React ships a renderer and a parts catalogue you select, wire, and maintain yourself. Mastering React starts with owning that stack as a *systems integrator* — and translating `v-model`'s two-way binding into strict one-way flow.

> **Self-Test:** In Pinia you write `store.user.name = 'Jane'` and the UI updates. Why is the literal translation illegal in a React store, and what replaces it? *(React detects change by reference — you produce a new object via a setter; you don't mutate in place.)*

### Module 2 · Reactivity Models & Rendering Triggers
*Where your Vue instincts quietly misfire.* · **~45 min**

Vue's proxy subscribes a component to exactly the properties it reads and re-renders only those; React re-renders a component **and its whole subtree** on any state change, then diffs the VDOM to find what actually moved. That one inversion — opt-in vs. opt-out — is why React historically made you memoize by hand.

> **Self-Test:** A parent holds `count`; a heavy child renders unrelated data. In Vue the child never re-runs; in React it re-runs on every `count` change unless you do *what* — and why does that fix depend on reference stability?

### Module 3 · Identity & Equality
*React doesn't ask what changed. It asks: is it the same object?* · **~40 min**

With no dependency graph to consult, React leans on one cheap question nearly everywhere: *is this the same reference as last render?* Memoization, dependency arrays, immutable state, and list keys are all that single question wearing different costumes — and every render mints fresh identities for objects, arrays, and functions.

> **Self-Test:** Name the single question that unifies `React.memo`, the `useEffect` dependency array, a Zustand setter, and a list `key`. *(All four ask "is it the same reference/identity as last time?")*

---

## Part II · The Execution Engine
Stop treating rendering as magic. This part opens the reconciler and the function-component execution model — the two mechanisms behind React's hardest bugs.

### Module 4 · The Engine Room — Fiber vs. Vapor
*How can React pause a render halfway through — while Vue drops rendering altogether?* · **~50 min**

React rebuilt reconciliation as **Fiber**: a linked list of work units, decoupled from the call stack, that the scheduler can pause, resume, or discard for time-slicing. Vue 3.5's **Vapor Mode** makes the opposite bet — deleting the VDOM and emitting imperative DOM updates.

> **Self-Test:** Why can React pause a render mid-tree when the old stack reconciler could not? *(Modeling the tree as a linked list of fibers moved traversal state off the JS call stack.)*

### Module 5 · Hooks, Closures & Execution Semantics
*Why does my callback keep seeing a value that already changed?* · **~55 min**

Vue's `setup()` runs **once**; a React component re-executes top to bottom **every render**, freezing each value into that render's snapshot. That snapshot is exactly where stale closures — and the hand-maintained dependency array — come from.

**This is the module most transitioning Vue developers stumble on** — the point where React's execution model either clicks or quietly betrays you. Budget the most time here.

> **Self-Test:** A `setInterval` set up in `useEffect(fn, [])` logs a `count` that never advances past its initial value. Name the mechanism and two correct fixes.

---

## Part III · State & Composition
Now rebuild the two things you leaned on Vue for: a global store, and content distribution.

### Module 6 · Global State Management
*Why can't I just mutate the store the way Pinia let me?* · **~45 min**

Pinia mutates a live proxy; Zustand — the closest conceptual bridge, with no Provider wrapping — makes you return a **new reference** from `set`, because React schedules renders by reference change. Same intent, inverted mechanic (with Redux and MobX as the heavyweight and mutable-escape-hatch options).

> **Self-Test:** Rewrite `state.todos.push(todo)` as a valid Zustand update, and explain why the `push` version renders nothing.

### Module 7 · Advanced Composition & UI Patterns
*Where did my slots go?* · **~45 min**

React has no slot syntax — it treats JSX as a plain value you pass around. Default slots become `props.children`, named slots become JSX props, scoped slots become render props, and deep composition becomes the compound-components pattern over Context.

> **Self-Test:** A Vue `<DataTable>` uses a scoped slot to let the parent render each cell with row data. Sketch the React render-prop signature that carries that row data back up.

---

## Part IV · Modern React (19+)
React 19 neutralizes the framework's historical friction — manual memoization and form boilerplate — and pushes toward a server-first architecture. This is where the ergonomic gap with Vue narrows sharply.

### Module 8 · The React Compiler
*What if memoization wrote itself — then failed without a word?* · **~45 min**

The React Compiler moves memoization from your mind to the build step via static AST analysis, keeping plain functions and objects referentially stable. The catch: it optimizes *how* to render, not *whether*, and **bails out silently** on code it can't prove safe — the enterprise trap.

> **Self-Test:** Why is a *silent* compiler bailout more dangerous in production than a build error — and which one-line habit turns bailouts into lint failures?

### Module 9 · Actions, Forms & Optimistic Updates
*Why did all the form boilerplate suddenly disappear?* · **~40 min**

React 19 hands the async lifecycle to the framework: pass an async function to `<form action>`, and `useActionState` / `useFormStatus` / `useOptimistic` erase pending-state, prop-drilling, and rollback boilerplate. It reclaims `v-model`'s ergonomics without breaking one-way flow.

> **Self-Test:** With `useOptimistic`, what exactly does React do to the UI if the underlying server action rejects — and why does that delete your rollback code?

### Module 10 · Suspense, Data Fetching & Server Components
*What if a component could just wait for data — or never reach the browser at all?* · **~55 min**

`use()` reads a promise during render and the nearest `<Suspense>` boundary shows a fallback until it resolves — no `isLoading` booleans, and parallel boundaries kill waterfalls. Server Components go further, executing only on the server and shipping *zero JS*.

> **Self-Test:** `use()` may be called inside an `if` or a loop, breaking the Rules of Hooks that bind `useState`. What property of `use()` makes that safe?

---

When the four parts click together — the reactivity inversion and identity, the Fiber engine and its closures, immutable state and compositional patterns, and the React 19 toolkit — read the [**Conclusion · Mastering the Architectural Divide**](/conclusion) for how they compose into an enterprise-scale React practice.
