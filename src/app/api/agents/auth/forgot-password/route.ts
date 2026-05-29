import { proxyAgentAuthRequest } from "@/lib/services/agent-auth-proxy";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return proxyAgentAuthRequest(request, "/agents/auth/forgot-password");
}
