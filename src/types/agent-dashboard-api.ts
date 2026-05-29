export type AgentDashboardApiEnvelope<T> = {
  status?: boolean;
  message?: string;
  data?: T;
};

export type AgentDashboardCurrency = "NGN" | "GHS" | "USD" | "CAD";

export type AgentDashboardProfile = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  countryCode?: string;
  businessName?: string | null;
  status: "active" | "suspended" | "rejected" | "disabled";
  kycStatus: "pending" | "verified" | "rejected";
  agreementVerified: boolean;
};

export type AgentReferralLinkRecord = {
  id: string;
  code: string;
  discountType: "none" | "percentage" | "fixed";
  discountValue: number | null;
  useCount: number;
  status: "active" | "inactive" | "expired";
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt?: string;
};

export type AgentAssignmentRecord = {
  id: string;
  status: "active" | "inactive";
  commissionType?: "percentage" | "fixed" | null;
  commissionValue?: number | null;
  store?: {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
  };
};

export type AgentBalanceRecord = {
  id: string;
  currency: AgentDashboardCurrency;
  availableBalance: number;
  pendingBalance: number;
  totalCredit: number;
  totalDebit: number;
  status: "active" | "frozen";
};

export type AgentCommissionRecord = {
  id: string;
  orderId: string;
  storeId: string;
  currency: AgentDashboardCurrency;
  orderSubtotal: number;
  commissionType: "percentage" | "fixed";
  commissionValue: number;
  commissionAmount: number;
  status: "pending" | "earned" | "posted" | "reversed" | "cancelled";
  createdAt: string;
  order?: {
    orderNumber?: string | null;
  };
};

export type AgentLedgerRecord = {
  id: string;
  currency: AgentDashboardCurrency;
  type: "credit" | "debit";
  channel:
    | "commission"
    | "withdrawal"
    | "withdrawal_refund"
    | "reversal"
    | "manual_adjustment"
    | "hold"
    | "release";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  description?: string | null;
  status: "pending" | "posted" | "reversed" | "failed";
  createdAt: string;
};

export type AgentWithdrawalRecord = {
  id: string;
  currency: AgentDashboardCurrency;
  amount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: "pending" | "processing" | "completed" | "failed" | "reversed";
  failureReason?: string | null;
  processedAt?: string | null;
  createdAt: string;
};

export type AgentSavedBankDetails = {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
} | null;

export type AgentPaginatedResponse<T> = {
  items: T[];
  total: number;
};

export type AgentDashboardApiData = {
  profile: AgentDashboardProfile;
  referralLinks: AgentReferralLinkRecord[];
  assignments: AgentAssignmentRecord[];
  balances: AgentBalanceRecord[];
  commissions: AgentPaginatedResponse<AgentCommissionRecord>;
  ledger: AgentPaginatedResponse<AgentLedgerRecord>;
  withdrawals: AgentPaginatedResponse<AgentWithdrawalRecord>;
  savedBankDetails: AgentSavedBankDetails;
};
