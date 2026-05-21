import type {
  CheckoutDeliveryMethod,
  CheckoutPaymentMethod,
  CheckoutSecurityBadge,
} from "@/types/checkout";

export const checkoutDeliveryMethods: CheckoutDeliveryMethod[] = [
  {
    id: "standard",
    title: "Standard Delivery",
    price: 45,
    priceLabel: "$45.00",
    description: "3-5 business days",
    availability: "Available in region",
    note: "Best for scheduled procurement orders.",
  },
  {
    id: "express",
    title: "Express Delivery",
    price: 120,
    priceLabel: "$120.00",
    description: "1-2 business days",
    availability: "Available in region",
    note: "Priority handling for urgent replenishment.",
  },
  {
    id: "enterprise",
    title: "Enterprise Logistics",
    price: null,
    priceLabel: "Custom",
    description: "Heavy freight / bulk",
    availability: "Contact required",
    note: "Freight is confirmed after sales review.",
  },
];

export const checkoutPaymentMethods: CheckoutPaymentMethod[] = [
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Processed via Stripe • Instant",
    badge: "VISA  MC  stripe",
  },
  {
    id: "bank_transfer",
    title: "Bank Transfer / Local",
    description: "Processed via Paystack • 1-2 Hours",
    badge: "paystack",
  },
  {
    id: "corporate",
    title: "Corporate Account",
    description: "Net 30 Terms • Requires Approval",
    badge: "enterprise",
  },
];

export const checkoutSecurityBadges: CheckoutSecurityBadge[] = [
  {
    title: "256-bit SSL",
    description: "Encrypted checkout",
  },
  {
    title: "Enterprise Ready",
    description: "Invoice-friendly flow",
  },
  {
    title: "Global Compliance",
    description: "Multi-region support",
  },
];