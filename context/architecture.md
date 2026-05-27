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
- `lib/hooks/` — TanStack Query hooks for server state, mutations, and cache updates.
- `store/` — Zustand store slices (cart, currency, UI).
- `lib/` — Utility functions, mock data, constants, and env-backed backend helpers.
- `types/` — Shared TypeScript types and interfaces.

Current implementation files live under `src/`, so these boundaries map to
`src/app/`, `src/components/`, `src/lib/`, `src/store/`, and `src/types/`.

## Component Boundaries
- Store listing cards are reusable presentational components. Store grid sections
  own layout and pass typed store data into `StoreCard`.
- The `/stores` page fetches backend-backed directory data via an env-configured helper and passes typed card props into the shared grid; the homepage continues to render the local static store seed.
- Server-backed pages and feature sections should read data through React Query hooks in `lib/hooks/` rather than ad hoc `useEffect` fetch logic in the component tree.
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
- **Server state (TanStack Query)**: Backend-backed stores, products, checkout metadata, and related API data should be cached, invalidated, and refetched through React Query hooks.
- **Form state (React Hook Form)**: Checkout form fields — shipping, billing, delivery method, payment method. Not persisted.

## Data Source

- Product detail data is served from the local static mock data layer (`lib/data/`) for v1.
- The stores directory page hydrates from the backend public stores API through an env-configured base URL, while local store definitions provide fallback branding, icons, and routing metadata for fields the backend does not supply.
- All data shapes are typed — components consume typed props, not raw fetch responses.
- Store detail seed data currently live in `src/lib/data/stores.ts` and are shared by `/stores/[slug]`; the `/stores` directory page merges backend data with the same local defaults.
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
