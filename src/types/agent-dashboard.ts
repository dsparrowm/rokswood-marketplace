export type AgentMetricTone = "sales" | "commission" | "wallet" | "pending";

export type AgentMetric = {
  label: string;
  value: string;
  helper: string;
  tone: AgentMetricTone;
};

export type AgentSalesSummaryItem = {
  label: string;
  value: string;
};

export type AgentCommissionStatus = "Pending" | "Paid";

export type AgentCommission = {
  orderId: string;
  productStore: string;
  date: string;
  amount: string;
  status: AgentCommissionStatus;
};

export type AgentActivityTone = "success" | "info" | "muted";

export type AgentActivity = {
  title: string;
  detail: string;
  time: string;
  tone: AgentActivityTone;
};

export type AgentDashboardData = {
  agentName: string;
  alert: string;
  statusBadges: string[];
  metrics: AgentMetric[];
  salesSummary: AgentSalesSummaryItem[];
  wallet: {
    availableBalance: string;
    pendingFunds: string;
    linkedBank: string;
  };
  storefront: {
    name: string;
    status: string;
    assignedBrands: string;
    totalVisitors: string;
    conversionRate: string;
    referralLink: string;
  };
  commissions: AgentCommission[];
  activities: AgentActivity[];
};
