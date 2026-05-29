import { NextResponse } from "next/server";

import { getMarketplaceApiBaseUrl } from "@/lib/backend";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const baseUrl = getMarketplaceApiBaseUrl();

  if (!baseUrl) {
    return NextResponse.json(
      {
        status: false,
        message: "Marketplace backend API URL is not configured",
        data: null,
      },
      { status: 500 },
    );
  }

  try {
    const body = await request.text();
    const backendResponse = await fetch(new URL("/public/agent-requests", baseUrl), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
      cache: "no-store",
    });
    const payload = await backendResponse.json().catch(() => ({
      status: false,
      message: "Unexpected empty response from agent registration service",
      data: null,
    }));

    return NextResponse.json(payload, { status: backendResponse.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Agent registration request failed";

    return NextResponse.json(
      {
        status: false,
        message,
        data: null,
      },
      { status: 500 },
    );
  }
}
