# Architecture Context

## Stack

| Layer         | Technology                        | Role                                                      |
| ------------- | --------------------------------- | --------------------------------------------------------- |
| Framework     | Next.js 15 (App Router) + TypeScript | Page routing, SSG/SSR for public pages, layout system  |
| UI            | Tailwind CSS + shadcn/ui          | Styling system and accessible component primitives        |
| State         | Zustand                           | Global client state — cart, currency selection, UI state  |
| Data Fetching | TanStack Query (React Query)      | Server state, caching, loading/error handling for API calls |
| Forms         | React Hook Form + Zod             | Checkout and filter form management and validation        |

## System Boundaries

- `app/(marketing)/` — Homepage. No data dependencies. Fully static.
- `app/(store)/` — Stores directory (`/stores`) and individual store pages (`/stores/[slug]`). Static with mock/API data.
- `app/(product)/` — Individual product pages (`/stores/[slug]/products/[productSlug]`). Static with mock/API data.
- `app/(commerce)/` — Cart (`/cart`) and Checkout (`/checkout`). Driven by Zustand cart store.
- `components/` — All UI components. No data fetching inside components — data is passed as props or read from Zustand.
- `store/` — Zustand store slices (cart, currency, UI).
- `lib/` — Utility functions, mock data, constants. No server-side logic.
- `types/` — Shared TypeScript types and interfaces.

Current implementation files live under `src/`, so these boundaries map to
`src/app/`, `src/components/`, `src/lib/`, `src/store/`, and `src/types/`.

## Component Boundaries

- Store listing cards are reusable presentational components. Store grid sections
  own layout and pass typed store data into `StoreCard`.
- Individual store pages compose reusable presentational sections from typed store
  detail data: `StoreHero`, `StoreFilterSidebar`, `StoreProductCard`,
  `StoreTrustRow`, and `StoreTechnicalCta`.

## State Model

- **Cart state (Zustand)**: Items keyed by product ID — `{ productId, storeId, storeName, name, price, quantity, image }`. Persisted to localStorage. Grouped by store for display.
- **Currency state (Zustand)**: Selected display currency (USD default). Exchange rate fetched from a public rates API.
- **UI state (Zustand)**: Mobile menu open, filter sidebar open, active product tab.
- **Form state (React Hook Form)**: Checkout form fields — shipping, billing, delivery method, payment method. Not persisted.

## Data Source

- Product and store data is served from a **static JSON mock data layer** (`lib/data/`) for v1.
- In future iterations, this is replaced by API calls to a backend service without changing component interfaces.
- All data shapes are typed — components consume typed props, not raw fetch responses.
- Store directory and individual store page mock data currently live in
  `src/lib/data/stores.ts` and are shared by `/stores` and `/stores/[slug]`.

## Invariants

1. Cart item grouping by store is computed from the flat cart state — never stored pre-grouped.
2. All prices are stored and calculated as numbers in USD — currency conversion is display-only.
3. Components do not fetch data directly — data flows in via props or is read from Zustand.
4. No `any` types. All component props and store slices are explicitly typed.
5. The checkout form does not submit to a real endpoint in v1 — it validates and shows a success state.
