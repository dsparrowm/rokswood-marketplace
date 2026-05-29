# Rokswood Marketplace

## Overview

Rokswood Marketplace is a B2B enterprise multistore eCommerce platform built for
industrial, energy, and infrastructure procurement. It hosts multiple specialized
stores under one roof — each with its own branding, product catalogue, and category
focus — while sharing a unified cart, checkout, and payment experience. Buyers are
typically enterprise procurement teams sourcing industrial equipment, energy systems,
agricultural tech, and fabrication components across multiple stores in a single order.

## Goals

1. Allow enterprise buyers to browse and procure from multiple specialized stores in
   a single checkout session
2. Provide each store with its own branded storefront, product catalogue, and category
   identity
3. Support both international (Stripe) and local Nigerian (Paystack) payment methods
4. Enable agent distribution partnerships across regions

## Stores

| Store            | Category       | Focus                                                      |
| ---------------- | -------------- | ---------------------------------------------------------- |
| Rokswood Pulse   | IoT Tech       | Smart technology, remote monitoring sensors, real-time IoT devices |
| Metals Extras    | Fabrication    | Luxury industrial metallic engineering, prefabricated components, Oil & Gas |
| Agrify           | Agrotech       | Processed agricultural products, farm technology, sustainability |
| Rokswood Energy  | IoT Tech       | Smart energy meters, utility monitoring, power infrastructure |

## Core User Flow

1. User lands on the Rokswood Marketplace homepage
2. Browses the "Discover Stores" section → clicks into a specialized store
3. Filters and browses products within a store → opens individual product page
4. Adds products to cart (multi-store cart is supported)
5. Reviews Procurement Cart — items grouped by store with per-store subtotals
6. Proceeds to Secure Checkout:
   - Fills in Shipping Information
   - Confirms Billing Details
   - Selects Delivery Method (Standard / Express / Enterprise Logistics)
   - Adds Order Notes (optional)
7. Selects Payment Method (Credit/Debit via Stripe, Bank Transfer via Paystack,
   or Corporate Account)
8. Completes payment → receives confirmation with order tracking

## Pages

### Homepage (`/`)
- Hero section with headline and "Explore Stores" CTA
- Trust bar (Secure Transactions, Enterprise Procurement, Industrial-Grade Products,
  Nationwide Delivery, Verified Suppliers)
- Discover Stores grid (6 store cards, 3-column, paginated)
- "Become a Rokswood Agent" dark CTA banner
- Footer

### Stores Directory (`/stores`)
- Full store listing grid (same store card layout as homepage)
- "Become a Rokswood Agent" dark CTA banner
- Footer

### Store Page (`/stores/[slug]`)
- Store hero with gradient banner, store logo, name, and description
- Category filter tags (horizontal pills)
- Left sidebar: Filters (Category checkboxes, Availability toggles, Industrial Segment dropdown)
- Product grid (3-column)
- Product cards: image, category label, name, description, price or "Request Quote", View Details
- Trust badges row (Certified Equipment, Utility-Grade, Nationwide Delivery, Technical Support)
- "Need Technical Assistance?" CTA section
- Footer

### Individual Product Page (`/stores/[slug]/products/[productSlug]`)
- Breadcrumb + SKU + stock status
- Left: product image gallery (main image + 4 thumbnails)
- Right: product name, description, price, Technical Summary table, quantity selector,
  "Add to Cart" + "Request Enterprise Quote" buttons, specification sheet download
- Tabbed section: Technical Specifications / Description & Features / Applications /
  Installation & Warranty
- Engineering Resources section (Installation Manual, Compliance Certificates, CAD Models)
- "Need Technical Procurement Assistance?" CTA
- Trust badges (Certified Equipment, Nationwide Freight, Secure Procurement, Engineering Support)
- Footer

### Procurement Cart (`/cart`)
- Line items grouped by store (store name, item count, store subtotal)
- Per-item: thumbnail, SKU, name, quantity stepper, unit price, total, Remove action
- Order Summary sidebar: subtotal, estimated shipping, estimated tax, estimated total
- "Proceed to Checkout" CTA
- Trust badges (Secure Procurement, Multi-Store Support, Enterprise Invoicing, Verified Gateway)
- Exchange Rate Trend widget (USD/EUR)
- Continue Shopping + Clear Cart actions
- Footer

### Secure Checkout (`/checkout`)
- Left column — 3-step form:
  1. Shipping Information (name, email, phone, country, state, city, address, postal code)
  2. Billing Details (same as shipping toggle)
  3. Delivery Method (Standard $45 / Express $120 / Enterprise Logistics Custom)
  - Order Notes textarea
- Right column — Order Summary sidebar:
  - Items grouped by store with store badge
  - Global Subtotal, Shipping, Tax, Grand Total + live currency conversion
  - Payment Method selector (Credit/Debit via Stripe, Bank Transfer via Paystack,
    Corporate Account)
  - Card input fields (number, expiry, CVV)
  - "Pay $X" CTA button
  - "Request Proforma Invoice" link
- Security badges (256-bit SSL, Enterprise Ready, Global Compliance)
- Footer

### Become an Agent (`/agents`)
- Hero section with partner-program status badge, centred headline, application CTA, and commission-tier CTA
- Dark trust strip (Verified Marketplace Partner System, Secure Registration Process,
  Global Agent Network, Enterprise Compliance Standards)
- "Why partner with Rokswood?" benefit cards for growth, distribution network, and digital tracking
- Transparent Commission Structure with Standard, Silver, Gold, and Enterprise Partner tiers
- Agent Registration form with Personal Information, Business Information, Agent Preferences,
  Account Setup, terms agreement, and submit CTA
- FAQ section covering commissions, approval timing, multi-store representation, and training
- Footer

### Agent Dashboard (`/agents/dashboard`)
- Agent portal header with Rokswood Marketplace Agent branding and profile menu
- KYC/action-required alert strip with KYC and agreement status badges plus verify identity action
- Dashboard overview with total sales, commission earned, wallet balance, and pending commission metrics
- Sales performance card with 30-day selector, summary figures, and weekly trend chart
- Wallet card with available balance, withdraw/history actions, pending funds, and linked bank
- Storefront summary card with active store status, assigned brands, visitor count, conversion rate, and referral link copy control
- Recent commissions table and recent activity timeline
- Compact legal footer for the agent portal

### Agent Login (`/agents/login`)
- Dedicated frontend-only portal login for approved Rokswood agents
- Mobile-responsive split layout with brand panel, credential form, demo account helper, and trust indicators
- Dummy email/password authentication redirects successful login attempts to `/agents/dashboard`
- Failed dummy authentication shows an inline form-level error

### Track Order (`/track-order`)
- Dedicated frontend-only order lookup page for enterprise buyers
- Simple responsive layout with order-number/email lookup, current shipment status, tracking timeline, store breakdown, and support actions
- Mock tracking data powers the page in v1 with no backend dependency

## Features

### Multi-Store Cart
- Single cart holds items from multiple stores simultaneously
- Cart groups items by store with per-store subtotals
- Global order total calculated across all stores

### Product Catalogue
- Product cards with category labels in store accent color
- Price display or "Request Quote" for enterprise/bulk items
- Product detail page with technical specs, image gallery, and downloadable resources

### Checkout
- Multi-step form with numbered section headers
- Dual payment gateway: Stripe (international cards) + Paystack (bank transfer/local)
- Corporate Account payment option with Net 30 terms
- Live currency conversion display
- Proforma invoice request option

### Agent Programme
- "Become a Rokswood Agent" CTA section on homepage and stores page
- Apply Now / Contact Sales actions
- Dedicated `/agents` application page with registration form and commission tiers
- Agent registration form submits public applications to the backend for sysadmin
  review and approval
- Dedicated `/agents/login` page for approved agents to access the portal mockup
- Static `/agents/dashboard` portal mockup for approved agents to preview storefront performance, wallet status, commissions, and activity

### Order Tracking
- Dedicated `/track-order` page for buyers to look up order status, shipment progress, and support details after checkout

## Success Criteria

1. A buyer can add products from two different stores and complete a single checkout
2. The order summary correctly groups items by store with accurate per-store and global totals
3. The checkout payment method UI renders all three options (Credit/Debit, Bank Transfer, Corporate Account) and the form validates correctly
4. Product pages render technical specifications, image gallery, and downloadable resources
