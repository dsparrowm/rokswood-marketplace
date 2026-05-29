export type CheckoutDeliveryMethodId = "standard" | "express" | "enterprise";

export type CheckoutPaymentMethodId = "card" | "bank_transfer" | "corporate";

export type CheckoutCurrencyOption = {
  key: string;
  value: string;
};

export type CheckoutBankOption = {
  id: number;
  name: string;
  code: string;
  longcode: string;
  gateway: string | null;
  payWithBank: boolean;
  active: boolean;
  country: string;
  currency: string;
  slug: string;
  type: string;
  isDeleted: boolean;
};

export type CheckoutSupportData = {
  currencyOptions: CheckoutCurrencyOption[];
  banks: CheckoutBankOption[];
  deliveryCountryCodes: string[];
};

export type CheckoutFormValues = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  billingSameAsShipping: boolean;
  deliveryMethod: CheckoutDeliveryMethodId;
  orderNotes: string;
  paymentMethod: CheckoutPaymentMethodId;
  bankCode: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
};

export type CheckoutDeliveryMethod = {
  id: CheckoutDeliveryMethodId;
  title: string;
  price: number | null;
  priceLabel: string;
  description: string;
  availability: string;
  note: string;
};

export type CheckoutPaymentMethod = {
  id: CheckoutPaymentMethodId;
  title: string;
  description: string;
  badge: string;
};

export type CheckoutSecurityBadge = {
  title: string;
  description: string;
};

export type CheckoutTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  exchangeRate: number;
  euroTotal: number;
  shippingLabel: string;
  taxRateLabel: string;
};