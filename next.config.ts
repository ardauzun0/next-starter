import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "frontend-example-panel.pentademo.com.tr",
      },
    ],
  },
};

export default nextConfig;
