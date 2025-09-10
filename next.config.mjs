/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,

  images: {
    domains: ['images.unsplash.com'],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "ik.imagekit.io" },
      { protocol: "https", hostname: "cwzwdxedgblbbabcbnkj.supabase.co" },
      { protocol: "https", hostname: "jaetravel.com" },
      { protocol: "https", hostname: "jaetravelexpeditions.com" },
      // add others you actually use for images:
      { protocol: "https", hostname: "widgets.bokun.io" },
    ],
  },

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
