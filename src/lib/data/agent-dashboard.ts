import type { AgentDashboardData } from "@/types/agent-dashboard";

export const agentDashboardData: AgentDashboardData = {
  agentName: "Agent Portal",
  alert: "Complete your KYC verification to unlock full wallet withdrawals.",
  statusBadges: ["KYC: Pending", "Agreement: Verified"],
  metrics: [
    {
      label: "Total Sales",
      value: "$24,500.00",
      helper: "↑ 12.5% from last month",
      tone: "sales",
    },
    {
      label: "Commission Earned",
      value: "$3,240.50",
      helper: "↑ 8.2% from last month",
      tone: "commission",
    },
    {
      label: "Wallet Balance",
      value: "$1,850.00",
      helper: "Available to withdraw",
      tone: "wallet",
    },
    {
      label: "Pending Commission",
      value: "$450.00",
      helper: "Clearing in 3-5 days",
      tone: "pending",
    },
  ],
  salesSummary: [
    { label: "Sales This Month", value: "$12,450" },
    { label: "Total Orders", value: "142" },
    { label: "Avg. Order Value", value: "$87.67" },
  ],
  wallet: {
    availableBalance: "$1,850.00",
    pendingFunds: "$450.00",
    linkedBank: "**** 4829",
  },
  storefront: {
    name: "Tech & Energy Hub",
    status: "Active Store",
    assignedBrands: "Rokswood, Agrify",
    totalVisitors: "12,450",
    conversionRate: "3.2%",
    referralLink: "rokswood.com/store/tech-hub",
  },
  commissions: [
    {
      orderId: "#ORD-8832",
      productStore: "Rokswood Energy Kit",
      date: "Today, 10:24 AM",
      amount: "$45.00",
      status: "Pending",
    },
    {
      orderId: "#ORD-8818",
      productStore: "Agrify Sensor Bundle",
      date: "Yesterday",
      amount: "$82.50",
      status: "Paid",
    },
    {
      orderId: "#ORD-8804",
      productStore: "Smart Home Hub",
      date: "May 18, 2026",
      amount: "$64.00",
      status: "Paid",
    },
  ],
  activities: [
    {
      title: "Commission Added",
      detail: "+$45.00 from Order #ORD-8832",
      time: "2 hours ago",
      tone: "success",
    },
    {
      title: "New Sale Completed",
      detail: "Smart Home Hub sold via storefront",
      time: "5 hours ago",
      tone: "info",
    },
    {
      title: "Wallet Withdrawal",
      detail: "-$500.00 to Bank ****4829",
      time: "Yesterday",
      tone: "muted",
    },
  ],
};
