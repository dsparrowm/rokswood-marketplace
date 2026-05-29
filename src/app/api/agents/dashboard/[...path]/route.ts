import { NextResponse } from "next/server";

import { getMarketplaceApiBaseUrl } from "@/lib/backend";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function proxyAgentDashboardRequest(request: Request, context: RouteContext) {
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

  const { path } = await context.params;
  const sourceUrl = new URL(request.url);
  const backendUrl = new URL(`/agents/${path.join("/")}`, baseUrl);
  backendUrl.search = sourceUrl.search;
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json(
      {
        status: false,
        message: "Agent authorization token is required",
        data: null,
      },
      { status: 401 },
    );
  }

  const method = request.method.toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";

  try {
    const backendResponse = await fetch(backendUrl, {
      method,
      headers: {
        Accept: "application/json",
        Authorization: authorization,
        ...(hasBody ? { "Content-Type": "application/json" } : {}),
      },
      ...(hasBody ? { body: await request.text() } : {}),
      cache: "no-store",
    });
    const payload = await backendResponse.json().catch(() => ({
      status: false,
      message: "Unexpected empty response from agent dashboard service",
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
    const message = error instanceof Error ? error.message : "Agent dashboard request failed";

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

export function GET(request: Request, context: RouteContext) {
  return proxyAgentDashboardRequest(request, context);
}

export function POST(request: Request, context: RouteContext) {
  return proxyAgentDashboardRequest(request, context);
}

export function PATCH(request: Request, context: RouteContext) {
  return proxyAgentDashboardRequest(request, context);
}
