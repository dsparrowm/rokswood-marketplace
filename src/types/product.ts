import type { StoreProduct, StoreTrustBadge } from "@/types/store";

export type ProductTechnicalSummaryItem = {
  label: string;
  value: string;
};

export type ProductSpecificationRow = {
  label: string;
  value: string;
};

export type ProductResource = {
  title: string;
  description: string;
  actionLabel: string;
  icon: "manual" | "certificate" | "cad";
};

export type ProductDetailData = StoreProduct & {
  sku: string;
  status: "In Stock" | "RFQ Only" | "Pre-order";
  badge: string;
  unitLabel: string;
  gallery: string[];
  technicalSummary: ProductTechnicalSummaryItem[];
  specifications: ProductSpecificationRow[];
  features: string[];
  applications: string[];
  warranty: string[];
  resources: ProductResource[];
  trustBadges: StoreTrustBadge[];
  specificationSheet: {
    title: string;
    meta: string;
  };
};
