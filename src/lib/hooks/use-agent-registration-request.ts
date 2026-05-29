"use client";

import { useMutation } from "@tanstack/react-query";

import type {
  AgentRegistrationRequestInput,
  AgentRegistrationRequestResponse,
} from "@/types/agent-registration";

async function submitAgentRegistrationRequest(
  input: AgentRegistrationRequestInput,
): Promise<AgentRegistrationRequestResponse> {
  const response = await fetch("/api/agent-requests", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.status === false) {
    throw new Error(payload?.message ?? "Agent registration request failed");
  }

  return payload?.data as AgentRegistrationRequestResponse;
}

export function useAgentRegistrationRequestMutation() {
  return useMutation({
    mutationFn: submitAgentRegistrationRequest,
  });
}
