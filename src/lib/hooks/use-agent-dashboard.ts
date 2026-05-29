"use client";

import { useQuery } from "@tanstack/react-query";

import type {
  AgentAssignmentRecord,
  AgentBalanceRecord,
  AgentCommissionRecord,
  AgentDashboardApiData,
  AgentDashboardApiEnvelope,
  AgentDashboardProfile,
  AgentLedgerRecord,
  AgentPaginatedResponse,
  AgentReferralLinkRecord,
  AgentSavedBankDetails,
  AgentWithdrawalRecord,
} from "@/types/agent-dashboard-api";

async function fetchAgentDashboardEndpoint<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`/api/agents/dashboard/${path}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as AgentDashboardApiEnvelope<T> | null;

  if (!response.ok || payload?.status === false || !payload) {
    throw new Error(payload?.message ?? "Agent dashboard request failed");
  }

  return payload.data as T;
}

export function useAgentDashboardQuery(token: string | null) {
  return useQuery({
    queryKey: ["agent-dashboard"],
    enabled: Boolean(token),
    queryFn: async (): Promise<AgentDashboardApiData> => {
      if (!token) {
        throw new Error("Agent session is required");
      }

      const [
        profile,
        referralLinks,
        assignments,
        balances,
        commissions,
        ledger,
        withdrawals,
        savedBankDetails,
      ] = await Promise.all([
        fetchAgentDashboardEndpoint<AgentDashboardProfile>("auth/me", token),
        fetchAgentDashboardEndpoint<AgentReferralLinkRecord[]>("referral-links", token),
        fetchAgentDashboardEndpoint<AgentAssignmentRecord[]>("assignments", token),
        fetchAgentDashboardEndpoint<AgentBalanceRecord[]>("balance", token),
        fetchAgentDashboardEndpoint<AgentPaginatedResponse<AgentCommissionRecord>>(
          "commissions?limit=5&offset=0",
          token,
        ),
        fetchAgentDashboardEndpoint<AgentPaginatedResponse<AgentLedgerRecord>>(
          "ledger?limit=5&offset=0",
          token,
        ),
        fetchAgentDashboardEndpoint<AgentPaginatedResponse<AgentWithdrawalRecord>>(
          "withdrawals?limit=5&offset=0",
          token,
        ),
        fetchAgentDashboardEndpoint<AgentSavedBankDetails>("withdrawals/bank-details", token),
      ]);

      return {
        profile,
        referralLinks,
        assignments,
        balances,
        commissions,
        ledger,
        withdrawals,
        savedBankDetails,
      };
    },
  });
}
