import { fetchMarketplaceApi } from "@/lib/backend";
import { getStoreBySlug, getStoreThemeBySlug, stores } from "@/lib/data/stores";
import type { ProductDetailData } from "@/types/product";
import type { StoreDetailData, StoreProduct } from "@/types/store";

const productTrustBadges = [
  { title: "Certified Equipment", description: "Meets global industrial standards", icon: "certified" },
  { title: "Nationwide Freight", description: "Secure heavy-cargo delivery", icon: "delivery" },
  { title: "Secure Procurement", description: "Enterprise POs accepted", icon: "factory" },
  { title: "Engineering Support", description: "Direct technical assistance", icon: "support" },
] satisfies ProductDetailData["trustBadges"];

function makeSku(product: StoreProduct, store: StoreDetailData) {
  const storePrefix = store.slug
    .split("-")
    .map((part) => part.slice(0, 2).toUpperCase())
    .join("");

  return `${storePrefix}-${product.slug.slice(0, 6).toUpperCase()}`;
}

function buildDefaultProductDetail(product: StoreProduct, store: StoreDetailData): ProductDetailData {
  return {
    ...product,
    sku: makeSku(product, store),
    status: product.price === null ? "RFQ Only" : "In Stock",
    badge: "New",
    unitLabel: "/ unit (Excl. Tax)",
    gallery: [product.image, product.image, product.image, product.image],
    technicalSummary: [
      { label: "Category", value: product.category },
      { label: "Store", value: store.name },
      { label: "Procurement", value: product.price === null ? "Quote Required" : "Direct Purchase" },
      { label: "Support", value: "Technical Ready" },
    ],
    specifications: [
      { label: "Model Number", value: makeSku(product, store) },
      { label: "Power Rating", value: "Enterprise Grade" },
      { label: "Input Standard", value: "Industrial Deployment" },
      { label: "Certification", value: "UL / CE / ISO" },
    ],
    features: [
      "Enterprise procurement support with technical review.",
      "Compatible with industrial deployment workflows.",
      "Documented for quotation, delivery, and facility planning.",
    ],
    applications: [
      "Industrial procurement programmes",
      "Commercial infrastructure deployment",
      "Facility upgrade and maintenance planning",
    ],
    warranty: [
      "Standard manufacturer warranty applies.",
      "Installation guidance available through technical support.",
      "Procurement documentation available on request.",
    ],
    resources: [
      {
        title: "Installation Manual",
        description: "Step-by-step mounting and commissioning guide.",
        actionLabel: "Download PDF",
        icon: "manual",
      },
      {
        title: "Compliance Certificates",
        description: "UL, CE, and ISO regulatory documents.",
        actionLabel: "Download ZIP",
        icon: "certificate",
      },
      {
        title: "CAD Models",
        description: "2D/3D engineering models for facility planning.",
        actionLabel: "Request Access",
        icon: "cad",
      },
    ],
    trustBadges: productTrustBadges,
    specificationSheet: {
      title: "Download Specification Sheet",
      meta: "PDF, 2.4 MB • Engineering Blueprint",
    },
  };
}

type BackendStoreDetailResponse = {
  status: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string | null;
    briefDescription?: string | null;
    productHighlights?: string[] | null;
    countryCodes?: string[] | null;
    categoryCount: number;
    productCount: number;
  };
};

type BackendStoreProductDetailResponse = {
  status: boolean;
  message: string;
  data: {
    id: string;
    storeId: string;
    categoryId?: string | null;
    priceNGN?: number | null;
    priceUSD?: number | null;
    coverImageUrl?: string | null;
    viewCount?: number;
    dataSheetUrl?: string | null;
    stockLabel: string;
    warehouseItem: {
      id: string;
      name: string;
      sku?: string | null;
      unitOfMeasure?: string | null;
    };
    category?: {
      id: string;
      name: string;
      slug: string;
    } | null;
    images?: {
      id: string;
      listingId: string;
      url: string;
      altText?: string | null;
      displayOrder: number;
    }[];
  };
};

type BackendStoreProductListResponse = {
  status: boolean;
  message: string;
  data: {
    items: BackendStoreProductDetailResponse["data"][];
    page: number;
    limit: number;
    total: number;
  };
};

async function getBackendStoreDetail(slug: string) {
  const response = await fetchMarketplaceApi<BackendStoreDetailResponse>(
    `/public/stores/${slug}`,
    { cache: "no-store" },
  );

  return response?.data ?? null;
}

async function getBackendProductDetail(storeSlug: string, productId: string) {
  const response = await fetchMarketplaceApi<BackendStoreProductDetailResponse>(
    `/public/stores/${storeSlug}/products/${productId}`,
    { cache: "no-store" },
  );

  return response?.data ?? null;
}

async function getBackendStoreProducts(storeSlug: string) {
  const response = await fetchMarketplaceApi<BackendStoreProductListResponse>(
    `/public/stores/${storeSlug}/products?limit=100&page=1`,
    { cache: "no-store" },
  );

  return response?.data.items ?? [];
}

function buildBackendProductDetail(
  store: StoreDetailData,
  product: BackendStoreProductDetailResponse["data"],
): ProductDetailData {
  const theme = getStoreThemeBySlug(store.slug);
  const gallery = [
    product.coverImageUrl,
    ...(product.images?.map((image) => image.url) ?? []),
    store.logoSrc,
  ].filter((value): value is string => Boolean(value));
  const primaryImage = gallery[0] ?? "/assets/store-products/energy-monitor.svg";
  const price = product.priceUSD ?? product.priceNGN ?? null;

  return {
    slug: product.id,
    name: product.warehouseItem.name,
    category: product.category?.name ?? theme.category,
    description: `${product.warehouseItem.name} from ${store.name} is available through the public catalogue.`,
    price,
    image: primaryImage,
    imageAlt: `${product.warehouseItem.name} product illustration`,
    href: `/stores/${store.slug}/products/${product.id}`,
    sku: product.warehouseItem.sku ?? `${store.slug.slice(0, 3).toUpperCase()}-${product.id.slice(0, 6).toUpperCase()}`,
    status: product.stockLabel === "RFQ Only" ? "RFQ Only" : "In Stock",
    badge: product.stockLabel === "RFQ Only" ? "Quote" : "New",
    unitLabel: " / unit (Excl. Tax)",
    gallery: gallery.length > 0 ? gallery.slice(0, 4) : [primaryImage],
    technicalSummary: [
      { label: "Category", value: product.category?.name ?? theme.category },
      { label: "Store", value: store.name },
      { label: "Procurement", value: product.stockLabel },
      { label: "Support", value: "Technical Ready" },
    ],
    specifications: [
      { label: "SKU", value: product.warehouseItem.sku ?? product.id },
      { label: "Unit of Measure", value: product.warehouseItem.unitOfMeasure ?? "Unit" },
      { label: "Availability", value: product.stockLabel },
      { label: "Certification", value: "UL / CE / ISO" },
    ],
    features: [
      `Published product from ${store.name}.`,
      "Available through the public marketplace.",
      "Procurement and quotation support available from the sales team.",
    ],
    applications: [
      `${store.name} procurement programmes`,
      "Commercial catalogue ordering",
      "Enterprise sourcing and fulfilment",
    ],
    warranty: [
      "Manufacturer warranty applies where listed.",
      "Marketplace sales support available on request.",
      "Shipping and procurement terms follow the store catalogue.",
    ],
    resources: [
      {
        title: "Installation Manual",
        description: "Step-by-step mounting and commissioning guide.",
        actionLabel: "Download PDF",
        icon: "manual",
      },
      {
        title: "Compliance Certificates",
        description: "UL, CE, and ISO regulatory documents.",
        actionLabel: "Download ZIP",
        icon: "certificate",
      },
      {
        title: "CAD Models",
        description: "2D/3D engineering models for facility planning.",
        actionLabel: "Request Access",
        icon: "cad",
      },
    ],
    trustBadges: productTrustBadges,
    specificationSheet: {
      title: "Download Specification Sheet",
      meta: "PDF, engineering blueprint",
    },
  };
}

function buildBackendProductListFallback(
  store: StoreDetailData,
  product: BackendStoreProductDetailResponse["data"],
): ProductDetailData {
  const theme = getStoreThemeBySlug(store.slug);
  const primaryImage = product.coverImageUrl?.trim() || store.logoSrc || "/assets/store-products/energy-monitor.svg";
  const price = product.priceUSD ?? product.priceNGN ?? null;

  return {
    slug: product.id,
    name: product.warehouseItem.name,
    category: product.category?.name ?? theme.category,
    description: `${product.warehouseItem.name} from ${store.name} is available through the public catalogue.`,
    price,
    image: primaryImage,
    imageAlt: `${product.warehouseItem.name} product illustration`,
    href: `/stores/${store.slug}/products/${product.id}`,
    sku: product.warehouseItem.sku ?? `${store.slug.slice(0, 3).toUpperCase()}-${product.id.slice(0, 6).toUpperCase()}`,
    status: product.stockLabel === "RFQ Only" ? "RFQ Only" : "In Stock",
    badge: product.stockLabel === "RFQ Only" ? "Quote" : "New",
    unitLabel: " / unit (Excl. Tax)",
    gallery: [primaryImage],
    technicalSummary: [
      { label: "Category", value: product.category?.name ?? theme.category },
      { label: "Store", value: store.name },
      { label: "Procurement", value: product.stockLabel },
      { label: "Support", value: "Technical Ready" },
    ],
    specifications: [
      { label: "SKU", value: product.warehouseItem.sku ?? product.id },
      { label: "Unit of Measure", value: product.warehouseItem.unitOfMeasure ?? "Unit" },
      { label: "Availability", value: product.stockLabel },
      { label: "Certification", value: "UL / CE / ISO" },
    ],
    features: [
      `Published product from ${store.name}.`,
      "Available through the public marketplace.",
      "Procurement and quotation support available from the sales team.",
    ],
    applications: [
      `${store.name} procurement programmes`,
      "Commercial catalogue ordering",
      "Enterprise sourcing and fulfilment",
    ],
    warranty: [
      "Manufacturer warranty applies where listed.",
      "Marketplace sales support available on request.",
      "Shipping and procurement terms follow the store catalogue.",
    ],
    resources: [
      {
        title: "Installation Manual",
        description: "Step-by-step mounting and commissioning guide.",
        actionLabel: "Download PDF",
        icon: "manual",
      },
      {
        title: "Compliance Certificates",
        description: "UL, CE, and ISO regulatory documents.",
        actionLabel: "Download ZIP",
        icon: "certificate",
      },
      {
        title: "CAD Models",
        description: "2D/3D engineering models for facility planning.",
        actionLabel: "Request Access",
        icon: "cad",
      },
    ],
    trustBadges: productTrustBadges,
    specificationSheet: {
      title: "Download Specification Sheet",
      meta: "PDF, engineering blueprint",
    },
  };
}

function buildResolvedStoreFromBackend(
  backendStore: BackendStoreDetailResponse["data"],
  theme: ReturnType<typeof getStoreThemeBySlug>,
  fallbackStore?: StoreDetailData,
): StoreDetailData {
  return {
    slug: backendStore.slug,
    name: backendStore.name,
    category: theme.category,
    description:
      backendStore.briefDescription?.trim() || fallbackStore?.description || `${backendStore.name} public catalogue.`,
    heroDescription:
      backendStore.briefDescription?.trim() || fallbackStore?.heroDescription || `${backendStore.name} is now live in the marketplace.`,
    tags: (backendStore.productHighlights?.filter(Boolean) ?? fallbackStore?.tags ?? []).slice(0, 3),
    href: `/stores/${backendStore.slug}`,
    accentClassName: theme.accentClassName,
    accentTextClassName: theme.accentTextClassName,
    heroClassName: theme.heroClassName,
    icon: theme.icon,
    logoSrc: backendStore.logoUrl?.trim() || fallbackStore?.logoSrc,
    logoAlt: `${backendStore.name} logo`,
    searchPlaceholder: `Search ${backendStore.name} products...`,
    categories: fallbackStore?.categories?.length ? fallbackStore.categories : ["General Catalogue"],
    availability: fallbackStore?.availability ?? ["In Stock", "RFQ Only", "Pre-order"],
    segments: fallbackStore?.segments ?? ["All Segments", "Industrial", "Commercial", "Enterprise"],
    products: [],
    trustBadges: productTrustBadges,
    ctaTitle: `Need ${backendStore.name} assistance?`,
    ctaDescription:
      backendStore.briefDescription?.trim() ||
      fallbackStore?.ctaDescription ||
      `Talk to our sales team for help with ${backendStore.name}.`,
  };
}

const rx9000IndustrialInverter: ProductDetailData = {
  slug: "rx-9000-smart-industrial-inverter",
  name: "RX-9000 Smart Industrial Inverter",
  category: "Commercial Infrastructure",
  description:
    "High-efficiency, cloud-connected power conversion system designed for demanding industrial environments. Features advanced telemetry and ruggedized casing.",
  price: 4250,
  image: "/assets/store-products/energy-inverter.svg",
  imageAlt: "RX-9000 smart industrial inverter product illustration",
  sku: "RX-9000-IND",
  status: "In Stock",
  badge: "New",
  unitLabel: "/ unit (Excl. Tax)",
  gallery: [
    "/assets/store-products/energy-inverter.svg",
    "/assets/store-products/energy-distribution-unit.svg",
    "/assets/store-products/energy-meter.svg",
    "/assets/store-products/energy-monitor.svg",
  ],
  technicalSummary: [
    { label: "Voltage Rating", value: "480V 3-Phase" },
    { label: "Monitoring", value: "IoT Cloud Ready" },
    { label: "Efficiency", value: "98.5% Peak" },
    { label: "Certification", value: "UL / CE / ISO" },
  ],
  specifications: [
    { label: "Model Number", value: "RX-9000-IND-V2" },
    { label: "Power Rating", value: "90kW Continuous" },
    { label: "Input Voltage", value: "380V - 480V 3-Phase" },
    { label: "Output Frequency", value: "50/60Hz Auto-Sensing" },
    { label: "Operating Temperature", value: "-20C to 60C" },
    { label: "Connectivity", value: "Ethernet, LTE, Modbus TCP" },
  ],
  features: [
    "Real-time predictive maintenance alerts via cloud portal.",
    "Seamless integration with existing SCADA systems.",
    "Military-grade conformal coating on internal PCBs.",
  ],
  applications: [
    "Manufacturing power conversion",
    "Utility-grade facility energy management",
    "Commercial infrastructure backup systems",
  ],
  warranty: [
    "36-month limited equipment warranty.",
    "Remote commissioning support included.",
    "Extended service contracts available for enterprise deployments.",
  ],
  resources: [
    {
      title: "Installation Manual",
      description: "Step-by-step wiring and mounting guide.",
      actionLabel: "Download PDF",
      icon: "manual",
    },
    {
      title: "Compliance Certificates",
      description: "UL, CE, and ISO regulatory documents.",
      actionLabel: "Download ZIP",
      icon: "certificate",
    },
    {
      title: "CAD Models",
      description: "2D/3D engineering models for facility planning.",
      actionLabel: "Request Access",
      icon: "cad",
    },
  ],
  trustBadges: productTrustBadges,
  specificationSheet: {
    title: "Download Specification Sheet",
    meta: "PDF, 2.4 MB • Engineering Blueprint",
  },
};

export function getProductsForStaticParams() {
  return stores.flatMap((store) =>
    store.products.map((product) => ({
      slug: store.slug,
      productSlug: product.slug,
    })),
  );
}

export async function getProductDetailBySlug(storeSlug: string, productSlug: string) {
  const store = getStoreBySlug(storeSlug);
  const storeTheme = getStoreThemeBySlug(storeSlug);

  if (!store) {
    const backendStore = await getBackendStoreDetail(storeSlug);

    if (!backendStore) {
      return undefined;
    }

    const resolvedStore = buildResolvedStoreFromBackend(backendStore, storeTheme);

    const backendProduct = await getBackendProductDetail(storeSlug, productSlug);

    if (!backendProduct) {
      const backendProducts = await getBackendStoreProducts(storeSlug);
      const backendListProduct = backendProducts.find((item) => item.id === productSlug);

      if (!backendListProduct) {
        return undefined;
      }

      return {
        store: resolvedStore,
        product: buildBackendProductListFallback(resolvedStore, backendListProduct),
      };
    }

    return {
      store: resolvedStore,
      product: buildBackendProductDetail(resolvedStore, backendProduct),
    };
  }

  if (store.slug === "rokswood-energy" && productSlug === rx9000IndustrialInverter.slug) {
    return {
      store,
      product: rx9000IndustrialInverter,
    };
  }

  const product = store.products.find((item) => item.slug === productSlug);

  if (!product) {
    const backendStore = await getBackendStoreDetail(storeSlug);

    if (!backendStore) {
      return undefined;
    }

    const resolvedStore = buildResolvedStoreFromBackend(backendStore, storeTheme, store);

    const backendProduct = await getBackendProductDetail(storeSlug, productSlug);

    if (!backendProduct) {
      const backendProducts = await getBackendStoreProducts(storeSlug);
      const backendListProduct = backendProducts.find((item) => item.id === productSlug);

      if (!backendListProduct) {
        return undefined;
      }

      return {
        store: resolvedStore,
        product: buildBackendProductListFallback(resolvedStore, backendListProduct),
      };
    }

    return {
      store: resolvedStore,
      product: buildBackendProductDetail(resolvedStore, backendProduct),
    };
  }

  return {
    store,
    product: buildDefaultProductDetail(product, store),
  };
}
