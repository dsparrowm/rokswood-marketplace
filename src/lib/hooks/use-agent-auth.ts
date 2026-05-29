"use client";

import { useMutation } from "@tanstack/react-query";

import type {
  AgentAuthMessageResponse,
  AgentAuthSession,
  AgentForgotPasswordInput,
  AgentLoginInput,
  AgentResetPasswordInput,
} from "@/types/agent-auth";

type ApiEnvelope<T> = {
  status?: boolean;
  message?: string;
  errorCode?: string;
  data?: T;
};

async function postAgentAuth<TInput, TResponse>(
  path: string,
  input: TInput,
): Promise<ApiEnvelope<TResponse>> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<TResponse> | null;

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message ?? "Agent authentication request failed");
  }

  return payload ?? { status: true };
}

export function useAgentLoginMutation() {
  return useMutation({
    mutationFn: (input: AgentLoginInput) =>
      postAgentAuth<AgentLoginInput, AgentAuthSession>("/api/agents/auth/login", input),
  });
}

export function useAgentForgotPasswordMutation() {
  return useMutation({
    mutationFn: (input: AgentForgotPasswordInput) =>
      postAgentAuth<AgentForgotPasswordInput, AgentAuthMessageResponse>(
        "/api/agents/auth/forgot-password",
        input,
      ),
  });
}

export function useAgentResetPasswordMutation() {
  return useMutation({
    mutationFn: (input: AgentResetPasswordInput) =>
      postAgentAuth<AgentResetPasswordInput, AgentAuthSession>(
        "/api/agents/auth/reset-password",
        input,
      ),
  });
}
