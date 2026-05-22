import type { Metadata } from "next";

import TrackOrderPage from "@/components/track-order/track-order-page";

export const metadata: Metadata = {
  title: "Track Order | Rokswood Marketplace",
  description: "Look up shipment progress and support details for your procurement order.",
};

export default function TrackOrderRoute() {
  return <TrackOrderPage />;
}