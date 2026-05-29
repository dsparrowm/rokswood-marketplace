# Progress Tracker

Update this file whenever the current phase, active faeture or implementation state changes

## Current Phase

Agent dashboard backend integration implemented

## Current Goal

- Keep the marketplace context aligned with the implementation pattern: React Query for server state, Zustand for client state, and small reusable components.
- Keep public marketplace forms wired to backend-aligned route handlers and mutation hooks.

## Completed

- Store detail API proxy now accepts the shared `NEXT_PUBLIC_API_URL` backend env as a fallback to `ROKSWOOD_HIVE_BACKEND_API_BASE_URL`, so deployed store pages can reach the same backend base URL convention used by the admin app.
- Store detail category hydration now supports the backend's `{ store, categories }` public categories response shape, preventing valid store detail pages from collapsing into a frontend 404.
- Marketplace image hydration now normalizes Rokswood blob URLs to HTTPS and allows `blobs.rokswood.com/nestapp-public/**` in Next image optimization so backend product images can render.
- Store logo rendering now uses `next/image` instead of a raw image element, sharing the same backend blob image policy as product images.
- Store product card images now use full-bleed cover sizing instead of padded contain sizing so uploaded catalogue photos fill the card media area.
- Product detail hydration now normalizes the backend's `{ store, product }` public product detail response shape before building the product page.
- Product detail gallery thumbnails are now interactive buttons that update the main product image.
- UI context read and applied to the base stylesheet
- Context updated to explicitly prefer React Query hooks for server state and cache management
- Landing page header component implemented and wired to the homepage
- Landing page hero component implemented and rendered below the header
- Landing page stats/trust bar implemented below the hero
- Landing page Discover Stores section implemented with six responsive mock store cards
- Landing page agent CTA banner implemented below the store grid
- Landing page footer implemented with logo, quick links, contact details, socials, and legal row
- Full landing page production build and lint verification completed
- Hero section height refined so the stats/trust bar reads as a separate section below the hero
- Store card markup extracted into a reusable `StoreCard` component
- Store icon rendering extracted into a reusable `StoreIcon` component
- Store card data shape added as a shared typed model
- Stores directory route added at `/stores` using the existing marketplace navigation, store grid, agent CTA, and footer
- Header active navigation now derives from the current pathname
- Shared store mock data moved into `src/lib/data/stores.ts`
- Stores directory cards now link to individual store slugs
- Dynamic `/stores/[slug]` route implemented with `generateStaticParams`
- Store hero, filter sidebar, product browser, product card, trust row, and technical CTA components implemented
- All six store pages render branded mock product catalogues with local placeholder product illustrations
- Header active navigation now covers nested store routes
- Individual store page lint and production build verification completed
- Store page mobile hero spacing reduced and category pills limited on small screens
- Store page mobile filters moved from stacked sidebar to compact collapsible filter control
- Store product cards tightened on mobile with shorter image areas and clamped descriptions
- Store trust badges simplified on mobile to icon and title
- Store technical CTA spacing and buttons optimized for mobile screens
- Product detail types added for gallery, procurement metadata, technical summary, specifications, features, resources, and trust badges
- Product detail data enrichment added in `src/lib/data/products.ts`
- Dynamic `/stores/[slug]/products/[productSlug]` route implemented with `generateStaticParams`
- Product gallery, purchase panel, technical tabs, engineering resources, procurement CTA, and product trust row components implemented
- Rokswood Energy catalogue now links its first product to the RX-9000 Smart Industrial Inverter detail page shown in the reference image
- Individual product page lint and production build verification completed
- Cart store seeded with mock items, persisted via Zustand, and exposed through `/cart`
- Cart page and navbar cart badge now reflect live cart state
- Cart implementation lint and production build verification completed
- React Hook Form and Zod added for the secure checkout form stack
- Secure checkout route implemented at `/checkout` with shipping, billing, delivery, notes, order summary, and payment sections
- Checkout page reuses cart data to render grouped store items and derived totals with live EUR conversion
- Checkout implementation lint and production build verification completed
- Checkout payment method section refined to match the provided payment-method reference image
- Become an Agent product scope added to `project-overview.md`
- Become an Agent component boundaries added to `architecture.md`
- Become an Agent page UI pattern added to `ui-context.md`
- `/agents` route and reusable agent page sections implemented
- Agent registration form implemented with React Hook Form and Zod validation
- Footer quick links now route Become an Agent to `/agents`
- Become an Agent implementation lint and TypeScript verification completed
- Become an Agent desktop hero now fills the first viewport below the sticky navbar
- Enterprise Partner commission tier now renders as a dark card matching the reference
- Agent Dashboard product scope added to `project-overview.md`
- Agent Dashboard component boundaries and mock data source added to `architecture.md`
- Agent Dashboard UI pattern and supporting dashboard state tokens added to `ui-context.md`
- `/agents/dashboard` route implemented with a dedicated agent portal shell
- Agent dashboard mock data added in `src/lib/data/agent-dashboard.ts`
- Agent dashboard header, status banner, metric cards, sales chart, wallet card, storefront card, commissions table, activity timeline, and compact footer implemented
- Agent Dashboard lint and TypeScript verification completed
- Agent Login product scope added to `project-overview.md`
- Agent Login component boundary and dummy credential data decision added to `architecture.md`
- Agent Login responsive UI pattern added to `ui-context.md`
- `/agents/login` route implemented with a dedicated portal shell and mobile-responsive login form
- Agent login dummy credentials validate through React Hook Form and Zod before routing to `/agents/dashboard`
- Navbar `Log in / Profile` links now route to `/agents/login`
- Agent Login lint and TypeScript verification completed
- Agent Login page copy simplified to short one-line messaging
- Agent Login password visibility control is interactive and submit button uses pointer cursor
- Store card "Visit Store" buttons now use a consistent top margin instead of being pinned with auto spacing
- Store cards and store heroes now use PNG logos from `public/assets/store-logos` where available, with icon fallback for stores without an asset
- Track Order route implemented at `/track-order` with a reusable lookup form, live status result card, shipment timeline, store breakdown, and support actions
- Track Order responsive layout implemented with a compact lookup-first mobile flow and a two-column desktop presentation
- Track Order mock shipment data added in `src/lib/data/order-tracking.ts`
- Track Order production build verification completed
- Stores directory now hydrates from the backend public stores API through an env-configured base URL
- Store cards now merge backend store metadata with the existing local branding defaults for fields the backend does not provide
- `/stores` now renders the backend-provided store count instead of assuming a static six-store catalogue
- Backend stores integration for `/stores` verified against the public `/public/stores` response shape
- `/stores` now uses a TanStack Query hook, a local API route, and a query provider for backend store state
- Public stores fetch now bypasses browser and route caching so deactivations reflect immediately on refresh
- Public store detail pages now use backend store, category, and product payloads only; seed-store fallbacks were removed from the public storefront data path
- Dynamic store and product segments now include loading and error boundaries
- Public product detail pages now resolve from backend product detail or backend listing data only
- Public store detail resolver now returns a backend 404 when the store record is missing instead of falling back to seed data
- Public store detail page now uses a client-side React Query hook and public API route so browser DevTools see the request and backend-created stores can hydrate dynamically
- Store detail client now reads the slug from the browser router to avoid undefined API requests
- Public storefront store categories now come from the backend category endpoint, and the public store page no longer falls back to the seeded category lists
- Public store detail query now falls back to the local seed store on API 404s so known public slugs still render when the backend detail route is unavailable
- Public store detail query now uses backend responses only; local seed-store fallbacks were removed from the client hook and shared store resolver
- Backend marketplace integration specs split into catalog, checkout support, order flow, and order tracking feature files
- Checkout support data now loads through a cached React Query hook backed by a local `/api/checkout/support` proxy that merges backend currency options, bank lookup results, and delivery-country allowlist data with graceful local fallbacks
- Checkout delivery availability UI now reflects the backend delivery-country allowlist, and bank transfer selection now uses backend bank lookup results in the existing checkout flow
- Marketplace environment now points to the deployed backend at `https://hive-backend-api.apps.rokswood.com` via local `.env.local`
- Browser verification passed on `/checkout` against the deployed backend, including live checkout-support data for currencies, banks, and delivery-country availability
 - Implemented public guest order flow helper that:
	 - enforces single-store orders, maps form country names to ISO-2 codes, and resolves frontend cart items to backend listing IDs by name/SKU
	 - posts guest orders to the backend `/public/stores/:slug/orders` endpoint and initializes payment at `/public/orders/:trackingToken/payment/initialize`
 - Added local API proxy `/api/checkout/order` that orchestrates the store-catalog lookup, guest order creation, and payment initialization
 - Wired the checkout page to the backend: replaced the local success toggle with backend `CheckoutResultBanner`, added error feedback, and disabled the Pay button while the order/payment mutation is in flight
- Agent registration request spec `18-agent-registration-request.md` implemented for the public marketplace form
- Added typed agent registration payload/response models and a React Query mutation hook for `/api/agent-requests`
- Added local API route `/api/agent-requests` that forwards public registration payloads to the backend `/public/agent-requests` endpoint
- Updated the `/agents` registration form to submit backend-aligned request fields, use ISO country codes, show pending/error/success states, and reset after a successful submission
- Moved React Query provider ownership to the root app layout and removed duplicate route-level providers from stores, store detail, checkout, and agents pages
- Agent login request spec `19-agent-login.md` implemented for approved agent access
- Added typed agent auth payload/response models and React Query mutations for login, forgot password, and reset password
- Added local API route proxies for `/api/agents/auth/login`, `/api/agents/auth/forgot-password`, and `/api/agents/auth/reset-password`
- Replaced dummy agent login credentials with backend-backed login submission and in-panel password reset flow
- Agent dashboard inspection spec `20-agent-dashboard-inspection.md` completed against the current marketplace dashboard UI and local `rokswood-hive-backend-api` checkout.
- Current dashboard backend-backed candidates are present at schema level only: agent profile/status/KYC/agreement, store assignments, referral links, marketplace order attribution, commissions, ledger accounts, ledger entries, and withdrawal requests.
- After pulling the latest backend `origin/staging`, the local backend now includes `AgentSalesModule`, `AgentAuthController`, and `AgentDashboardController` with the documented `/agents/*` dashboard endpoints.
- `/agents/dashboard` is now wired against the local agent dashboard endpoints for authenticated profile, status, wallet, assignments, referrals, commissions, ledger, withdrawals, and saved bank details.

## In Progress

- None

## Next Up

- Verify the deployed backend `/agents/auth/login`, `/agents/auth/forgot-password`, and `/agents/auth/reset-password` endpoints with live approved-agent credentials
- Add dedicated dashboard controls for referral-code editing, withdrawal submission, withdrawal history, and ledger history.

## Open Questions

- None

## Architecture Decisions

- Header is implemented as a standalone landing-page component and rendered from the homepage
- Hero is implemented as a standalone landing-page component and rendered below the header
- Stats section is implemented as a standalone landing-page component and rendered below the hero
- Discover Stores is implemented as a standalone landing-page component with local mock data for the homepage
- Agent CTA is implemented as a standalone landing-page component rendered below Discover Stores
- Footer is implemented as a standalone landing-page component rendered after the agent CTA
- Root metadata now identifies Rokswood Marketplace, and the app font setup uses Inter and JetBrains Mono per `ui-context.md`
- Hero uses a responsive minimum height to preserve the reference-image spacing before the stats/trust bar
- Store grids render typed `StoreCardData` through the reusable `StoreCard` component
- Header navigation active state is route-driven through `usePathname`
- Individual store pages are statically generated from shared typed mock store data
- Store detail sections are presentational components that receive typed store data via props
- Product images for the store page are local SVG placeholder assets under `public/assets/store-products/`
- Desktop store filters remain a sidebar; mobile filters render through a compact collapsible control below search
- Individual product pages are statically generated from enriched typed mock product data
- Product detail sections are reusable presentational components that receive typed product data via props
- Checkout sections are reusable presentational components that receive typed form and cart summary data via props
- Become an Agent page uses static presentational sections plus a colocated client registration form for frontend-only validation
- Agent Dashboard uses a dedicated portal shell rather than the public buyer navbar/footer because the reference image shows agent-specific chrome
- Agent Dashboard reads backend-backed agent data through React Query and a local proxy, while unsupported analytics remain neutral/static.
- Agent Login uses a dedicated portal shell rather than the public buyer navbar/footer to match approved-agent portal access
- Agent Login uses local route handlers under `/api/agents/auth/*` to proxy the backend agent auth endpoints without exposing the backend base URL to the browser
- Track Order uses static mock shipment data because v1 has no backend order lookup service
- Store directory data now comes from the backend public stores API, with seed-store fallback entries removed from the public storefront
- Agent registration uses a local public route handler plus React Query mutation instead of frontend-only validation state
- React Query is mounted globally from `src/app/layout.tsx`; route-level providers are reserved only for deliberate cache isolation

## Session Notes

- Use the light-only UI tokens from `ui-context.md` for all header styling
- `07-individual-product-page.md` guided the current product page implementation
- Verification passed with `npm run lint` and `npm run build`
- `npm run build` required approved network access to fetch configured Google fonts
- Local dev server verification was not completed because localhost binding escalation was rejected
- Mobile refinement verification passed with `npm run lint` and `npm run build`
- Product page verification passed with `npm run lint` and `npm run build`
- Checkout verification passed with `pnpm lint`, `pnpm build`, and live browser inspection at `/checkout`
- Payment method reference comparison completed; option rows, card fields, and payment actions were aligned with the provided design
- Become an Agent verification passed with `pnpm lint` and `pnpm exec tsc --noEmit`
- `pnpm build` could not complete because Next.js font fetching requires network access and the escalation request was rejected
- Local dev server could not start in sandbox due localhost bind restrictions and the escalation request was rejected
- Public storefront build verification passed with `pnpm run build` after removing seed-store fallback from store, category, and product paths
- `pnpm lint` completed with one pre-existing warning in `src/components/marketplace/store-icon.tsx` about a raw `<img>` tag
- `pnpm exec tsc --noEmit` passed after the track-order implementation
- `pnpm build` passed after the track-order implementation
- Become an Agent refinement verification passed with `pnpm lint` and `pnpm exec tsc --noEmit`
- Agent Dashboard verification passed with `pnpm lint` and `pnpm exec tsc --noEmit`
- `pnpm build` could not complete because Next.js font fetching requires network access and the escalation request was rejected
- Local dev server could not start in sandbox due localhost bind restrictions and the escalation request was rejected
- Agent Dashboard mobile commissions table was replaced with compact mobile cards after rereading `11-agent-dashboard.md`
- Post-correction verification passed with `pnpm lint` and `pnpm exec tsc --noEmit`; `pnpm build` still requires network access for Google font fetching and escalation was rejected
- Agent Login verification passed with `pnpm lint` and `pnpm exec tsc --noEmit`
- `pnpm build` could not complete because Next.js font fetching requires network access and the escalation request was rejected
- Local dev server could not start in sandbox due localhost bind restrictions and the escalation request was rejected
- Checkout support integration verification passed with `pnpm exec tsc --noEmit` and a targeted error check on the touched checkout files
- Local backend inspection found the agent request schema fields under `operations/agent-sales`; the checked-out backend tree did not include the public controller, so the frontend targets the specified `/public/agent-requests` contract
- Agent registration integration verification passed with `pnpm exec tsc --noEmit --incremental false` and `pnpm lint`; lint still reports two pre-existing unused warnings in `src/lib/data/products.ts`
- `pnpm build` initially failed because `/agents` used a React Query mutation without the route-level `QueryProvider`; wrapping `AgentPage` in `src/app/agents/page.tsx` fixed the prerender error, and `pnpm build` now passes
- Root QueryProvider refactor verification passed with `pnpm exec tsc --noEmit --incremental false`, `pnpm lint`, and `pnpm build`; lint still reports two pre-existing unused warnings in `src/lib/data/products.ts`
- Local backend inspection found the agent sales schema under `operations/agent-sales`, but the checked-out backend tree does not include an agent auth controller; the frontend targets the exact `/agents/auth/*` endpoint contract from `19-agent-login.md`.
- Agent login integration verification passed with `pnpm exec tsc --noEmit --incremental false`, `pnpm lint`, and `pnpm build`; lint still reports the two pre-existing unused warnings in `src/lib/data/products.ts`.
- Agent dashboard inspection found only agent-sales database entities in the local backend checkout. Implemented locally: `RHAgentRequest`, `RHAgent`, `RHAgentStoreAssignment`, `RHAgentReferralLink`, `RHMarketplaceOrderAttribution`, `RHAgentCommission`, `RHAgentLedgerAccount`, `RHAgentLedgerEntry`, and `RHAgentWithdrawalRequest` schemas plus relations/enums.
- Backend `origin/staging` was pulled into the local backend checkout, adding `src/operations/agent-sales/agent-sales.module.ts`, `AgentAuthController`, `AgentDashboardController`, agent services, DTOs, guards, and wet tests.
- The local backend now implements the documented dashboard endpoints: `GET /agents/referral-links`, `PATCH /agents/referral-links/{id}/code`, `GET /agents/assignments`, `GET /agents/balance`, `GET /agents/commissions`, `GET /agents/ledger`, `POST /agents/withdrawals`, `GET /agents/withdrawals`, and `GET /agents/withdrawals/bank-details`.
- Agent dashboard backend data wiring implemented with a local `/api/agents/dashboard/[...path]` proxy, typed dashboard API models, and a React Query hook that fetches authenticated profile, referral links, assignments, balances, commissions, ledger entries, withdrawals, and saved bank details.
- `/agents/dashboard` now reads the stored agent session token, requires sign-in when no token is available, and maps backend data into the existing presentational dashboard sections without moving fetch logic into leaf components.
- Dashboard analytics that the backend does not expose yet remain neutral/static: sales chart shape, storefront visitors, conversion rate, and report export.
- Agent dashboard backend wiring verification passed with `pnpm exec tsc --noEmit --incremental false` and `pnpm lint`; lint still reports the two pre-existing unused warnings in `src/lib/data/products.ts`.
- Local dev server verification was attempted with `pnpm dev`, but sandbox localhost binding failed with `listen EPERM 0.0.0.0:3000`; escalation to start the dev server was rejected.
