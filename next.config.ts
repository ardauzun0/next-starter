import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "frontend-example-panel.pentademo.com.tr",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:locale(tr|en)/urunler",
        destination: "/:locale/products",
      },
      {
        source: "/:locale(tr|en)/urunler/ara",
        destination: "/:locale/products/search",
      },
      {
        source: "/:locale(tr|en)/urunler/kategoriler",
        destination: "/:locale/products/categories",
      },
      {
        source: "/:locale(tr|en)/urunler/kategori/:slug*",
        destination: "/:locale/products/category/:slug*",
      },
      {
        source: "/:locale(tr|en)/urunler/detay/:slug*",
        destination: "/:locale/products/detail/:slug*",
      },
      {
        source: "/:locale(tr|en)/kullanim-alanlari",
        destination: "/:locale/usage",
      },
      {
        source: "/:locale(tr|en)/kullanim-alanlari/:slug*",
        destination: "/:locale/usage/:slug*",
      },
      {
        source: "/:locale(tr|en)/blog/ara",
        destination: "/:locale/blog/search",
      },
      {
        source: "/:locale(tr|en)/blog/kategoriler",
        destination: "/:locale/blog/categories",
      },
      {
        source: "/:locale(tr|en)/blog/kategori/:slug*",
        destination: "/:locale/blog/category/:slug*",
      },
    ];
  },
};

export default nextConfig;
