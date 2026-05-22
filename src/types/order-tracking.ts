export type TrackOrderLookupValues = {
  orderNumber: string;
  email: string;
};

export type TrackOrderStatusTone = "info" | "success" | "warning";

export type TrackOrderStoreSummary = {
  storeName: string;
  storeSlug: string;
  accentColor: string;
  itemCount: number;
  note: string;
};

export type TrackOrderTimelineStep = {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
};

export type TrackedOrder = {
  orderNumber: string;
  email: string;
  reference: string;
  status: string;
  statusTone: TrackOrderStatusTone;
  statusNote: string;
  lastUpdated: string;
  estimatedDelivery: string;
  carrier: string;
  destination: string;
  totalValue: number;
  supportEmail: string;
  supportPhone: string;
  storeSummaries: TrackOrderStoreSummary[];
  timeline: TrackOrderTimelineStep[];
  highlights: Array<{
    label: string;
    value: string;
  }>;
};