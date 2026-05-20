<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Application Building Context

## Approach

Build Rokswood Marketplace as a frontend-only application incrementally, using a
spec-driven workflow. The context files define what to build, how to build it, and
the current state of progress. Always implement against these specs — do not infer
or invent behaviour not defined here. When the design and the spec conflict, flag it
as an open question before implementing.

## Scoping Rules

- Work on one feature unit at a time — one page, one component group, or one store slice
- Prefer small, verifiable increments over large changesa
- Do not combine unrelated pages or component groups in a single implementation step
- A feature unit is complete when it renders correctly with mock data end-to-end

## Feature Units (implementation order)

1. Project setup — Next.js 15, TypeScript, Tailwind, shadcn/ui, Zustand, global CSS tokens
2. Layout shell — Navbar, Footer, PageContainer, TrustBar
3. Homepage — Hero, Trust bar, Store grid (mock data), Agent CTA banner
4. Stores directory page — `/stores` with store cards grid
5. Store page — `/stores/[slug]` with hero, filter sidebar, product grid
6. Individual product page — `/stores/[slug]/products/[productSlug]`
7. Cart store (Zustand) — cart state, add/remove/update actions, localStorage persistence
8. Cart page — `/cart` with multi-store grouping, quantity stepper, order summary
9. Checkout page — `/checkout` multi-step form, delivery method selector, order summary sidebar, payment method UI

## When to Split Work

Split an implementation step if it combines:

- Building a new page and building a new Zustand store slice
- Multiple unrelated component groups
- UI layout work and form validation logic
- Behaviour not clearly defined in the context files

If a change cannot be verified end-to-end with mock data quickly, the scope is too broad.

## Handling Missing Requirements

- Do not invent product behaviour not defined in the context files
- If a requirement is ambiguous, add it as an open question in `progress-tracker.md`
  and resolve it before implementing
- If the design shows something not in `project-overview.md`, add it to the overview first

## Protected Files

Do not modify the following unless explicitly instructed:

- `components/ui/*` — generated shadcn/ui primitives
- Any third-party library internals

## Keeping Docs in Sync

Update the relevant context file whenever implementation produces a decision:

- New component boundaries or folder structure → `architecture.md`
- New colour tokens, component patterns, or layout rules → `ui-context.md`
- New coding conventions or naming decisions → `code-standards.md`
- Feature progress or decisions → `progress-tracker.md`

## Before Moving to the Next Unit

1. The current unit renders correctly end-to-end with mock data
2. No invariant defined in `architecture.md` was violated
3. `progress-tracker.md` reflects the completed work
4. `npm run build` passes with zero TypeScript errors
5. No hardcoded hex values or inline styles (except dynamic store accent colors)
6. No TODO comments left in production code paths
