import { NextResponse } from "next/server";

import { submitCheckoutOrder, CheckoutFlowError } from "@/lib/services/checkout-order";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await submitCheckoutOrder(body);

    return NextResponse.json(
      { status: true, message: "Checkout order created successfully", data },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  } catch (error) {
    if (error instanceof CheckoutFlowError) {
      return NextResponse.json(
        {
          status: false,
          message: error.message,
          errorCode: error.errorCode,
          data: error.data,
        },
        { status: error.status },
      );
    }

    const message = error instanceof Error ? error.message : "Checkout submission failed";

    return NextResponse.json(
      { status: false, message },
      { status: 500 },
    );
  }
}