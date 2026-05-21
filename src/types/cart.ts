export type CartItem = {
  id: string;
  productId: string;
  productSlug: string;
  storeSlug: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  imageAlt: string;
  category: string;
};

export type CartStoreGroup = {
  storeSlug: string;
  storeName: string;
  accentTextClassName: string;
  accentColor: string;
  itemCount: number;
  subtotal: number;
  items: CartItem[];
};

export type CartSummaryTotals = {
  subtotal: number;
  estimatedShipping: number;
  estimatedTax: number;
  total: number;
  exchangeRate: number;
  euroTotal: number;
};