# Code Standards

## General

- Keep components small and single-purpose — one component per file, one concern per file
- Fix root causes, do not layer conditional hacks or workarounds
- Do not mix data-fetching logic and rendering logic in the same component
- Prefer explicit over implicit — name things clearly, avoid abbreviations in identifiers
- Delete dead code rather than commenting it out

## TypeScript

- Strict mode required throughout — `"strict": true` in `tsconfig.json`
- Avoid `any` — use explicit interfaces, discriminated unions, or `unknown` with type narrowing
- All component props must be explicitly typed with an interface or type alias
- Export shared types from `types/` — do not inline types that are used in more than one file
- Prefer `type` over `interface` unless declaration merging is needed

## Next.js (App Router)

- Default to Server Components — only add `"use client"` when the component needs:
  - Browser event handlers (`onClick`, `onChange`, etc.)
  - React state (`useState`, `useReducer`)
  - Browser APIs or Zustand store access
- Use `next/image` for all product and store images — never raw `<img>` tags
- Use `next/link` for all internal navigation — never raw `<a>` tags
- Use `loading.tsx` at route segments that depend on async data
- Use `error.tsx` at route segments that can fail
- Static pages (store pages, product pages) use `generateStaticParams` with mock data slugs

## Styling

- Use the CSS custom property tokens defined in `ui-context.md` — no hardcoded hex values
- Tailwind utility classes only — no inline `style={{}}` except for dynamic store accent
  colors from data: `style={{ '--store-accent': store.accentColor } as React.CSSProperties}`
- Follow the border radius scale defined in `ui-context.md` exactly
- No global CSS overrides to shadcn/ui components — customise via `className` prop only
- Responsive design: mobile-first. Key breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

## Components

- Presentational components receive all data via props — no store reads inside them
- Container components (page-level or section-level) read from Zustand or receive data from the page
- Never read from the cart store inside a product card — pass cart state as a prop if needed
- Use `cn()` (from `lib/utils.ts`) for conditional class merging — not string concatenation

## State Management (Zustand)

- One slice per domain: `useCartStore`, `useCurrencyStore`, `useUIStore`
- Store slices live in `store/` — one file per slice
- Actions are defined inside the store — components call actions, not raw setState
- Cart store is persisted to localStorage using `zustand/middleware` `persist`
- Do not put derived values in the store — compute them with selectors

## Forms (React Hook Form + Zod)

- All form schemas defined with Zod and colocated with the form component
- Use `register`, `handleSubmit`, and `formState.errors` from React Hook Form
- Never manage form field values with `useState` — always use React Hook Form
- Validate on submit and show inline field-level errors

## File Organisation

```
app/
  (marketing)/        ← Homepage
  (store)/            ← /stores and /stores/[slug]
  (product)/          ← /stores/[slug]/products/[productSlug]
  (commerce)/         ← /cart and /checkout
  globals.css         ← CSS custom property token definitions

components/
  ui/                 ← shadcn/ui primitives — do not modify
  layout/             ← Navbar, Footer, PageContainer, TrustBar
  store/              ← StoreCard, StoreGrid, StoreHero, FilterSidebar
  product/            ← ProductCard, ProductGrid, ProductGallery, ProductTabs,
                         TechnicalSummary, EngineeringResources
  cart/               ← CartStoreGroup, CartItem, CartSummary, QuantityStepper
  checkout/           ← ShippingForm, BillingForm, DeliveryMethod, OrderNotes,
                         OrderSummary, PaymentMethod, PayButton
  common/             ← CurrencyDisplay, StockBadge, CategoryLabel, AgentCTABanner

store/
  cart.store.ts
  currency.store.ts
  ui.store.ts

lib/
  utils.ts            ← cn(), formatCurrency(), slugify()
  constants.ts        ← Store list, delivery options, payment methods
  data/               ← Mock JSON data: stores.ts, products.ts

types/
  store.ts
  product.ts
  cart.ts
  checkout.ts
```

## Naming Conventions

- Components: PascalCase (`StoreCard`, `ProductGallery`)
- Hooks: camelCase prefixed with `use` (`useCart`, `useFilterState`)
- Store slices: camelCase with `Store` suffix (`useCartStore`)
- Utility functions: camelCase (`formatCurrency`, `slugify`)
- Files: PascalCase for components (`StoreCard.tsx`), kebab-case for everything else (`cart.store.ts`, `format-currency.ts`)
- CSS token variables: kebab-case with double dash (`--accent-primary`)
