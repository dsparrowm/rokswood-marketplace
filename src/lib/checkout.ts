import { calculateCartSubtotal } from "@/lib/cart";
import { checkoutDeliveryMethods } from "@/lib/data/checkout";
import type { CartItem } from "@/types/cart";
import type { CheckoutDeliveryMethodId, CheckoutTotals } from "@/types/checkout";

const CHECKOUT_TAX_RATE = 0.085;
const CHECKOUT_EXCHANGE_RATE = 0.92;

export function getCheckoutDeliveryMethod(deliveryMethodId: CheckoutDeliveryMethodId) {
  return checkoutDeliveryMethods.find((method) => method.id === deliveryMethodId) ?? checkoutDeliveryMethods[0];
}

export function calculateCheckoutTotals(
  items: CartItem[],
  deliveryMethodId: CheckoutDeliveryMethodId,
): CheckoutTotals {
  const subtotal = calculateCartSubtotal(items);
  const deliveryMethod = getCheckoutDeliveryMethod(deliveryMethodId);
  const shipping = deliveryMethod.price ?? 0;
  const tax = subtotal > 0 ? subtotal * CHECKOUT_TAX_RATE : 0;
  const total = subtotal + shipping + tax;

  return {
    subtotal,
    shipping,
    tax,
    total,
    exchangeRate: CHECKOUT_EXCHANGE_RATE,
    euroTotal: total * CHECKOUT_EXCHANGE_RATE,
    shippingLabel: deliveryMethod.title,
    taxRateLabel: "8.5%",
  };
}