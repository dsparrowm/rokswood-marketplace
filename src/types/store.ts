export type StoreIconName = "gears" | "pulse" | "metals" | "energy" | "efab";

export type StoreCardData = {
  name: string;
  category: string;
  description: string;
  tags: string[];
  href: string;
  accentClassName: string;
  icon: StoreIconName;
};
