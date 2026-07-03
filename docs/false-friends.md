---
title: "False Friends · Vue APIs That Look Like React's"
description: "computed is not useMemo, watch is not useEffect, ref is not useRef. The Vue→React look-alikes that share a name or a shape but diverge in execution — and the module that untangles each."
---

# False Friends: Vue APIs That Look Like React's (But Aren't)

<p class="module-hook">They share a name or a shape. They do not share a mechanism.</p>

In language learning, *false friends* (*faux amis*) are words that look identical across two languages but mean different things — French *librairie* is a bookshop, not a library. Vue→React is full of them. Every pair below has a React look-alike that borrows the name or the shape and then does something different underneath. Porting one-to-one is how a senior Vue developer writes React that compiles, passes review, and is quietly wrong. Here is the map — and the module that dismantles each in depth.

| Vue | The tempting port | What it actually is | The catch | Deep-dive |
| :--- | :--- | :--- | :--- | :--- |
| `computed` | `useMemo` | a memoization **hint** with a manual deps array | `computed` auto-tracks and *guarantees* the cache; `useMemo` is one React may **discard** and recompute | [M2](/module-2-reactivity-rendering) |
| `watch` | `useEffect` | **synchronization** with an external system, after commit | most "watchers" shouldn't be effects at all — *"You Might Not Need an Effect"* | [M5](/module-5-hooks-closures) |
| `ref()` | `useRef` | a **non-reactive** mutable box (`.current` never re-renders) | Vue `ref` ≈ React `useState`; `useRef` ≈ Vue's *template* ref | [M3](/module-3-identity-equality) · [M5](/module-5-hooks-closures) |
| Pinia | Redux | the legacy heavyweight — **Zustand** is the real bridge | Pinia mutates a proxy; Redux is immutable actions + reducers | [M6](/module-6-state-management) |
| `provide` / `inject` | Context | a value propagated by **reference identity** | Vue injection stays reactive; Context re-renders *every* consumer when `value` changes identity | [M7](/module-7-composition-patterns) |
| `v-model` | a controlled input | one-way `value` + `onChange` | React never had two-way binding; React 19 Actions reclaim the ergonomics, not the mechanism | [M9](/module-9-actions-forms) |
| `<slot>` | `children` | JSX passed as a plain value | only the *default* slot maps 1:1 — named → JSX props, scoped → render props | [M7](/module-7-composition-patterns) |

## The mechanism underneath

The table's fourth column is the whole point. Four of these diverge not in *API* but in *execution* — and those are the ones that ship bugs.

### `computed` is a guarantee; `useMemo` is a hint

Vue's `computed` is a cached node in the reactivity graph: it tracks exactly the reactive reads inside it and recomputes lazily on next access after an invalidation. The cache is a *guarantee*. React's `useMemo` looks identical — cache a value, declare its dependencies — but React reserves the right to **throw the cache away** and recompute (to free memory, for instance). The docs are blunt: it's a performance optimization, never a semantic one, so a side effect must never live in a memo body. And its deps are compared by `Object.is` reference identity, not tracked — pass a fresh object or array literal and the memo busts every render. `computed` asks *"what did I read?"*; `useMemo` asks *"did these references change?"*

### `watch` reacts to data; `useEffect` synchronizes with the world

Both fire "when something changes," which is exactly the trap. `watch` exists to *react to state*. `useEffect` exists to *synchronize the component with an external system* — the DOM, a subscription, a socket — **after** the render commits. Using it as a data-watcher (deriving state, chaining `setState`) is the most common React antipattern, serious enough that the React team wrote a page titled *"You Might Not Need an Effect."* Rule of thumb: if a value can be computed during render, compute it during render — don't watch it into existence.

### `ref` is reactive; `useRef` is deliberately inert

Same four letters, opposite intent. Vue's `ref()` is a reactive container: reading `.value` tracks a dependency, writing it triggers updates. React's `useRef` is the *opposite by design* — a mutable box whose `.current` you read and write freely and which **never** schedules a render. The honest analog of Vue's `ref` is React's `useState` (reactive state); `useRef` maps to Vue's *template ref* (a handle to a thing, not a source of reactivity). Mutate `.current` expecting a re-render and nothing happens — on purpose.

### `provide/inject` and Context both skip prop-drilling — differently

Both broadcast a value down the tree without threading props through every layer. But Vue's injection stays inside the reactivity system: inject a reactive value and consumers update granularly when it changes. React Context propagates by the **reference identity of the Provider's `value`** — when that reference changes, *every* consumer re-renders, whole subtrees included. That's why idiomatic React memoizes the context value and splits one context into several: the update granularity Vue hands you for free is something you engineer by hand.

> **Self-Test:**
> A teammate "ports" a Vue `computed` to `useMemo` and relies on it never recomputing, to avoid a duplicate API call written inside the memo body. Why is this a latent bug? *(`useMemo` is a hint React may discard and recompute at any time — side effects like API calls must never live in a memo. Move the call to an event handler or an effect keyed to the right dependency. `computed` guarantees its cache; `useMemo` does not.)*
