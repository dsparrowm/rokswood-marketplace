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
- `app/agents/` — Become an Agent application page. Frontend-only static marketing and
  registration flow.
- `app/agents/login/` — Agent portal login page. Frontend-only static shell with a
  client form that validates dummy credentials and routes to the dashboard mockup.
- `app/agents/dashboard/` — Agent portal dashboard. Frontend-only static mock view
  for storefront performance, wallet status, commissions, and activity.
- `app/track-order/` — Order tracking page. Frontend-only static lookup view for
  shipment status, timeline updates, and support details.
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
- Individual product pages compose reusable presentational sections from typed
  product detail data: `ProductGallery`, `ProductPurchasePanel`, `ProductTabs`,
  `EngineeringResources`, `ProductProcurementCta`, and `ProductTrustRow`.
- Cart pages compose reusable presentational sections from typed cart data:
  `CartStoreGroup`, `CartLineItem`, `QuantityStepper`, `CartSummaryCard`,
  `CartTrustRow`, and `ExchangeRateWidget`.
- Cart state is managed by a persisted Zustand slice seeded with mock items and rendered through reusable cart sections on `/cart`.
- Checkout pages compose reusable presentational sections from typed checkout form data:
  `CheckoutSection`, `CheckoutTextField`, `CheckoutTextareaField`,
  `CheckoutDeliveryMethods`, `CheckoutOrderSummary`, and `CheckoutPaymentMethod`.
- Checkout totals are derived from the flat cart state and selected delivery method via `lib/checkout.ts`.
- Become an Agent pages compose reusable sections: `AgentHero`, `AgentTrustStrip`,
  `AgentBenefits`, `AgentCommissionTiers`, `AgentRegistrationForm`, and `AgentFaq`.
  The registration form owns its frontend-only React Hook Form/Zod validation.
- Agent dashboard pages compose reusable presentational sections from typed dashboard
  data: `AgentDashboardHeader`, `AgentStatusBanner`, `AgentMetricCard`,
  `AgentSalesPerformance`, `AgentWalletCard`, `AgentStorefrontCard`,
  `AgentCommissionsTable`, `AgentActivityCard`, and `AgentDashboardFooter`.
- Agent login pages compose a reusable `AgentLoginPage` shell with the client
  `AgentLoginForm` for React Hook Form/Zod validation and dummy credential routing.
- Track order pages compose reusable presentational sections from typed tracking
  data: `TrackOrderLookupForm`, `TrackOrderResult`, and `TrackOrderTimeline`.

## State Model

- **Cart state (Zustand)**: Items keyed by product ID — `{ id, productId, productSlug, storeSlug, sku, name, description, price, quantity, image, imageAlt, category }`. Persisted to localStorage with seeded mock items on first load and grouped by store for display.
- **Currency state (Zustand)**: Selected display currency (USD default). Exchange rate fetched from a public rates API.
- **UI state (Zustand)**: Mobile menu open, filter sidebar open, active product tab.
- **Form state (React Hook Form)**: Checkout form fields — shipping, billing, delivery method, payment method. Not persisted.

## Data Source

- Product and store data is served from a **static JSON mock data layer** (`lib/data/`) for v1.
- In future iterations, this is replaced by API calls to a backend service without changing component interfaces.
- All data shapes are typed — components consume typed props, not raw fetch responses.
- Store directory and individual store page mock data currently live in
  `src/lib/data/stores.ts` and are shared by `/stores` and `/stores/[slug]`.
- Individual product detail data is resolved from `src/lib/data/products.ts`,
  which enriches store catalogue products with gallery, technical summary,
  specifications, resources, and procurement-page metadata.
- Agent dashboard mock data lives in `src/lib/data/agent-dashboard.ts` and feeds
  the static `/agents/dashboard` portal route.
- Agent login dummy credentials are colocated with `AgentLoginForm` because they are
  v1-only frontend authentication data for the static portal mockup.
- Track order mock shipment data lives in `src/lib/data/order-tracking.ts` and is
  used by the static `/track-order` lookup page.

## Invariants

1. Cart item grouping by store is computed from the flat cart state — never stored pre-grouped.
2. All prices are stored and calculated as numbers in USD — currency conversion is display-only.
3. Components do not fetch data directly — data flows in via props or is read from Zustand.
4. No `any` types. All component props and store slices are explicitly typed.
5. The checkout form does not submit to a real endpoint in v1 — it validates and shows a success state.
