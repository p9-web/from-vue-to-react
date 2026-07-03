---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
description: "Not a React tutorial — a translation layer for senior Vue engineers. Each module maps a Vue mental model (reactivity, identity, state, composition) to its React equivalent and shows exactly where the two diverge in execution."

hero:
  name: "From Vue to React"
  text: "React isn't hard because of JSX."
  tagline: "It's hard because it makes different architectural bets than Vue — top-down rendering, reference identity, immutable state. You already think in Vue; this is the translation layer that teaches you to think in React — every instinct mapped to its equivalent, then taken a layer deeper to where they diverge."
  actions:
    - theme: brand
      text: Start · Module 1
      link: /module-1-architecture-ecosystem
    - theme: alt
      text: Course Syllabus
      link: /course-syllabus

features:
  - title: Part I · The Mental-Model Shift
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>'
    details: Why does React feel lower-level, re-render everything, and obsess over object identity? Rewire the three instincts — ownership, reactivity, and equality — before you touch code.
    link: /module-1-architecture-ecosystem
    linkText: Rewire the model
  - title: Part II · The Execution Engine
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>'
    details: How can React pause a render mid-tree — and why does your callback keep seeing a stale value? Open the Fiber reconciler and the re-run-every-render model behind React's hardest bugs.
    link: /module-4-fiber-vapor
    linkText: Open the engine
  - title: Part III · State & Composition
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>'
    details: Why can't you just mutate the store, and where did your slots go? Rebuild global state without mutation and re-express every Vue slot as React composition.
    link: /module-6-state-management
    linkText: Rebuild the patterns
  - title: Part IV · Modern React (19+)
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>'
    details: What if memoization wrote itself and forms lost their boilerplate? The Compiler, Actions, use(), Suspense, and Server Components — the release where React's ergonomic gap with Vue closes.
    link: /module-8-react-compiler
    linkText: Reach the frontier
---

## Three questions, answered

You've asked these before. Here's the shape of the answers — the whole course, compressed to three lines:

| Your Vue instinct | The React reality |
| :--- | :--- |
| *"Why isn't this just a `computed`?"* | Everything recalculates on every render — you opt **out** of work, not in. → [Module 2](/module-2-reactivity-rendering) |
| *"Why doesn't React know what changed?"* | It compares **identities**, not dependencies. → [Module 3](/module-3-identity-equality) |
| *"Why did `useEffect` fire again?"* | Effects synchronize with the outside world; the dependency array says **when**. → [Module 5](/module-5-hooks-closures) |

> **One concept explains half of React: identity.** List keys, `React.memo`, dependency arrays, immutable updates, Context, reconciliation — they're all the same question wearing different costumes: *is this the same reference as last render?* Vue's dependency tracking hides that question; React puts it at the center. [Module 3](/module-3-identity-equality) makes it explicit.

## A four-part journey

Each part assumes the one before it. Work top-down:

> **I · Think differently** &nbsp;→&nbsp; **II · Understand the engine** &nbsp;→&nbsp; **III · Build applications** &nbsp;→&nbsp; **IV · Master modern React**

## Who this is for

A master-level course for **senior frontend engineers** — depth over breadth, execution over API surface. It assumes you already work fluently with:

- **Vue 3** and the Composition API
- **TypeScript** and typed component contracts
- Component architecture and one-way data flow
- A state library (Pinia / Vuex)
- The npm / bundler ecosystem

**What it deliberately skips:** JSX syntax, `npm` basics, CSS, Vite setup, TypeScript fundamentals. If you need those, learn them first and come back — this course spends its pages on the mental model, not the onboarding.

## You'll stop asking…

- *"Why doesn't React track my dependencies the way Vue does?"*
- *"Why do dependency arrays even exist?"*
- *"Why is `useEffect` so unintuitive?"*
- *"Why does everyone memoize everything?"*
- *"Why does React keep re-rendering when nothing changed?"*
- *"Why isn't Context just `provide` / `inject`?"*
- *"Why must state be immutable?"*

Every one has a precise, mechanical answer rooted in how React executes. This course gives you all of them.

## Built on React 19 — not React 18

The curriculum covers the modern stack — the **React Compiler**, **Actions**, **`use()`**, **Suspense**, and **Server Components** — not legacy class components or dated patterns.

## When you finish

You won't just write React that compiles — you'll know *why* it looks the way it does: why state must be immutable, why effects take dependency arrays, why everyone memoizes, why identity sits under nearly every rule. React stops being a set of conventions to memorize and becomes a model you can reason from.

**10 modules · ≈ 7 h 40 m of focused reading.** Begin at [Module 1 · Architecture & Ecosystem](/module-1-architecture-ecosystem), or scan the [full syllabus](/course-syllabus).
