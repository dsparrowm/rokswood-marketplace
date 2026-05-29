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

export type CheckoutGuestOrderItemRequest = {
  listingId: string;
  quantity: number;
};

export type CheckoutGuestOrderRequest = {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  countryCode: string;
  deliveryAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    country: string;
  };
  items: CheckoutGuestOrderItemRequest[];
};

export type CheckoutGuestOrderResponse = {
  orderId: string;
  orderNumber: string;
  trackingToken: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  currency: string;
  paymentProvider: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: Array<{
    listingId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }>;
};

export type CheckoutPaymentInitializationResponse = {
  attemptId: string;
  provider: string;
  currency: string;
  amount: number;
  providerReference: string;
  checkoutUrl?: string;
};

export type CheckoutSubmissionResponse = {
  order: CheckoutGuestOrderResponse;
  payment: CheckoutPaymentInitializationResponse;
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