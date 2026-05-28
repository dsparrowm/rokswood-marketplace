import { NextResponse } from "next/server";
import { getPublicStorePageData } from "@/lib/data/stores";

export const dynamic = "force-dynamic";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { slug } = await params;
  const data = await getPublicStorePageData(slug);

  if (!data) {
    return NextResponse.json(
      { status: false, message: "Store not found", data: null },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}