import { NextResponse } from "next/server";
import { getStoreDirectoryCards } from "@/lib/data/stores";

export async function GET() {
  const data = await getStoreDirectoryCards();

  return NextResponse.json(data);
}