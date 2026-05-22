export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  tag?: string;
  image: string;
};

export type StoreConfig = {
  slug: "aracktech" | "pulse" | "metal-extras" | "agrify";
  name: string;
  badge: string;
  title: string;
  italic: string;
  tagline: string;
  description: string;
  hero: string;
  logo: string;
  accent: string;
  categories: string[];
  products: Product[];
};

const aracktechImg = "/assets/store-energy.jpg";
const pulseImg = "/assets/store-pulse.jpg";
const metalExtrasImg = "/assets/store-efab.jpg";
const agrifyImg = "/assets/hero-bg.jpg";

const aracktechLogo = "/assets/logos/Aracktech%20logo.png";
const pulseLogo = "/assets/logos/Pulse%20logo.png";
const metalExtrasLogo = "/assets/logos/Metal%20Extras%20Logo.png";
const agrifyLogo = "/assets/logos/Agrify%20logo.png";

export const stores: Record<string, StoreConfig> = {
  aracktech: {
    slug: "aracktech",
    name: "Aracktech",
    badge: "Store 01 · Utility & Metering",
    title: "Power,",
    italic: "measured.",
    tagline: "Smart metering & utility hardware",
    description:
      "Precision-built electricity, water and gas meters. Boxes, recharge units and accessories engineered for utilities at scale.",
    hero: aracktechImg,
    logo: aracktechLogo,
    accent: "from-sky-500/30 via-primary/10 to-transparent",
    categories: ["All", "Smart Meters", "Meter Boxes", "Recharge Units", "Accessories"],
    products: [
      { id: "a1", name: "Pulse-E Smart Electricity Meter", category: "Smart Meters", price: "₦82,500", tag: "Best seller", image: aracktechImg },
      { id: "a2", name: "Aquaflow Smart Water Meter", category: "Smart Meters", price: "₦68,000", image: aracktechImg },
      { id: "a3", name: "Vapor Smart Gas Meter", category: "Smart Meters", price: "₦94,200", tag: "New", image: aracktechImg },
      { id: "a4", name: "ArmorBox Outdoor Meter Enclosure", category: "Meter Boxes", price: "₦24,500", image: aracktechImg },
      { id: "a5", name: "ArmorBox Triple-Phase Cabinet", category: "Meter Boxes", price: "₦58,000", image: aracktechImg },
      { id: "a6", name: "TopUp Vending Recharge Unit", category: "Recharge Units", price: "₦41,000", image: aracktechImg },
      { id: "a7", name: "TopUp POS Recharge Terminal", category: "Recharge Units", price: "₦135,000", tag: "Pro", image: aracktechImg },
      { id: "a8", name: "Sealing Kit & Tamper Tags", category: "Accessories", price: "₦4,800", image: aracktechImg },
      { id: "a9", name: "Utility Control Relay Module", category: "Accessories", price: "₦18,200", image: aracktechImg },
    ],
  },
  pulse: {
    slug: "pulse",
    name: "Pulse",
    badge: "Store 02 · Industrial IoT",
    title: "Every signal,",
    italic: "listened to.",
    tagline: "Remote monitoring & smart sensing",
    description:
      "Industrial-grade sensors, gateways and alarm modules. From tank levels to leak detection, built for plants that never sleep.",
    hero: pulseImg,
    logo: pulseLogo,
    accent: "from-primary/35 via-primary/15 to-transparent",
    categories: ["All", "Sensors", "Gateways", "Alarms", "Surveillance"],
    products: [
      { id: "p1", name: "TankSense Level Monitor", category: "Sensors", price: "₦128,000", tag: "Flagship", image: pulseImg },
      { id: "p2", name: "FlowPulse Inline Flow Meter", category: "Sensors", price: "₦96,500", image: pulseImg },
      { id: "p3", name: "PressIQ Industrial Pressure Sensor", category: "Sensors", price: "₦74,200", image: pulseImg },
      { id: "p4", name: "LeakHunter Acoustic Detector", category: "Sensors", price: "₦142,000", tag: "New", image: pulseImg },
      { id: "p5", name: "Bridge-X LoRaWAN Gateway", category: "Gateways", price: "₦212,000", image: pulseImg },
      { id: "p6", name: "Bridge-X 4G/5G Industrial Router", category: "Gateways", price: "₦288,000", tag: "Pro", image: pulseImg },
      { id: "p7", name: "Siren-Smart Multi-Channel Alarm", category: "Alarms", price: "₦58,000", image: pulseImg },
      { id: "p8", name: "VisionLink IP Camera Add-on", category: "Surveillance", price: "₦164,000", image: pulseImg },
      { id: "p9", name: "VisionLink PTZ Site Camera", category: "Surveillance", price: "₦322,000", tag: "Best seller", image: pulseImg },
    ],
  },
  "metal-extras": {
    slug: "metal-extras",
    name: "Metal Extras",
    badge: "Store 03 · Prefabricated Engineering",
    title: "Structures,",
    italic: "fabricated.",
    tagline: "Modular fabrication & construction",
    description:
      "Prefabricated buildings, modular components and oil and gas fabrications, delivered ready and engineered to spec.",
    hero: metalExtrasImg,
    logo: metalExtrasLogo,
    accent: "from-amber-500/25 via-primary/10 to-transparent",
    categories: ["All", "Prefab Homes", "Steel Units", "Modular Parts", "Oil & Gas"],
    products: [
      { id: "m1", name: "ModHaus Studio Cabin 24m²", category: "Prefab Homes", price: "$18,400", tag: "Best seller", image: metalExtrasImg },
      { id: "m2", name: "ModHaus Family Unit 64m²", category: "Prefab Homes", price: "$42,000", image: metalExtrasImg },
      { id: "m3", name: "ModHaus Site Office Pod", category: "Prefab Homes", price: "$12,900", image: metalExtrasImg },
      { id: "m4", name: "Metal Extras Structural I-Beam Pack", category: "Steel Units", price: "$3,250", image: metalExtrasImg },
      { id: "m5", name: "Metal Extras Roof Truss Kit", category: "Steel Units", price: "$5,400", tag: "New", image: metalExtrasImg },
      { id: "m6", name: "Modular Wall Panel System", category: "Modular Parts", price: "$1,180", image: metalExtrasImg },
      { id: "m7", name: "Insulated Floor Cassette", category: "Modular Parts", price: "$960", image: metalExtrasImg },
      { id: "m8", name: "Skid-Mounted Manifold Unit", category: "Oil & Gas", price: "$28,500", tag: "Pro", image: metalExtrasImg },
      { id: "m9", name: "Pipe Spool & Flange Assembly", category: "Oil & Gas", price: "$6,400", image: metalExtrasImg },
    ],
  },
  agrify: {
    slug: "agrify",
    name: "Agrify",
    badge: "Store 04 · Smart Agriculture",
    title: "Growth,",
    italic: "cultivated.",
    tagline: "Agriculture hardware & farm intelligence",
    description:
      "Irrigation controls, farm sensors, greenhouse systems and field-ready tools for modern agricultural operations.",
    hero: agrifyImg,
    logo: agrifyLogo,
    accent: "from-emerald-500/25 via-primary/10 to-transparent",
    categories: ["All", "Irrigation", "Farm Sensors", "Greenhouse", "Field Tools"],
    products: [
      { id: "g1", name: "AquaRoot Smart Irrigation Controller", category: "Irrigation", price: "₦118,000", tag: "New", image: agrifyImg },
      { id: "g2", name: "DripLine Precision Valve Kit", category: "Irrigation", price: "₦42,500", image: agrifyImg },
      { id: "g3", name: "SoilSense Moisture Probe", category: "Farm Sensors", price: "₦36,000", tag: "Best seller", image: agrifyImg },
      { id: "g4", name: "CropWatch Field Weather Node", category: "Farm Sensors", price: "₦164,000", image: agrifyImg },
      { id: "g5", name: "GreenHub Climate Controller", category: "Greenhouse", price: "₦226,000", tag: "Pro", image: agrifyImg },
      { id: "g6", name: "NurseryGrow LED Rail Pack", category: "Greenhouse", price: "₦88,500", image: agrifyImg },
      { id: "g7", name: "FieldPack Solar Pump Kit", category: "Field Tools", price: "₦312,000", image: agrifyImg },
      { id: "g8", name: "HarvestCrate Modular Storage Set", category: "Field Tools", price: "₦54,000", image: agrifyImg },
    ],
  },
};

export const storeList = Object.values(stores);
