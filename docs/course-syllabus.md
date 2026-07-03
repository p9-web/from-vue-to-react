---
title: "Course Syllabus · From Vue to React"
description: "The full curriculum, organized into four journey parts — from architectural philosophy and the reactivity inversion, through the Fiber engine, hooks, state, and composition, to the React 19 frontier (the Compiler, Actions, Suspense, and Server Components)."
---

# Course Syllabus: From Senior Vue Dev to Complete React Master

The transition from Vue's progressive, intuitively reactive environment to React's strictly functional, heavily unopinionated ecosystem is one of the hardest conceptual leaps a senior frontend engineer makes. Both are component-based and both use a Virtual DOM — but their philosophies dictate different engineering strategies and cognitive models.

Vue operates on **compiler-informed, fine-grained reactivity**: components track their own dependencies through reactive proxies and update only when necessary. React operates on a **snapshot-rendering model**: updates flow aggressively top-down, and *you* halt the unnecessary work — by hand, or, since React 19, with the compiler. Mastering React is not learning new syntax. It is inverting your model of reactivity, state mutation, closures, and component lifecycles.

The curriculum is organized into **four parts**. Work top-down: each part assumes the one before it, and the module numbers run in part order — Part I is modules 1–2, Part II is 3–4, Part III is 5–6, Part IV is 7–9.

| Part | What it rewires | Modules |
| :--- | :--- | :--- |
| **I · The Mental-Model Shift** | The philosophy and the core reactivity inversion — read this until it is reflexive. | 01 Architecture & Ecosystem · 02 Reactivity & Rendering |
| **II · The Execution Engine** | How React actually runs: the Fiber reconciler, and function components that re-run every render. | 03 Fiber vs. Vapor · 04 Hooks, Closures & Effects |
| **III · State & Composition** | Global state without mutation, and Vue's slots re-expressed as React composition. | 05 State Management · 06 Composition Patterns |
| **IV · Modern React (19+)** | The release that closes the ergonomic gap: the Compiler, Actions, Suspense, and Server Components. | 07 The React Compiler · 08 Actions & Forms · 09 Suspense & Server Components |

---

## Part I · The Mental-Model Shift
This is the floor. If the reactivity inversion is fuzzy, everything below it is guesswork. Fix it first.

### Module 1: Architecture & Ecosystem Dynamics
Understand *why* the two stacks feel so different before writing a line — the divergence starts at the ecosystem, not the syntax.

**Library vs. Framework**
Vue is a progressively opinionated framework with an official toolchain (Vue Router, Pinia) kept in version lockstep. React is an unopinionated rendering library; you select and own routing, state, and data-fetching yourself. The senior move is becoming a *frontend systems integrator*, not a framework consumer.

**Data Flow & State Mutation**
Vue's `v-model` gives pragmatic two-way binding over reactive proxies. React enforces strict one-way flow with immutable updates — more boilerplate, but superior traceability in massive repos.

> **Self-Test:**
> In Pinia you write `store.user.name = 'Jane'` and the UI updates. Why is the literal translation illegal in a React store, and what must replace it? *(React needs a new object reference to detect the change — you replace state, you don't mutate it.)*

### Module 2: Reactivity Models & Rendering Triggers
The single most important technical hurdle: React is fundamentally unaware of which data a component read.

**Opt-in vs. Opt-out**
Vue's proxy system records a component as a subscriber to exactly the properties it reads, then re-renders only those. React defaults to re-rendering a component *and its entire subtree* whenever state changes, then diffs the VDOM to see what actually moved.

**Manual optimization**
Because React lacks dependency tracking, halting the cascade was historically manual: `React.memo`, `useMemo`, `useCallback`, and reference equality. This is the cognitive load Part IV's compiler removes.

> **Self-Test:**
> A parent holds `count` in state; a heavy child renders unrelated data. In Vue the child never re-runs. In React it re-runs on every `count` change unless you do *what* — and why does that fix depend on reference stability?

---

## Part II · The Execution Engine
Stop treating rendering as magic. This part opens the reconciler and the function-component execution model — the two mechanisms behind React's hardest bugs.

### Module 3: The Engine Room — Fiber vs. Vapor
Two opposite bets on performance.

* **React Fiber:** a dual-tree structure of Fiber nodes on a singly-linked list, enabling *interruptible*, prioritizable rendering — time-slicing that keeps input responsive under heavy trees.
* **Vue Vapor Mode:** compiler-generated imperative DOM updates that bypass the VDOM entirely — large memory and patch-time wins, and a smaller baseline bundle.

> **Self-Test:**
> Why can React pause a render mid-tree and hand control back to the browser, when the old stack reconciler could not? *(The linked-list of fibers decouples traversal from the JS call stack.)*

### Module 4: Hooks, Closures & Execution Semantics
Composables and Hooks look alike and behave nothing alike.

* **Execution:** Vue's `setup()` runs **once**; React components re-execute **top to bottom every render**, re-allocating functions and capturing a frozen snapshot of state.
* **Stale closures:** the signature React bug — an async callback holding state from the render frame it was born in.
* **`watchEffect` vs `useEffect`:** auto-tracked dependencies (Vue) vs. a hand-maintained dependency array (React) — and why `watchEffect` stops tracking after an `await`.

> **Self-Test:**
> A `setInterval` set up in `useEffect(fn, [])` logs a `count` that never advances past its initial value. Name the mechanism and two correct fixes.

---

## Part III · State & Composition
Now rebuild the two things you leaned on Vue for: a global store, and content distribution.

### Module 5: Global State Management
From Pinia's mutation to React's immutability.

* **Pinia → Zustand:** the closest conceptual bridge — hook-like stores, no Provider wrapping — but Zustand mandates immutable setter updates (spread/merge), not direct mutation.
* **Escape hatch:** MobX offers proxy-based mutability for teams unwilling to give it up, though Zustand dominates greenfield React.

> **Self-Test:**
> Rewrite `state.todos.push(todo)` as a valid Zustand update, and explain why the `push` version renders nothing.

### Module 6: Advanced Composition & UI Patterns
Vue's slots are a compiler feature; React rebuilds them from plain JavaScript values.

| Vue concept | React equivalent |
| :--- | :--- |
| Default slot | `props.children` |
| Named slots | JSX passed as props (`header={<h1/>}`) |
| Scoped slots | Render props (a function prop returning JSX) |
| Deep composition | Compound components over Context |

> **Self-Test:**
> A Vue `<DataTable>` uses a scoped slot to let the parent render each cell with row data. Sketch the React render-prop signature that carries that row data back up.

---

## Part IV · Modern React (19+)
React 19 neutralizes the framework's historical friction — manual memoization and form boilerplate — and pushes toward a server-first architecture. This part is where the ergonomic gap with Vue narrows sharply.

### Module 7: The React Compiler
Automatic memoization, moved from your mind to the build step.

* **Mechanics:** static AST analysis injects granular memoization so plain functions and objects stay referentially stable across renders.
* **Silent failures:** the compiler optimizes *how* to render, not *whether*; on code it cannot analyze (mutated destructured props, dynamic keys, complex `try/catch`, impure calls) it silently bails to un-memoized behavior.

> **Self-Test:**
> Why is a *silent* compiler bailout more dangerous in production than a build error — and which one-line habit turns bailouts into lint failures?

### Module 8: Actions, Forms & Optimistic Updates
The end of controlled-input boilerplate.

* **Actions:** pass an async function straight to `<form action>`; React orchestrates submission, pending state, and event prevention.
* **New hooks:** `useActionState` (state + wrapped action + `isPending`), `useFormStatus` (self-aware nested submit buttons), `useOptimistic` (instant UI with automatic rollback on failure).

> **Self-Test:**
> With `useOptimistic`, what exactly does React do to the UI if the underlying server action rejects — and why does that delete your rollback code?

### Module 9: Suspense, Data Fetching & Server Components
Declarative async, and moving work off the client entirely.

* **`use()` + Suspense:** read a promise during render; the nearest `<Suspense>` boundary shows a fallback until it resolves — no `isLoading` booleans, and parallel boundaries kill fetch waterfalls.
* **RSC vs SSR:** Server Components execute only on the server and ship *zero JS* for static, data-heavy segments — a step beyond Nuxt/Nitro-style SSR hydration.

> **Self-Test:**
> `use()` may be called inside an `if` or a loop, breaking the Rules of Hooks that bind `useState`. What property of `use()` makes that safe?

---

When the four parts click together — the reactivity inversion, the Fiber engine and its closures, immutable state and compositional patterns, and the React 19 toolkit — read the [**Conclusion · Mastering the Architectural Divide**](/conclusion) for how they compose into an enterprise-scale React practice.
