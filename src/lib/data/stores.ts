import { fetchMarketplaceApi } from "@/lib/backend";
import type { StoreCardData, StoreDetailData } from "@/types/store";

export const stores: StoreDetailData[] = [
  {
    slug: "arackteck",
    name: "Arackteck",
    category: "Infrastructure",
    description:
      "Industrial engineering, heavy machinery, gas generators, and PRMS infrastructure systems.",
    heroDescription:
      "Heavy industrial systems, pressure regulation infrastructure, generators, and machinery for demanding enterprise operations.",
    tags: ["Heavy Machinery", "Generators", "PRMS"],
    href: "/stores/arackteck",
    accentClassName: "border-t-[var(--store-arackteck)] text-[var(--store-arackteck)]",
    accentTextClassName: "text-[var(--store-arackteck)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--bg-dark),var(--store-arackteck))]",
    icon: "gears",
    searchPlaceholder: "Search heavy machinery, PRMS systems, generators...",
    categories: ["Gas Generators", "PRMS Infrastructure", "Heavy Machinery"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Oil & Gas", "Manufacturing", "Utilities"],
    products: [
      {
        slug: "gx-900-industrial-generator",
        name: "GX-900 Industrial Generator",
        category: "Power Infrastructure",
        description: "High-output industrial generator system built for critical site backup power.",
        price: 18250,
        image: "/assets/store-products/arackteck-generator.svg",
        imageAlt: "Industrial generator product illustration",
      },
      {
        slug: "prms-regulation-skid",
        name: "PRMS Regulation Skid",
        category: "Gas Infrastructure",
        description: "Prefabricated pressure regulating and metering skid for utility environments.",
        price: null,
        image: "/assets/store-products/arackteck-prms.svg",
        imageAlt: "Pressure regulation skid product illustration",
      },
      {
        slug: "hm-42-hydraulic-power-pack",
        name: "HM-42 Hydraulic Power Pack",
        category: "Heavy Machinery",
        description: "Compact hydraulic power unit for fabrication, lifting, and field equipment.",
        price: 6420,
        image: "/assets/store-products/arackteck-hydraulic.svg",
        imageAlt: "Hydraulic power pack product illustration",
      },
    ],
    trustBadges: [
      { title: "Certified Systems", description: "Industrial compliance ready", icon: "certified" },
      { title: "Factory Built", description: "Engineered assemblies", icon: "factory" },
      { title: "Nationwide Delivery", description: "Heavy freight network", icon: "delivery" },
      { title: "Technical Support", description: "Project engineering help", icon: "support" },
    ],
    ctaTitle: "Need Infrastructure Assistance?",
    ctaDescription:
      "Talk to our infrastructure specialists for help selecting industrial systems and heavy equipment.",
  },
  {
    slug: "rokswood-pulse",
    name: "Rokswood Pulse",
    category: "IoT Tech",
    description:
      "Smart technology, remote monitoring sensors, and real-time IoT devices.",
    heroDescription:
      "Remote monitoring sensors, smart connected devices, and operational IoT tools for real-time industrial visibility.",
    tags: ["Sensors", "IoT Devices", "Monitoring"],
    href: "/stores/rokswood-pulse",
    accentClassName: "border-t-[var(--store-pulse)] text-[var(--store-pulse)]",
    accentTextClassName: "text-[var(--store-pulse)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--bg-dark),var(--store-pulse))]",
    icon: "pulse",
    logoSrc: "/assets/store-logos/Pulse logo.png",
    logoAlt: "Rokswood Pulse logo",
    searchPlaceholder: "Search sensors, trackers, remote monitoring devices...",
    categories: ["Remote Sensors", "IoT Devices", "Monitoring Gateways"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Warehousing", "Utilities", "Field Operations"],
    products: [
      {
        slug: "pulse-sense-240",
        name: "PulseSense 240 Sensor Node",
        category: "Remote Sensors",
        description: "Rugged multi-input sensor node for live asset and facility monitoring.",
        price: 315,
        image: "/assets/store-products/pulse-sensor.svg",
        imageAlt: "Remote sensor node product illustration",
      },
      {
        slug: "edge-link-gateway",
        name: "EdgeLink Monitoring Gateway",
        category: "Monitoring Gateways",
        description: "Industrial gateway for consolidating telemetry from distributed equipment.",
        price: 980,
        image: "/assets/store-products/pulse-gateway.svg",
        imageAlt: "IoT monitoring gateway product illustration",
      },
      {
        slug: "assetbeacon-pro",
        name: "AssetBeacon Pro Tracker",
        category: "IoT Devices",
        description: "Connected asset tracker with location, motion, and environment sensing.",
        price: 145,
        image: "/assets/store-products/pulse-tracker.svg",
        imageAlt: "Connected asset tracker product illustration",
      },
    ],
    trustBadges: [
      { title: "Verified Devices", description: "Field-tested IoT hardware", icon: "certified" },
      { title: "Edge Ready", description: "Built for operations", icon: "factory" },
      { title: "Nationwide Delivery", description: "Secure logistics network", icon: "delivery" },
      { title: "Technical Support", description: "Device onboarding help", icon: "support" },
    ],
    ctaTitle: "Need IoT Deployment Assistance?",
    ctaDescription:
      "Talk to our connected operations specialists for help selecting sensors and monitoring devices.",
  },
  {
    slug: "metals-extras",
    name: "Metals Extras",
    category: "Fabrication",
    description:
      "Luxury industrial metallic engineering, prefabricated components, and Oil & Gas infrastructure.",
    heroDescription:
      "Precision metallic fabrication, engineered components, and oil and gas assemblies for demanding build programmes.",
    tags: ["Prefab Components", "Oil & Gas", "Metalwork"],
    href: "/stores/metals-extras",
    accentClassName: "border-t-[var(--store-metals)] text-[var(--store-metals)]",
    accentTextClassName: "text-[var(--store-metals)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--bg-dark),var(--store-metals))]",
    icon: "metals",
    logoSrc: "/assets/store-logos/Metal Extras Logo.png",
    logoAlt: "Metals Extras logo",
    searchPlaceholder: "Search metal panels, fabricated parts, oil and gas components...",
    categories: ["Prefabricated Components", "Metal Panels", "Oil & Gas Parts"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Construction", "Oil & Gas", "Industrial Design"],
    products: [
      {
        slug: "alloy-panel-system",
        name: "Alloy Panel System",
        category: "Metal Panels",
        description: "Architectural-grade metallic panel assembly for industrial fit-outs.",
        price: 760,
        image: "/assets/store-products/metals-panel.svg",
        imageAlt: "Metal panel system product illustration",
      },
      {
        slug: "prefab-pipe-rack",
        name: "Prefab Pipe Rack Module",
        category: "Oil & Gas Parts",
        description: "Modular steel rack section prepared for fast field integration.",
        price: null,
        image: "/assets/store-products/metals-rack.svg",
        imageAlt: "Prefabricated pipe rack product illustration",
      },
      {
        slug: "precision-bracket-kit",
        name: "Precision Bracket Kit",
        category: "Prefabricated Components",
        description: "Matched bracket set for industrial support and mounting applications.",
        price: 220,
        image: "/assets/store-products/metals-bracket.svg",
        imageAlt: "Metal bracket kit product illustration",
      },
    ],
    trustBadges: [
      { title: "Certified Materials", description: "Traceable metal standards", icon: "certified" },
      { title: "Fabrication Grade", description: "Shop-ready components", icon: "factory" },
      { title: "Nationwide Delivery", description: "Protected freight handling", icon: "delivery" },
      { title: "Technical Support", description: "Fabrication guidance", icon: "support" },
    ],
    ctaTitle: "Need Fabrication Assistance?",
    ctaDescription:
      "Talk to our metals team for help matching components, finishes, and project specifications.",
  },
  {
    slug: "agrify",
    name: "Agrify",
    category: "Agrotech",
    description:
      "Agrotech Solutions, Processed Agricultural Products Farm Technology",
    heroDescription:
      "Agrotech tools, processed agricultural products, and sustainable farm technology for modern procurement teams.",
    tags: ["Sustainability", "Smart Farming", "Agro Processing"],
    href: "/stores/agrify",
    accentClassName: "border-t-[var(--store-agrify)] text-[var(--store-agrify)]",
    accentTextClassName: "text-[var(--store-agrify)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--bg-dark),var(--store-agrify))]",
    icon: "gears",
    logoSrc: "/assets/store-logos/Agrify logo.png",
    logoAlt: "Agrify logo",
    searchPlaceholder: "Search farm sensors, processing units, sustainable inputs...",
    categories: ["Farm Technology", "Processed Products", "Sustainability"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Commercial Farms", "Food Processing", "Cooperatives"],
    products: [
      {
        slug: "soilgrid-monitor",
        name: "SoilGrid Field Monitor",
        category: "Farm Technology",
        description: "Field-ready monitor for soil moisture, temperature, and farm telemetry.",
        price: 265,
        image: "/assets/store-products/agrify-monitor.svg",
        imageAlt: "Agricultural field monitor product illustration",
      },
      {
        slug: "crop-drying-unit",
        name: "Crop Drying Unit",
        category: "Processed Products",
        description: "Compact post-harvest drying equipment for small industrial processors.",
        price: null,
        image: "/assets/store-products/agrify-dryer.svg",
        imageAlt: "Crop drying unit product illustration",
      },
      {
        slug: "irrigation-control-kit",
        name: "Irrigation Control Kit",
        category: "Sustainability",
        description: "Water-efficient controller kit for scheduled commercial farm irrigation.",
        price: 410,
        image: "/assets/store-products/agrify-irrigation.svg",
        imageAlt: "Irrigation controller product illustration",
      },
    ],
    trustBadges: [
      { title: "Certified Inputs", description: "Procurement-safe products", icon: "certified" },
      { title: "Farm-Grade", description: "Built for field use", icon: "factory" },
      { title: "Nationwide Delivery", description: "Regional farm logistics", icon: "delivery" },
      { title: "Technical Support", description: "Agrotech assistance", icon: "support" },
    ],
    ctaTitle: "Need Agrotech Assistance?",
    ctaDescription:
      "Talk to our agrotech specialists for help choosing farm systems and processing equipment.",
  },
  {
    slug: "rokswood-energy",
    name: "Rokswood Energy",
    category: "IoT Tech",
    description:
      "Energy technology and utility systems. Smart Energy Meters. Energy Monitoring Accessories. Power Management Systems",
    heroDescription:
      "Smart energy technologies, utility monitoring systems, energy meters, and intelligent infrastructure solutions for modern power management.",
    tags: ["Smart Meters", "Monitoring Systems", "Utility Devices", "Power Infrastructure"],
    href: "/stores/rokswood-energy",
    accentClassName: "border-t-[var(--store-energy)] text-[var(--store-energy)]",
    accentTextClassName: "text-[var(--store-pulse)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--accent-primary),var(--store-energy-warm),var(--store-energy-lime))]",
    icon: "energy",
    logoSrc: "/assets/store-logos/Rokswood Energy Logo.png",
    logoAlt: "Rokswood Energy logo",
    searchPlaceholder: "Search smart meters, monitoring devices, utility accessories...",
    categories: ["Smart Energy Meters", "Monitoring Accessories", "Power Devices"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Residential Utilities", "Manufacturing", "Commercial Infrastructure"],
    products: [
      {
        slug: "rx-9000-smart-industrial-inverter",
        name: "RX-9000 Smart Industrial Inverter",
        category: "Commercial Infrastructure",
        description: "High-efficiency, cloud-connected power conversion system for demanding industrial environments.",
        price: 4250,
        image: "/assets/store-products/energy-inverter.svg",
        imageAlt: "RX-9000 smart industrial inverter product illustration",
      },
      {
        slug: "industrial-power-distribution-unit",
        name: "Industrial Power Distribution Unit",
        category: "Manufacturing",
        description: "Heavy-duty power management system designed for high-load manufacturing environments.",
        price: null,
        image: "/assets/store-products/energy-distribution-unit.svg",
        imageAlt: "Industrial power distribution unit product illustration",
      },
      {
        slug: "ecohome-energy-monitor",
        name: "EcoHome Energy Monitor",
        category: "Residential Utilities",
        description: "Compact residential energy tracking display with Wi-Fi connectivity and mobile app integration.",
        price: 125,
        image: "/assets/store-products/energy-monitor.svg",
        imageAlt: "Home energy monitor product illustration",
      },
    ],
    trustBadges: [
      { title: "Certified Equipment", description: "ISO compliant standards", icon: "certified" },
      { title: "Utility-Grade", description: "Built for industrial use", icon: "factory" },
      { title: "Nationwide Delivery", description: "Secure logistics network", icon: "delivery" },
      { title: "Technical Support", description: "24/7 engineering assistance", icon: "support" },
    ],
    ctaTitle: "Need Technical Assistance?",
    ctaDescription:
      "Talk to our energy infrastructure specialists for guidance on selecting the right monitoring and metering solutions for your specific operational requirements.",
  },
  {
    slug: "rokswoodefab",
    name: "RokswoodEfab",
    category: "Fabrication",
    description:
      "Engineering fabrication and structural precision. Prefabricated Steel Components",
    heroDescription:
      "Structural fabrication, prefabricated steel systems, and engineered assemblies for industrial construction.",
    tags: ["Structural Systems", "Industrial Fabrication", "Steel Components"],
    href: "/stores/rokswoodefab",
    accentClassName: "border-t-[var(--store-efab)] text-[var(--store-efab)]",
    accentTextClassName: "text-[var(--store-efab)]",
    heroClassName: "bg-[linear-gradient(to_right,var(--bg-dark),var(--store-efab))]",
    icon: "efab",
    searchPlaceholder: "Search steel components, frames, engineered assemblies...",
    categories: ["Steel Components", "Structural Frames", "Fabricated Assemblies"],
    availability: ["In Stock", "RFQ Only", "Pre-order"],
    segments: ["All Segments", "Construction", "Manufacturing", "Industrial Projects"],
    products: [
      {
        slug: "steel-frame-module",
        name: "Steel Frame Module",
        category: "Structural Frames",
        description: "Prefabricated frame module for repeatable industrial construction bays.",
        price: null,
        image: "/assets/store-products/efab-frame.svg",
        imageAlt: "Steel frame module product illustration",
      },
      {
        slug: "welded-platform-section",
        name: "Welded Platform Section",
        category: "Fabricated Assemblies",
        description: "Shop-welded access platform section with structural connection points.",
        price: 1780,
        image: "/assets/store-products/efab-platform.svg",
        imageAlt: "Welded platform section product illustration",
      },
      {
        slug: "precision-beam-kit",
        name: "Precision Beam Kit",
        category: "Steel Components",
        description: "Matched beam and connector package for rapid assembly workflows.",
        price: 1320,
        image: "/assets/store-products/efab-beam.svg",
        imageAlt: "Precision steel beam kit product illustration",
      },
    ],
    trustBadges: [
      { title: "Certified Steel", description: "Traceable fabrication standards", icon: "certified" },
      { title: "Shop Fabricated", description: "Built for installation", icon: "factory" },
      { title: "Nationwide Delivery", description: "Project freight network", icon: "delivery" },
      { title: "Technical Support", description: "Engineering assistance", icon: "support" },
    ],
    ctaTitle: "Need Structural Assistance?",
    ctaDescription:
      "Talk to our fabrication specialists for help choosing prefabricated steel components and assemblies.",
  },
];

type BackendStoreListItem = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  briefDescription?: string | null;
  productHighlights?: string[] | null;
  countryCodes?: string[] | null;
};

type BackendStoreListResponse = {
  status: boolean;
  message: string;
  data: {
    items: BackendStoreListItem[];
    page: number;
    limit: number;
    total: number;
  };
};

const storeCardDefaults = new Map(stores.map((store) => [store.slug, store]));

function mergeStoreCardData(item: BackendStoreListItem): StoreCardData {
  const defaults = storeCardDefaults.get(item.slug);
  const highlights = item.productHighlights?.filter(Boolean) ?? [];

  return {
    slug: item.slug,
    name: item.name,
    category: defaults?.category ?? "Store",
    description:
      item.briefDescription?.trim() ||
      defaults?.description ||
      "Browse specialised industrial and procurement catalogues.",
    tags: highlights.length > 0 ? highlights : defaults?.tags ?? [],
    href: defaults?.href ?? `/stores/${item.slug}`,
    accentClassName:
      defaults?.accentClassName ?? "border-t-[var(--accent-primary)] text-[var(--accent-primary)]",
    icon: defaults?.icon ?? "gears",
    logoSrc: item.logoUrl?.trim() || defaults?.logoSrc,
    logoAlt: `${item.name} logo`,
  };
}

export function mergeStoreDirectoryCards(items: BackendStoreListItem[]) {
  return items.map((item) => mergeStoreCardData(item));
}

export async function getStoreDirectoryCards() {
  const response = await fetchMarketplaceApi<BackendStoreListResponse>(
    "/public/stores?limit=100&page=1",
    { revalidate: 300 },
  );

  if (!response?.data || !Array.isArray(response.data.items)) {
    return {
      stores: stores.map((store) => ({
        slug: store.slug,
        name: store.name,
        category: store.category,
        description: store.description,
        tags: store.tags,
        href: store.href,
        accentClassName: store.accentClassName,
        icon: store.icon,
        logoSrc: store.logoSrc,
        logoAlt: store.logoAlt,
      })),
      total: stores.length,
    };
  }

  return {
    stores: mergeStoreDirectoryCards(response.data.items),
    total: Number(response.data.total ?? response.data.items.length),
  };
}

export function getStoreBySlug(slug: string) {
  return stores.find((store) => store.slug === slug);
}
