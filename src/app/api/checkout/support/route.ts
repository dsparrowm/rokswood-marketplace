import { NextResponse } from "next/server";

import { fetchMarketplaceApi } from "@/lib/backend";
import { checkoutCurrencyOptionsFallback } from "@/lib/data/checkout";
import type { CheckoutSupportData } from "@/types/checkout";

type BackendCurrencyOptionsResponse = {
  status: boolean;
  message: string;
  data: CheckoutSupportData["currencyOptions"];
};

type BackendMarketplaceDeliveryCountriesResponse = {
  status: boolean;
  message: string;
  data: {
    allowedDeliveryCountryCodes: string[];
  };
};

type BackendPaystackBank = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
};

type BackendBanksResponse = {
  status: boolean;
  message: string;
  data: BackendPaystackBank[];
};

export const dynamic = "force-dynamic";

function normalizeBanks(banks: BackendPaystackBank[]) {
  return banks
    .filter((bank) => bank.active && bank.pay_with_bank && !bank.is_deleted)
    .map((bank) => ({
      id: bank.id,
      name: bank.name,
      code: bank.code,
      longcode: bank.longcode,
      gateway: bank.gateway,
      payWithBank: bank.pay_with_bank,
      active: bank.active,
      country: bank.country,
      currency: bank.currency,
      slug: bank.slug,
      type: bank.type,
      isDeleted: bank.is_deleted,
    }));
}

export async function GET() {
  const currenciesResponse = await fetchMarketplaceApi<BackendCurrencyOptionsResponse>(
    "/public/misc/currencies",
    { cache: "no-store" },
  );

  const currencyOptions = currenciesResponse?.data?.length
    ? currenciesResponse.data
    : checkoutCurrencyOptionsFallback;

  const localCurrency =
    currencyOptions.find((option) => option.key === "NGN")?.key ?? currencyOptions[0]?.key ?? "NGN";

  const [banksResponse, deliveryCountriesResponse] = await Promise.all([
    fetchMarketplaceApi<BackendBanksResponse>(
      `/public/misc/banks?country=nigeria&currency=${encodeURIComponent(localCurrency)}`,
      {
        cache: "no-store",
      },
    ),
    fetchMarketplaceApi<BackendMarketplaceDeliveryCountriesResponse>("/public/marketplace/delivery-countries", {
      cache: "no-store",
    }),
  ]);

  const data: CheckoutSupportData = {
    currencyOptions,
    banks: banksResponse?.data ? normalizeBanks(banksResponse.data) : [],
    deliveryCountryCodes: deliveryCountriesResponse?.data?.allowedDeliveryCountryCodes ?? [],
  };

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}