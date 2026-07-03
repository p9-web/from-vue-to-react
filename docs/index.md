---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
description: "From senior Vue developer to complete React master — a master-level course that inverts the Vue mental model: reactivity, rendering, the Fiber engine, hooks and closures, state, composition, and React 19."

hero:
  name: "From Vue to React"
  text: "A Senior Dev's Path to React Mastery"
  tagline: Not new syntax — a new mental model. Where Vue tracks dependencies for you, React re-renders top-down and asks you to prove what changed. This course maps every Vue instinct to its React equivalent, then shows exactly where they diverge.
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
    details: Library vs. framework and the ownership it forces on you; strict one-way data flow after v-model; and the core inversion — Vue's opt-in dependency tracking becomes React's opt-out top-down re-render. Rewire the instinct before touching code.
    link: /module-1-architecture-ecosystem
    linkText: Rewire the model
  - title: Part II · The Execution Engine
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20v2"/><path d="M12 2v2"/><path d="M17 20v2"/><path d="M17 2v2"/><path d="M2 12h2"/><path d="M2 17h2"/><path d="M2 7h2"/><path d="M20 12h2"/><path d="M20 17h2"/><path d="M20 7h2"/><path d="M7 20v2"/><path d="M7 2v2"/><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8" rx="1"/></svg>'
    details: Fiber's interruptible, time-sliced reconciler vs. Vue's Vapor Mode dropping the VDOM entirely — and why a React component is a function that re-runs top to bottom every render, spawning the stale-closure and dependency-array bugs Vue never had.
    link: /module-3-fiber-vapor
    linkText: Open the engine
  - title: Part III · State & Composition
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg>'
    details: Pinia's mutable proxies give way to Zustand's immutable updates and structural sharing; and Vue's slots, named slots, and scoped slots re-express as children, JSX-as-props, render props, and the compound-components pattern built on Context.
    link: /module-5-state-management
    linkText: Rebuild the patterns
  - title: Part IV · Modern React (19+)
    icon: '<svg class="feat-ico" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>'
    details: The React Compiler that automates memoization (and fails silently), Actions with useActionState / useFormStatus / useOptimistic, and the use() hook, Suspense, and Server Components — the release that closes much of the ergonomic gap with Vue.
    link: /module-7-react-compiler
    linkText: Reach the frontier
---
