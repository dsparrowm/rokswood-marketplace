import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blobs.rokswood.com",
        pathname: "/nestapp-public/**",
      },
    ],
  },
};

export default nextConfig;
