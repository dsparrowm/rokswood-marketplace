# UI Context

## Theme

Light mode only. The design language is a clean enterprise B2B marketplace — white and
light-gray backgrounds, crisp card surfaces, and a bold red primary accent for all key
CTAs. Dark sections (agent CTA banner, checkout order summary header) use a near-black
background to create contrast zones. Each store has its own accent color applied to card
top borders, category labels, and store name text.

## Colors

All components must use these CSS custom property tokens — no hardcoded hex values.

| Role                  | CSS Variable            | Value     |
| --------------------- | ----------------------- | --------- |
| Page background       | `--bg-base`             | `#F9FAFB` |
| Surface / Card        | `--bg-surface`          | `#FFFFFF` |
| Dark surface          | `--bg-dark`             | `#111827` |
| Primary text          | `--text-primary`        | `#111827` |
| Muted / secondary text| `--text-muted`          | `#6B7280` |
| Light label text      | `--text-light`          | `#9CA3AF` |
| Primary CTA (red)     | `--accent-primary`      | `#E53935` |
| Payment CTA (blue)    | `--accent-payment`      | `#2563EB` |
| Border default        | `--border-default`      | `#E5E7EB` |
| Border strong         | `--border-strong`       | `#D1D5DB` |
| Success / In Stock    | `--state-success`       | `#16A34A` |
| Success soft          | `--state-success-soft`  | `#DCFCE7` |
| Error                 | `--state-error`         | `#DC2626` |
| Warning               | `--state-warning`       | `#F59E0B` |
| Warning soft          | `--state-warning-soft`  | `#FEF3C7` |
| Warning text          | `--state-warning-text`  | `#92400E` |
| Info soft             | `--state-info-soft`     | `#E0F2FE` |
| Purple accent         | `--accent-purple`       | `#9333EA` |
| Purple soft           | `--accent-purple-soft`  | `#F3E8FF` |
| Tag background        | `--bg-tag`              | `#F3F4F6` |
| Dark text on dark bg  | `--text-on-dark`        | `#FFFFFF` |
| Muted text on dark bg | `--text-on-dark-muted`  | `#9CA3AF` |
| Agent chart fill      | `--agent-chart-fill`    | `#E0F2FE` |

### Store Accent Colors

Each store has a unique accent color used for: card top border, store name text,
and in-store category labels.

| Store           | CSS Variable             | Value     |
| --------------- | ------------------------ | --------- |
| Arackteck       | `--store-arackteck`      | `#3B82F6` |
| Rokswood Pulse  | `--store-pulse`          | `#E53935` |
| Metals Extras   | `--store-metals`         | `#111827` |
| Agrify          | `--store-agrify`         | `#F97316` |
| Rokswood Energy | `--store-energy`         | `#10B981` |
| RokswoodEfab    | `--store-efab`           | `#F97316` |
| Energy warm stop| `--store-energy-warm`    | `#FBBF24` |
| Energy lime stop| `--store-energy-lime`    | `#84CC16` |

### Store Hero Gradients

The Rokswood Energy store hero uses a left-to-right gradient through tokens:

```css
background: linear-gradient(to right, var(--accent-primary), var(--store-energy-warm), var(--store-energy-lime));
```

Other store heroes use a left-to-right dark-to-store-accent gradient with white text.

## Typography

| Role       | Font          | CSS Variable    | Tailwind class  |
| ---------- | ------------- | --------------- | --------------- |
| UI text    | Inter         | `--font-sans`   | `font-sans`     |
| Monospace  | JetBrains Mono| `--font-mono`   | `font-mono`     |

### Type Scale (key usages)
- Hero headline: `text-5xl font-bold` (homepage "Enterprise Marketplace...")
- Page title: `text-3xl font-bold` (e.g. "Procurement Cart", "Secure Checkout")
- Store name on card: `text-xl font-semibold`
- Product name on card: `text-base font-semibold`
- Product name on detail page: `text-3xl font-bold`
- Price: `text-2xl font-bold`
- Body / description: `text-sm text-[--text-muted]`
- Label / tag: `text-xs font-medium`
- Nav links: `text-sm font-medium`

## Border Radius

| Context             | Class          |
| ------------------- | -------------- |
| Buttons (standard)  | `rounded-md`   |
| Pills / tag badges  | `rounded-full` |
| Cards / panels      | `rounded-lg`   |
| Input fields        | `rounded-md`   |
| Modals / overlays   | `rounded-xl`   |
| Hero CTA button     | `rounded-full` |

## Component Library

shadcn/ui on top of Tailwind CSS. Components live in `components/ui/`. Use the CLI
to add new components rather than writing from scratch. Customise via CSS tokens only —
do not modify shadcn source files directly.

## Layout Patterns

- **Navbar**: Sticky top bar. Logo left (icon + "Rokswood" bold + "Marketplace" normal weight).
  Nav links centred (Home, Stores, Become an Agent, Track Order). Right side: cart icon with
  badge count, currency selector dropdown, "Log in / Profile" dark pill button.
  Bottom border `--border-default`. Max-width container centred.

- **Page container**: `max-w-7xl mx-auto px-6` for all page content.

- **Hero (homepage)**: Full-width. Centred text layout. Pill badge above headline
  ("Rokswood Marketplace"). Large bold headline. Subtitle. Single CTA button (`rounded-full`).
  Generous vertical padding. Background `--bg-base`.

- **Trust bar**: Full-width dark strip (`--bg-dark`). 5 items in a single row with icons.
  Separates hero from store grid.

- **Store card**: White surface card. Top border in store accent colour (4px, full width).
  Category badge (top-right, small pill). Store icon square. Store name in accent colour.
  Description. Tag pills. "Visit Store →" outlined button full-width at bottom.

- **Store grid**: 3-column responsive grid. Horizontal pagination arrows (top-right of section).

- **Store hero (store page)**: Full-width coloured banner. Store logo + name (large, white).
  Description. Category filter pills.

- **Product grid layout (store page)**: Left sidebar (filters, ~200px fixed width) + right
  product grid (3-column). Search bar full-width above product grid.
  On mobile, the filter sidebar is not stacked as a full sidebar; render search first,
  then expose filters through a compact collapsible mobile control.

- **Product card**: Image area. Category label in store accent colour (small, above title).
  Product name bold. Short description muted. Price or "Request Quote". "View Details →" link.
  On mobile, product cards use a shorter image area and clamp descriptions to preserve
  catalogue scanning speed.

- **Product detail layout**: 2-column split. Left: image gallery (large main image + 4 thumbnails
  below). Right: SKU, stock badge, product name, description, price, technical summary table,
  quantity stepper, action buttons, spec sheet download row.
  On mobile, the gallery stacks above the procurement panel, thumbnails remain in a compact
  4-column row, and action buttons span the available width.

- **Tabs (product page)**: Underline-style tabs. Active tab has bottom border in primary accent.
  On mobile, tabs render in a horizontal overflow row and secondary tab content is exposed
  through compact disclosure panels below the main specifications.

- **Cart layout**: Single column items (left) + Order Summary sidebar (right, sticky ~380px).
  Items grouped by store with store header row (dot, name, item count, subtotal).

- **Checkout layout**: 2-column. Left ~60%: multi-step form with numbered section headers.
  Right ~40%: sticky Order Summary card (dark header, white body) + Payment Method section.

- **Agent CTA banner**: Full-width dark rounded card (`--bg-dark`, `rounded-2xl`). White
  headline and body text. Two buttons: primary white-fill, secondary white-outline. Right side
  has a circular icon illustration.

- **Become an Agent page**: Centred light-blue hero using `--accent-payment` with white
  pill CTAs, dark trust strip, three-card benefits grid, four-card commission grid, centred
  registration card, and FAQ cards. On desktop, the hero fills the first viewport below
  the sticky navbar so the trust strip appears after the initial scroll. Registration
  fields use bordered `rounded-md` inputs on `--bg-base`, with `--accent-payment` for
  focus states and submit actions.

- **Agent Dashboard**: Dedicated portal shell, not the public buyer navbar. Header is a
  white 64px bar with square logo, "Rokswood Marketplace Agent" title, and profile
  menu. Below it, a soft warning action strip carries KYC status badges and verify
  identity CTA. Main content uses `max-w-7xl mx-auto px-6`, a 4-card metrics grid,
  then a two-column layout with a wider analytics column and narrower wallet/storefront
  column. Cards use `rounded-lg`, white surfaces, subtle borders, and compact typography.
  The wallet header uses `--bg-dark`; chart accents use `--accent-payment` and
  `--agent-chart-fill`. The dashboard footer is a compact white legal bar rather than
  the full marketplace footer.

- **Agent Login**: Dedicated portal entry page on `--bg-base` with a compact white
  login panel and a dark brand/operations panel on desktop. Desktop layout uses two
  columns inside `max-w-6xl mx-auto px-6`; mobile hides the dense operations panel and
  shows only the brand header, credential form, demo account helper, and compact trust
  row. Inputs use bordered `rounded-md` fields, the primary submit action uses
  `--bg-dark`, and secondary links use `--accent-payment`.

- **Track Order**: Compact buyer lookup page on `--bg-base` with a centered
  intro, a focused lookup form, and a single responsive result column that shows
  shipment status, timeline updates, store breakdown, and support actions. On mobile,
  the lookup form stays first, the status summary follows immediately, and the
  supporting details compress to one column with minimal visual noise.

- **Footer**: 3-column layout on white surface. Left: logo + tagline. Centre: Quick Links.
  Right: Contact (email, phone, social icons). Bottom bar: copyright left, Privacy Policy +
  Terms of Service right.

## Buttons

| Variant         | Style                                                               |
| --------------- | ------------------------------------------------------------------- |
| Primary (red)   | `bg-[--accent-primary] text-white rounded-md px-4 py-2`             |
| Primary (dark)  | `bg-[--bg-dark] text-white rounded-md px-4 py-2` (navbar login)    |
| Primary (blue)  | `bg-[--accent-payment] text-white rounded-full` (Pay CTA only)     |
| Outlined        | `border border-[--border-default] bg-white text-[--text-primary] rounded-md` |
| Ghost / text    | No border, no fill, underline on hover                              |
| Hero CTA        | `bg-[--bg-dark] text-white rounded-full px-8 py-3`                  |

## Icons

Lucide React. Stroke-based icons only.
- `h-4 w-4` for inline / tag use
- `h-5 w-5` for buttons and nav
- `h-6 w-6` for trust badges and feature icons
- Social icons (LinkedIn, Twitter): flat SVG or Lucide equivalents

## Form Fields

Inputs use a minimal underline style on the shipping/billing form, and a bordered box
style on payment card inputs. Labels are small muted text above the value.

```
Label (text-xs text-[--text-muted])
Value (text-sm text-[--text-primary])
─────────────────────────────────── (bottom border only: border-b border-[--border-default])
```

Bordered payment inputs:
```
border border-[--border-default] rounded-md px-3 py-2 text-sm
```

## Badges and Tags

- **Store category badge** (on card top-right): `bg-[--bg-tag] text-[--text-muted] text-xs rounded-full px-2 py-0.5`
- **Product category label** (above product name): store accent colour text, no background, `text-xs font-semibold uppercase`
- **Stock badge** (In Stock): `text-[--state-success] text-xs font-medium` with a green dot
- **Item count badge** (cart icon): `bg-[--accent-primary] text-white text-xs rounded-full` absolute positioned
- **Store name badge** (in cart/checkout order summary): small pill with store accent colour background
- **Delivery availability tag**: `text-xs text-[--state-success]` for "Available in region" / `text-xs text-[--text-muted]` for "Contact required"
