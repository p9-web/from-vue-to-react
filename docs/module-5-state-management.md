---
title: "Module 5 · Global State Management"
description: "From Pinia's mutable reactive stores to React's immutable model — Zustand as the conceptual bridge, structural sharing, and where Redux and MobX fit for transitioning Vue devs."
learn:
  module: 5
  level: advanced
  timeRequired: PT40M
  prerequisites:
    - "Module 2 · Reactivity & Rendering"
    - "Pinia stores"
    - "Immutability & structural sharing basics"
  outcomes:
    - "Translate a Pinia store into an equivalent Zustand store"
    - "Explain why React state updates must be immutable to trigger a render"
    - "Choose between Zustand, Redux, and MobX for a given team constraint"
  concepts:
    - "Pinia (Composition-API stores)"
    - "mutable reactive proxies"
    - "Zustand"
    - "immutable updates / structural sharing"
    - "setter functions (set/merge)"
    - "selectors & subscriptions"
    - "Redux (legacy heavyweight)"
    - "MobX (proxy-based reactivity)"
  misconceptions:
    - "Zustand lets you mutate state like Pinia"
    - "You must wrap the app in a Provider to use a store"
    - "Mutating an array then setting it re-renders"
  selfTests: 2
  primarySources:
    - "Pinia docs"
    - "Zustand docs"
    - "Redux Toolkit / MobX docs"
  teachingApproach: "Port one store line-by-line from Pinia to Zustand and let the immutability requirement drive the differences."
---

# Module 5: Global State Management Transition

For state shared across component branches, Vue developers reach for **Pinia**, which uses the same Composition-API syntax as components to create globally reactive stores. Pinia leans on **mutation**: you reassign properties directly (`store.user.name = 'Jane'`) and the proxy system broadcasts the change to every subscriber instantly.

Moving to React means moving to **immutability**. Redux still exists as the legacy heavyweight that shaped React's early architecture, but modern React favors **Zustand** — the closest conceptual bridge for a Vue dev, because like Pinia it creates stores without wrapping the whole tree in Context Providers.

## 1. Pinia — Mutation by Design

```js
// Pinia: mutate freely; the proxy notifies subscribers.
export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  function add(item) { items.value.push(item) }   // ✅ direct mutation works
  const count = computed(() => items.value.length)
  return { items, add, count }
})
```

The mental model: state is a live, observed object. Touch it and the UI follows.

## 2. Zustand — The Immutable Bridge

Zustand *feels* like Pinia — a hook returns state and actions, no Provider required — but it **mandates immutable updates**. You never mutate; you produce a new state via `set`, spreading or merging the previous value. React's change detection is reference-based (Module 2), so replacing the reference is what schedules a render.

```js
// Zustand: return NEW references from set(); never mutate in place.
import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  add: (item) =>
    set((state) => ({ items: [...state.items, item] })), // ✅ new array
  // set((state) => { state.items.push(item); return state }) ❌ same ref → no render
}))
```

```jsx
// Consume with a selector — components subscribe to the slice they read.
function CartCount() {
  const count = useCartStore((s) => s.items.length)
  return <span>{count}</span>
}
```

Note the selector: Zustand gives back a sliver of Vue's granularity — a component re-renders only when its *selected* value changes, not on every store update. That is the manual equivalent of Vue tracking which property you read.

*Pinia says "change the object." Zustand says "return a new object." Same intent, inverted mechanic — and the inversion is React's reference-equality rule again.*

> **Self-Test:**
> `set((state) => { state.todos.push(t); return state })` renders nothing. Rewrite it correctly and state the rule in one clause. *(`set((state) => ({ todos: [...state.todos, t] }))` — React re-renders only when the reference changes, so you must return a new array rather than mutate and return the same one.)*

## 3. Escaping Immutability — Redux and MobX

* **Redux (Toolkit):** still common in large legacy codebases. Redux Toolkit's `createSlice` uses Immer so you *write* mutating syntax that is applied immutably under the hood — a useful stepping stone from Pinia, at the cost of more ceremony (actions, reducers, the store Provider).
* **MobX:** proxy-based reactivity much like Vue's — you *can* mutate observables and it tracks dependencies. It preserves the Pinia feel most faithfully, but is less common in greenfield React than Zustand.

| Concern | Pinia (Vue) | Zustand | Redux Toolkit | MobX |
| :--- | :--- | :--- | :--- | :--- |
| **Update style** | Mutate proxy | Immutable `set` | Immer (mutate-like) | Mutate observable |
| **Provider needed** | No | No | Yes | No |
| **Granular reads** | Automatic | Selectors | Selectors | Automatic |
| **Best for** | — | Greenfield React | Large/legacy | Teams wanting Vue-like mutability |

> **Self-Test:**
> A team refuses to give up direct mutation when porting a Pinia app. Which React option most faithfully preserves their model, and what do they trade away by choosing it over Zustand? *(MobX — proxy-based, mutate-and-track like Pinia; the trade is going against the grain of mainstream React, so smaller community/ecosystem momentum and less alignment with Zustand-centric patterns and tooling.)*
