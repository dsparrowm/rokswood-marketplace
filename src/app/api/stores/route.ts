import { NextResponse } from "next/server";
import { getStoreDirectoryCards } from "@/lib/data/stores";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getStoreDirectoryCards();

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}