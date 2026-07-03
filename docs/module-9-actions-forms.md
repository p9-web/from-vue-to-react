---
title: "Module 9 · Actions, Forms & Optimistic Updates"
description: "React 19 Actions and form hooks end the controlled-input boilerplate: form actions, useActionState, useFormStatus, and useOptimistic for instant UI with automatic rollback — for senior Vue devs."
learn:
  module: 9
  level: advanced
  timeRequired: PT40M
  prerequisites:
    - "Module 5 · Hooks, Closures & Effects"
    - "Controlled inputs & form submission"
    - "Promises / async functions"
  outcomes:
    - "Replace manual controlled-form boilerplate with a React 19 Action"
    - "Wire useActionState and useFormStatus for pending UI without prop drilling"
    - "Apply useOptimistic for instant UI that reverts automatically when the action settles"
  concepts:
    - "Actions (async function to form action)"
    - "useActionState"
    - "useFormStatus"
    - "useOptimistic"
    - "isPending / pending state"
    - "automatic rollback"
    - "server-first architecture"
  misconceptions:
    - "You still need useState for every form field"
    - "Pending state requires a manual boolean"
    - "Optimistic updates need hand-written rollback logic"
  selfTests: 3
  primarySources:
    - "react.dev — <form>, useActionState, useFormStatus, useOptimistic"
    - "React 19 release notes"
  teachingApproach: "Show the pre-19 boilerplate, then delete it piece by piece with each new primitive."
---

# Module 9: Asynchronous UI, Forms & Optimistic Updates

<p class="module-hook">Why did all the form boilerplate suddenly disappear?</p>

> **The translation**
>
> **Vue intuition** → `v-model` gives two-way binding; you hand-wire pending, error, and rollback state.
>
> **Why it breaks** → React keeps one-way flow, and before v19 you wrote every piece of that async boilerplate yourself.
>
> **React intuition** → pass an async function to `<form action>`; `useActionState`, `useFormStatus`, and `useOptimistic` manage pending and optimistic UI.
>
> **Why it's built this way** → the framework owns the async transition, reclaiming `v-model`'s ergonomics without breaking one-way flow.

Before React 19, forms were tedious. Vue developers used to `v-model` and a simple submit handler found the React version exhausting: controlled inputs bound to `useState`, manual `preventDefault`, hand-written fetch logic, a separate boolean for loading, and `useEffect` cleanup to dodge race conditions.

React 19 rewrites this with **Actions** and built-in form hooks, shifting React toward a server-first architecture — and reclaiming much of the ergonomics `v-model` gave you (Module 1) without breaking one-way flow.

## 1. The Pre-19 Baseline

```jsx
function OldForm() {
  const [name, setName] = useState('')
  const [isPending, setPending] = useState(false)
  async function onSubmit(e) {
    e.preventDefault()            // manual
    setPending(true)              // manual loading state
    try { await save(name) } finally { setPending(false) }
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button disabled={isPending}>{isPending ? 'Saving…' : 'Save'}</button>
    </form>
  )
}
```

Every field is wiring; every state transition is manual. This is the boilerplate the next three hooks erase.

## 2. Actions — Async Straight to `<form action>`

Pass an async function to a `<form>`'s `action`. React orchestrates the submission lifecycle: it prevents the default, tracks pending state, and runs the function with the submitted `FormData`.

```jsx
function NewForm() {
  async function save(formData) {
    await api.save(formData.get('name'))   // React handles preventDefault + pending
  }
  return (
    <form action={save}>
      <input name="name" />
      <button>Save</button>
    </form>
  )
}
```

## 3. The Three Hooks

* **`useActionState`** binds an async action to state. It returns the current state, a wrapped action to hand to `<form action>`, and an **`isPending`** boolean — no manual loading state.

```jsx
const [error, submitAction, isPending] = useActionState(
  async (prev, formData) => {
    const res = await save(formData.get('name'))
    return res.ok ? null : 'Save failed'
  },
  null,
)
// <form action={submitAction}> … <button disabled={isPending}>Save</button>
```

* **`useFormStatus`** lets a deeply nested submit button read the nearest parent form's status — `pending`, `data`, `method` — without drilling an `isPending` prop through every layer. Self-aware UI.

```jsx
function SubmitButton() {
  const { pending } = useFormStatus()          // reads the enclosing <form>
  return <button disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
}
```

* **`useOptimistic`** patches the UI with the expected value the instant you submit, for elite perceived performance. It must run inside an Action; when that Action settles, the optimistic overlay is discarded and the UI **snaps back to the real state** — so a failed request needs no rollback code, because the optimistic value was only ever a temporary layer over the truth.

```jsx
const [optimisticTodos, addOptimistic] = useOptimistic(
  todos,
  (state, newTodo) => [...state, { ...newTodo, sending: true }],
)
// on submit: addOptimistic(todo); then await the real action.
// success → server state replaces it; failure → React discards the optimistic entry.
```

*Vue gave forms ergonomics through `v-model`; React 19 gives them through the framework owning the async lifecycle — same destination, opposite mechanism.*

> **Self-Test:**
> With `useOptimistic`, the server action rejects. What does React do to the UI, and why does that let you delete your manual rollback logic? *(React automatically discards the optimistic state and reverts to the last truthful state the base value holds; because the optimistic layer is derived and temporary, there is nothing for you to manually roll back.)*

> **Self-Test:**
> A submit button three components deep needs to show a spinner while the form submits. What's the React 19 way that avoids threading an `isPending` prop down, and where does the status come from? *(`useFormStatus()` inside the button reads the pending state of the nearest enclosing `<form>` via context, so no prop drilling is needed.)*

> **Self-Test:**
> Which single React 19 feature removes the need for a manual `[isPending, setPending]` pair around a submit, and how do you obtain that flag? *(`useActionState` returns an `isPending` boolean as its third value — bind its wrapped action to `<form action>` and read `isPending` directly.)*
