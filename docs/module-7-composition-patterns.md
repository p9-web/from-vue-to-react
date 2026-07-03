---
title: "Module 7 · Advanced Composition & UI Patterns"
description: "Translating Vue slots to React: default slots as children, named slots as JSX props, scoped slots as render props, and deep composition via the compound-components pattern over Context."
learn:
  module: 7
  level: advanced
  timeRequired: PT45M
  prerequisites:
    - "Module 5 · Hooks, Closures & Effects"
    - "Vue slots (default, named, scoped)"
    - "JSX fundamentals"
  outcomes:
    - "Map default, named, and scoped slots to their React equivalents"
    - "Implement a render prop that lifts child state up for custom rendering"
    - "Build a compound component using React Context to avoid prop drilling"
  concepts:
    - "props.children"
    - "JSX as first-class values"
    - "named slots → JSX props"
    - "scoped slots → render props"
    - "inversion of control"
    - "wrapper hell / callback hell"
    - "compound components"
    - "React Context for implicit state"
  misconceptions:
    - "React has a native named-slot API"
    - "Render props and scoped slots are unrelated"
    - "Compound components need prop drilling"
  selfTests: 2
  primarySources:
    - "react.dev — Passing JSX as children / Passing data with context"
    - "vuejs.org — Slots"
    - "Radix UI (compound components)"
  teachingApproach: "Show the Vue slot, then the React shape it becomes, escalating from children to Context."
---

# Module 7: Advanced Component Composition & UI Patterns

<p class="module-hook">Where did my slots go?</p>

> **The translation**
>
> **Vue intuition** → distribute content with `<slot>`, named slots, and scoped slots.
>
> **Why it breaks** → React has no slot syntax at all.
>
> **React intuition** → JSX is a value: default slot → `props.children`, named → JSX props, scoped → render props, deep → compound components over Context.
>
> **Why it's built this way** → treating markup as a first-class value removes any need for a separate slot mechanism.

Composition is the foundation of scalable, reusable UI. Vue gives you a semantic, native content-distribution API — **slots**, derived from Web Components. React has no slot syntax; instead it treats *everything*, including JSX elements, as first-class JavaScript values you pass around. Master that reframing and every Vue slot has a clean React analog.

## 1. Default Slots → `props.children`

Vue's default `<slot>` is a placeholder for content passed between a component's tags. React mirrors it exactly with the implicit **`children`** prop: anything nested inside a component is injected as `props.children`, renderable anywhere.

```vue
<!-- Vue -->
<template><div class="card"><slot /></div></template>
```
```jsx
// React
function Card({ children }) {
  return <div className="card">{children}</div>
}
// <Card><p>Body</p></Card>
```

## 2. Named Slots → JSX as Props

Vue's `<template v-slot:header>` targets a named region. React has **no native named-slot API** — but because JSX elements are just objects, you pass them as ordinary props.

```vue
<!-- Vue -->
<Card>
  <template #header><h1>Title</h1></template>
  <template #default><p>Body</p></template>
</Card>
```
```jsx
// React: named slots are just props that hold JSX.
function Card({ header, children }) {
  return (
    <div className="card">
      <div className="card-header">{header}</div>
      <div className="card-body">{children}</div>
    </div>
  )
}
// <Card header={<h1>Title</h1>}><p>Body</p></Card>
```

Because those props are plain values, you can conditionally render, map, or transform them before they hit the DOM — flexibility Vue's template slots don't hand you as directly.

*Vue distributes content with template syntax; React distributes it as data. Once JSX is "just a value," named slots stop needing special support.*

## 3. Scoped Slots → Render Props

Vue's **scoped slots** invert control: a child exposes its internal reactive data back to the parent for custom rendering (think reusable tables, autocompletes — child owns logic, parent owns markup). React's equivalent is the **render prop**: a prop whose value is a function returning JSX. The child calls it with its internal state; the parent's function returns the customized output.

```vue
<!-- Vue scoped slot: child passes `row` back up -->
<DataTable :rows="rows">
  <template #cell="{ row }">{{ row.name.toUpperCase() }}</template>
</DataTable>
```
```jsx
// React render prop: same inversion of control.
function DataTable({ rows, renderCell }) {
  return rows.map((row) => <td key={row.id}>{renderCell(row)}</td>)
}
// <DataTable rows={rows} renderCell={(row) => row.name.toUpperCase()} />
```

The hazard: nesting several render props produces deep, unreadable JSX — *"wrapper hell."*

> **Self-Test:**
> A Vue `<DataTable>` uses a scoped slot to let the parent render each cell with `row` data. Write the React render-prop signature that carries `row` back to the parent, and name the shared concept. *(`renderCell={(row) => <JSX/>}` — a function prop the child invokes with its own state; the shared concept is inversion of control, the child owning logic while the parent owns presentation.)*

## 4. Deep Composition → Compound Components

To get the clean, declarative feel of Vue's deep slots *without* render-prop nesting, advanced React uses the **compound-components** pattern (as in Radix UI's Tabs, Select, Accordion). Multiple components cooperate implicitly, sharing state through **React Context** instead of prop drilling.

```jsx
const SelectCtx = createContext(null)

function Select({ value, onChange, children }) {
  return <SelectCtx.Provider value={{ value, onChange }}>{children}</SelectCtx.Provider>
}
function Option({ value, children }) {
  const { value: selected, onChange } = useContext(SelectCtx)
  return (
    <li aria-selected={selected === value} onClick={() => onChange(value)}>
      {children}
    </li>
  )
}
Select.Option = Option
// <Select value={v} onChange={setV}><Select.Option value="1">One</Select.Option></Select>
```

The parent broadcasts internal state (selected value, open/closed) via Context; nested children consume it and adjust automatically. No prop drilling, and the call site reads as declaratively as Vue's slots — the difference is Context injection rather than the template compiler.

| Vue concept | React equivalent | Implementation |
| :--- | :--- | :--- |
| Default slot (`<slot>`) | `props.children` | Nested JSX passed automatically |
| Named slots (`v-slot:name`) | JSX as props | Props that accept JSX (`header={<Node/>}`) |
| Scoped slots | Render props | Function prop receiving child state, returning JSX |
| Deep composition | Compound components | Cooperating components sharing state via Context |

> **Self-Test:**
> Why do compound components avoid prop drilling that a naïve `<Select options={[...]}/>` would require, and what React primitive makes that possible? *(The parent shares state through Context, which any descendant reads directly via `useContext` regardless of depth — so intermediate components never have to forward props down the tree.)*
