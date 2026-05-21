import { getStoreBySlug, stores } from "@/lib/data/stores";
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

export function getProductDetailBySlug(storeSlug: string, productSlug: string) {
  const store = getStoreBySlug(storeSlug);

  if (!store) {
    return undefined;
  }

  if (store.slug === "rokswood-energy" && productSlug === rx9000IndustrialInverter.slug) {
    return {
      store,
      product: rx9000IndustrialInverter,
    };
  }

  const product = store.products.find((item) => item.slug === productSlug);

  if (!product) {
    return undefined;
  }

  return {
    store,
    product: buildDefaultProductDetail(product, store),
  };
}
