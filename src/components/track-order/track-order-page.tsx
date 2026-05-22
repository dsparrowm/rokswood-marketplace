"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Footer from "@/components/marketplace/footer";
import Nav from "@/components/marketplace/nav";
import TrackOrderLookupForm from "@/components/track-order/track-order-lookup-form";
import TrackOrderResult from "@/components/track-order/track-order-result";
import { trackableOrders } from "@/lib/data/order-tracking";
import type { TrackOrderLookupValues, TrackedOrder } from "@/types/order-tracking";

const trackOrderSchema = z.object({
  orderNumber: z.string().min(4, "Enter the order number from your confirmation email"),
  email: z.string().email("Enter the email address used at checkout"),
});

const demoOrder = trackableOrders[0];

function findTrackedOrder(values: TrackOrderLookupValues) {
  const normalizedOrderNumber = values.orderNumber.trim().toLowerCase();
  const normalizedEmail = values.email.trim().toLowerCase();

  return trackableOrders.find(
    (order) => order.orderNumber.toLowerCase() === normalizedOrderNumber && order.email.toLowerCase() === normalizedEmail,
  );
}

export default function TrackOrderPage() {
  const [activeOrder, setActiveOrder] = useState<TrackedOrder>(demoOrder);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TrackOrderLookupValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderNumber: demoOrder.orderNumber,
      email: demoOrder.email,
    },
    mode: "onSubmit",
  });

  const onSubmit = handleSubmit((values) => {
    const matchedOrder = findTrackedOrder(values);

    if (!matchedOrder) {
      setError("root", {
        type: "manual",
        message: "We could not find a matching order. Check the order number and checkout email.",
      });
      return;
    }

    clearErrors("root");
    setActiveOrder(matchedOrder);
  });

  const useDemoOrder = () => {
    setValue("orderNumber", demoOrder.orderNumber, { shouldValidate: true });
    setValue("email", demoOrder.email, { shouldValidate: true });
    clearErrors("root");
    setActiveOrder(demoOrder);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <Nav />

      <main className="flex-1">
        <section className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent-payment)]">
                Order Tracking
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em] text-[var(--text-primary)] sm:text-4xl">
                Track your procurement order
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                Check shipment status, review the delivery timeline, and confirm the stores included in your order.
              </p>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div className="space-y-6">
                <TrackOrderLookupForm
                  register={register}
                  errors={errors}
                  onSubmit={onSubmit}
                  onUseDemoOrder={useDemoOrder}
                  isSubmitting={isSubmitting}
                  demoOrderNumber={demoOrder.orderNumber}
                  demoEmail={demoOrder.email}
                  formError={errors.root?.message}
                />

                <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 shadow-sm sm:p-6">
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Helpful tip</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    The order number appears in your confirmation email and invoice header. Use the same email address
                    that was entered at checkout.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-[var(--text-muted)]">
                    <span className="rounded-full bg-[var(--bg-tag)] px-3 py-1">Fast lookup</span>
                    <span className="rounded-full bg-[var(--bg-tag)] px-3 py-1">Multi-store orders</span>
                    <span className="rounded-full bg-[var(--bg-tag)] px-3 py-1">Enterprise support</span>
                  </div>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/cart"
                      className="inline-flex h-11 items-center justify-center rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-tag)]"
                    >
                      Review Cart
                    </Link>
                    <Link
                      href="/checkout"
                      className="inline-flex h-11 items-center justify-center rounded-md bg-[var(--accent-primary)] px-5 text-sm font-semibold text-white"
                    >
                      Return to Checkout
                    </Link>
                  </div>
                </section>
              </div>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <TrackOrderResult order={activeOrder} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}