import { NextResponse } from "next/server";

import { getMarketplaceApiBaseUrl } from "@/lib/backend";

type AgentAuthBackendPath =
  | "/agents/auth/login"
  | "/agents/auth/forgot-password"
  | "/agents/auth/reset-password";

export async function proxyAgentAuthRequest(request: Request, path: AgentAuthBackendPath) {
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
    const backendResponse = await fetch(new URL(path, baseUrl), {
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
      message: "Unexpected empty response from agent authentication service",
      data: null,
    }));

    return NextResponse.json(payload, {
      status: backendResponse.status,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Agent authentication request failed";

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
