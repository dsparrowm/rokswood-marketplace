"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import CheckoutDeliveryMethods from "@/components/checkout/checkout-delivery-methods";
import CheckoutOrderSummary from "@/components/checkout/checkout-order-summary";
import CheckoutPaymentMethod from "@/components/checkout/checkout-payment-method";
import CheckoutSection from "@/components/checkout/checkout-section";
import CheckoutTextareaField from "@/components/checkout/checkout-textarea-field";
import CheckoutTextField from "@/components/checkout/checkout-text-field";
import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import { checkoutCurrencyOptionsFallback } from "@/lib/data/checkout";
import { useCheckoutOrderMutation } from "@/lib/hooks/use-checkout-order";
import { useCheckoutSupportQuery } from "@/lib/hooks/use-checkout-support";
import { calculateCheckoutTotals } from "@/lib/checkout";
import { formatCurrency, groupCartItems } from "@/lib/cart";
import { useCartStore } from "@/store/cart.store";
import type { CheckoutFormValues } from "@/types/checkout";

const checkoutSchema = z
  .object({
    fullName: z.string().min(2, "Enter the full name"),
    email: z.string().email("Enter a valid email address"),
    phone: z.string().min(7, "Enter a valid phone number"),
    country: z.string().min(2, "Enter the country"),
    state: z.string().min(2, "Enter the state or region"),
    city: z.string().min(2, "Enter the city"),
    address: z.string().min(10, "Enter the full delivery address"),
    postalCode: z.string().min(3, "Enter a postal code"),
    billingSameAsShipping: z.boolean(),
    deliveryMethod: z.enum(["standard", "express", "enterprise"]),
    orderNotes: z.string().max(500, "Keep notes under 500 characters"),
    paymentMethod: z.enum(["card", "bank_transfer", "corporate"]),
    bankCode: z.string(),
    cardNumber: z.string(),
    cardExpiry: z.string(),
    cardCvv: z.string(),
  })
  .superRefine((values, ctx) => {
    if (values.paymentMethod !== "card") {
      if (values.paymentMethod === "bank_transfer" && !values.bankCode.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["bankCode"], message: "Choose a bank for the transfer" });
      }

      return;
    }

    const cardNumber = values.cardNumber ?? "";
    const cardExpiry = values.cardExpiry ?? "";
    const cardCvv = values.cardCvv ?? "";

    if (cardNumber.trim().length < 12) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardNumber"], message: "Enter a valid card number" });
    }

    if (cardExpiry.trim().length < 4) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardExpiry"], message: "Enter a valid expiry date" });
    }

    if (cardCvv.trim().length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cardCvv"], message: "Enter a valid CVV" });
    }
  });

type CheckoutSubmissionResult = {
  order: {
    orderNumber: string;
    trackingToken: string;
    total: number;
    currency: string;
  };
  payment: {
    provider: string;
    amount: number;
    currency: string;
    checkoutUrl?: string;
  };
};

function CheckoutResultBanner({ result }: { result: CheckoutSubmissionResult }) {
  const paymentCurrency = result.payment.currency as "USD" | "EUR" | "NGN" | "GHS" | "CAD";

  return (
    <div className="rounded-lg border border-[var(--state-success)] bg-[color-mix(in_srgb,var(--state-success)_8%,var(--bg-surface))] px-4 py-4 text-sm text-[var(--text-primary)] shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-semibold text-[var(--text-primary)]">Order {result.order.orderNumber} created successfully.</p>
          <p className="text-[var(--text-muted)]">
            Procurement confirmation is ready. Payment checkout has been initialized with {result.payment.provider}.
          </p>
          <p className="text-xs text-[var(--text-light)]">Tracking token: {result.order.trackingToken}</p>
          <p className="text-xs text-[var(--text-light)]">
            Payment amount: {formatCurrency(result.payment.amount, { currency: paymentCurrency })}
          </p>
        </div>

        {result.payment.checkoutUrl ? (
          <a
            href={result.payment.checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--bg-dark)] px-4 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)]"
          >
            Continue to payment
          </a>
        ) : (
          <span className="inline-flex h-10 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-primary)]">
            Payment handoff pending
          </span>
        )}
      </div>
    </div>
  );
}

function EmptyCheckoutState() {
  return (
    <section className="rounded-lg border border-dashed border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center shadow-sm sm:p-12">
      <p className="text-sm font-semibold text-[var(--text-primary)]">Your procurement cart is empty</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
        Add industrial products from any store to complete checkout.
      </p>
      <Link
        href="/stores"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[var(--bg-dark)] px-5 text-sm font-semibold text-[var(--text-on-dark)] transition-colors hover:bg-[var(--text-primary)]"
      >
        Browse Stores
      </Link>
    </section>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const groupedItems = groupCartItems(items);
  const checkoutSupportQuery = useCheckoutSupportQuery();
  const checkoutOrderMutation = useCheckoutOrderMutation();
  const supportData = checkoutSupportQuery.data ?? {
    currencyOptions: checkoutCurrencyOptionsFallback,
    banks: [],
    deliveryCountryCodes: [],
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "Alex Mercer",
      email: "alex.mercer@enterprise.com",
      phone: "+1 (555) 123-4567",
      country: "United States",
      state: "New York",
      city: "Manhattan",
      address: "120 Broadway, Suite 3400",
      postalCode: "10271",
      billingSameAsShipping: true,
      deliveryMethod: "standard",
      orderNotes: "",
      paymentMethod: "card",
      bankCode: "",
      cardNumber: "•••• •••• •••• 4242",
      cardExpiry: "12/25",
      cardCvv: "•••",
    },
    mode: "onSubmit",
  });

  const [checkoutResult, setCheckoutResult] = useState<CheckoutSubmissionResult | null>(null);
  const [checkoutErrorMessage, setCheckoutErrorMessage] = useState<string | null>(null);
  const deliveryMethod = useWatch({ control: form.control, name: "deliveryMethod" });
  const paymentMethod = useWatch({ control: form.control, name: "paymentMethod" });
  const bankCode = useWatch({ control: form.control, name: "bankCode" });
  const totals = calculateCheckoutTotals(items, deliveryMethod);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (paymentMethod !== "bank_transfer" || bankCode || supportData.banks.length === 0) {
      return;
    }

    setValue("bankCode", supportData.banks[0].code, { shouldValidate: true, shouldDirty: false });
  }, [bankCode, paymentMethod, setValue, supportData.banks]);

  const onSubmit = handleSubmit(async (values) => {
    setCheckoutErrorMessage(null);
    setCheckoutResult(null);

    try {
      const result = await checkoutOrderMutation.mutateAsync({
        ...values,
        cartItems: items,
      });

      setCheckoutResult(result);
    } catch (error) {
      setCheckoutErrorMessage(error instanceof Error ? error.message : "Checkout submission failed");
    }
  });

  const payLabel = formatCurrency(totals.total);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Nav />

      <main className="flex-1">
        <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                Secure Checkout
              </h1>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Complete your enterprise procurement order.
              </p>
            </div>

            {checkoutErrorMessage ? (
              <div className="mt-6 rounded-lg border border-[var(--state-error)] bg-[color-mix(in_srgb,var(--state-error)_8%,var(--bg-surface))] px-4 py-3 text-sm text-[var(--text-primary)] shadow-sm">
                {checkoutErrorMessage}
              </div>
            ) : null}

            {checkoutResult ? (
              <div className="mt-6">
                <CheckoutResultBanner result={checkoutResult} />
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] xl:grid-cols-[minmax(0,1.15fr)_400px]">
              <div className="space-y-6">
                {items.length === 0 ? (
                  <EmptyCheckoutState />
                ) : (
                  <>
                    <CheckoutSection step={1} title="Shipping Information">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <CheckoutTextField
                          label="Full Name"
                          registration={register("fullName")}
                          error={errors.fullName?.message}
                          autoComplete="name"
                        />
                        <CheckoutTextField
                          label="Email Address"
                          registration={register("email")}
                          error={errors.email?.message}
                          type="email"
                          autoComplete="email"
                        />
                        <CheckoutTextField
                          label="Phone Number"
                          registration={register("phone")}
                          error={errors.phone?.message}
                          autoComplete="tel"
                        />
                        <CheckoutTextField
                          label="Country"
                          registration={register("country")}
                          error={errors.country?.message}
                          autoComplete="country-name"
                        />
                        <CheckoutTextField
                          label="State / Region"
                          registration={register("state")}
                          error={errors.state?.message}
                          autoComplete="address-level1"
                        />
                        <CheckoutTextField
                          label="City"
                          registration={register("city")}
                          error={errors.city?.message}
                          autoComplete="address-level2"
                        />
                        <div className="sm:col-span-2">
                          <CheckoutTextField
                            label="Full Delivery Address"
                            registration={register("address")}
                            error={errors.address?.message}
                            autoComplete="street-address"
                          />
                        </div>
                        <CheckoutTextField
                          label="Postal Code (Optional)"
                          registration={register("postalCode")}
                          error={errors.postalCode?.message}
                          autoComplete="postal-code"
                        />
                      </div>
                    </CheckoutSection>

                    <CheckoutSection
                      step={2}
                      title="Billing Details"
                      action={
                        <label className="flex items-center gap-2 text-xs text-[var(--text-muted)] sm:text-sm">
                          <input
                            {...register("billingSameAsShipping")}
                            type="checkbox"
                            className="h-4 w-4 rounded border-[var(--border-default)] accent-[var(--accent-payment)]"
                          />
                          Same as shipping
                        </label>
                      }
                    >
                      <p className="text-sm leading-6 text-[var(--text-muted)]">
                        Billing documents will mirror the shipping profile unless you uncheck the confirmation above.
                      </p>
                    </CheckoutSection>

                    <CheckoutSection step={3} title="Delivery Method">
                      <CheckoutDeliveryMethods
                        register={register}
                        selectedMethod={deliveryMethod}
                        error={errors.deliveryMethod}
                        deliveryCountryCodes={supportData.deliveryCountryCodes}
                      />
                    </CheckoutSection>

                    <CheckoutSection step={4} title="Order Notes (Optional)">
                      <CheckoutTextareaField
                        label="Order Notes (Optional)"
                        registration={register("orderNotes")}
                        error={errors.orderNotes?.message}
                        placeholder="Add special instructions for delivery, procurement, or installation requirements..."
                        rows={5}
                      />
                    </CheckoutSection>

                    <div className="space-y-6 lg:hidden">
                      <CheckoutOrderSummary groups={groupedItems} totals={totals} isEmpty={items.length === 0} />
                      <CheckoutPaymentMethod
                        register={register}
                        selectedMethod={paymentMethod}
                        bankOptions={supportData.banks}
                        currencyOptions={supportData.currencyOptions}
                        cardNumberError={errors.cardNumber?.message}
                        cardExpiryError={errors.cardExpiry?.message}
                        cardCvvError={errors.cardCvv?.message}
                        bankCodeError={errors.bankCode?.message}
                        payLabel={payLabel}
                        isLoading={checkoutOrderMutation.isPending}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="hidden space-y-6 lg:block lg:self-start lg:sticky lg:top-24">
                <CheckoutOrderSummary groups={groupedItems} totals={totals} isEmpty={items.length === 0} />
                {items.length > 0 ? (
                  <CheckoutPaymentMethod
                    register={register}
                    selectedMethod={paymentMethod}
                    bankOptions={supportData.banks}
                    currencyOptions={supportData.currencyOptions}
                    cardNumberError={errors.cardNumber?.message}
                    cardExpiryError={errors.cardExpiry?.message}
                    cardCvvError={errors.cardCvv?.message}
                    bankCodeError={errors.bankCode?.message}
                    payLabel={payLabel}
                    isLoading={checkoutOrderMutation.isPending}
                  />
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
