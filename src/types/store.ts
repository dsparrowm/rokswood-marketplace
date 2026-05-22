export type StoreIconName = "gears" | "pulse" | "metals" | "energy" | "efab";

export type StoreCardData = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  accentClassName: string;
  icon: StoreIconName;
  logoSrc?: string;
  logoAlt?: string;
};

export type StoreProduct = {
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number | null;
  image: string;
  imageAlt: string;
};

export type StoreTrustBadge = {
  title: string;
  description: string;
  icon: "certified" | "factory" | "delivery" | "support";
};

export type StoreDetailData = StoreCardData & {
  heroDescription: string;
  searchPlaceholder: string;
  heroClassName: string;
  accentTextClassName: string;
  categories: string[];
  availability: string[];
  segments: string[];
  products: StoreProduct[];
  trustBadges: StoreTrustBadge[];
  ctaTitle: string;
  ctaDescription: string;
};
