import type {
  CartItem,
  CartStoreGroup,
} from "@/types/cart";
import type {
  CheckoutFormValues,
  CheckoutGuestOrderRequest,
  CheckoutGuestOrderResponse,
  CheckoutPaymentInitializationResponse,
  CheckoutSubmissionResponse,
} from "@/types/checkout";

type BackendApiEnvelope<T> = {
  status: boolean;
  message: string;
  data: T;
};

type BackendStoreProductRecord = {
  id: string;
  warehouseItem: {
    name: string;
    sku?: string | null;
  };
};

type CheckoutMutationInput = CheckoutFormValues & {
  cartItems: CartItem[];
};

export type CheckoutSingleStoreCart = {
  group: CartStoreGroup;
  cartItems: CartItem[];
};

export type CheckoutFlowErrorPayload = {
  message: string;
  errorCode?: string;
  data?: unknown;
};

export class CheckoutFlowError extends Error {
  status: number;
  errorCode?: string;
  data?: unknown;

  constructor(status: number, payload: CheckoutFlowErrorPayload) {
    super(payload.message);
    this.name = "CheckoutFlowError";
    this.status = status;
    this.errorCode = payload.errorCode;
    this.data = payload.data;
  }
}

const COUNTRY_CODE_MAP: Record<string, string> = {
  nigeria: "NG",
  nigerian: "NG",
  ghana: "GH",
  ghanaian: "GH",
  "united states": "US",
  usa: "US",
  "u.s.a": "US",
  canada: "CA",
  canadian: "CA",
};

function normalizeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function toCountryCode(value: string) {
  const trimmed = value.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const normalized = value.toLowerCase().trim();
  return COUNTRY_CODE_MAP[normalized] ?? COUNTRY_CODE_MAP[normalizeValue(normalized)] ?? "";
}

async function readJsonError(response: Response): Promise<CheckoutFlowErrorPayload> {
  try {
    const body = (await response.json()) as Partial<CheckoutFlowErrorPayload> & { message?: string };

    return {
      message: body.message ?? "Checkout request failed",
      errorCode: body.errorCode,
      data: body.data,
    };
  } catch {
    return { message: "Checkout request failed" };
  }
}

function ensureSingleStore(cartItems: CartItem[]) {
  const storeSlugs = Array.from(new Set(cartItems.map((item) => item.storeSlug)));

  if (storeSlugs.length !== 1) {
    throw new CheckoutFlowError(400, {
      message: "Checkout currently supports one store per order. Remove items from other stores to continue.",
      errorCode: "BAD_REQUEST",
      data: { storeSlugs },
    });
  }

  return storeSlugs[0];
}

function matchListingId(product: BackendStoreProductRecord, cartItem: CartItem) {
  const productName = normalizeValue(product.warehouseItem.name);
  const cartName = normalizeValue(cartItem.name);
  const productSku = normalizeValue(product.warehouseItem.sku ?? "");
  const cartSku = normalizeValue(cartItem.sku);

  return (
    productName === cartName ||
    (productSku.length > 0 && productSku === cartSku) ||
    productName.includes(cartName) ||
    cartName.includes(productName)
  );
}

async function fetchStoreProductCatalog(baseUrl: string, storeSlug: string) {
  const response = await fetch(new URL(`/public/stores/${storeSlug}/products?limit=100&page=1`, baseUrl), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new CheckoutFlowError(response.status, {
      message: "Unable to resolve backend catalog items for checkout",
    });
  }

  const envelope = (await response.json()) as BackendApiEnvelope<{ items: BackendStoreProductRecord[] }>;
  return envelope.data?.items ?? [];
}

async function postBackendApi<T>(baseUrl: string, path: string, body: unknown) {
  const response = await fetch(new URL(path, baseUrl), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new CheckoutFlowError(response.status, await readJsonError(response));
  }

  return (await response.json()) as BackendApiEnvelope<T>;
}

export async function submitCheckoutOrder(input: CheckoutMutationInput) {
  const baseUrl = process.env.ROKSWOOD_HIVE_BACKEND_API_BASE_URL?.trim() || process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!baseUrl) {
    throw new CheckoutFlowError(500, {
      message: "Marketplace backend base URL is not configured",
    });
  }

  const storeSlug = ensureSingleStore(input.cartItems);
  const countryCode = toCountryCode(input.country);

  if (!countryCode) {
    throw new CheckoutFlowError(400, {
      message: "Choose a valid checkout country before placing the order",
      errorCode: "BAD_REQUEST",
    });
  }

  const catalog = await fetchStoreProductCatalog(baseUrl, storeSlug);

  const lineItems = input.cartItems.map((cartItem) => {
    const listing = catalog.find((product) => matchListingId(product, cartItem));

    if (!listing) {
      throw new CheckoutFlowError(400, {
        message: `Unable to match ${cartItem.name} to the backend catalog for ${storeSlug}`,
        errorCode: "BAD_REQUEST",
        data: { storeSlug, cartItemId: cartItem.id },
      });
    }

    return {
      listingId: listing.id,
      quantity: cartItem.quantity,
    };
  });

  const orderPayload: CheckoutGuestOrderRequest = {
    guestName: input.fullName,
    guestEmail: input.email,
    guestPhone: input.phone,
    countryCode,
    deliveryAddress: {
      line1: input.address,
      city: input.city,
      state: input.state,
      country: countryCode,
    },
    items: lineItems,
  };

  const orderResponse = await postBackendApi<CheckoutGuestOrderResponse>(
    baseUrl,
    `/public/stores/${storeSlug}/orders`,
    orderPayload,
  );

  const paymentResponse = await postBackendApi<CheckoutPaymentInitializationResponse>(
    baseUrl,
    `/public/orders/${orderResponse.data.trackingToken}/payment/initialize`,
    {},
  );

  const result: CheckoutSubmissionResponse = {
    order: orderResponse.data,
    payment: paymentResponse.data,
  };

  return {
    storeSlug,
    ...result,
  };
}
