import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // 2MBに設定
    },
  },
  images: {
    domains: ["jycmhojexklivwptrbbg.supabase.co"],
  },
  // Prismaのバイナリを含める設定
  outputFileTracingIncludes: {
    "/": ["./src/generated/prisma/**/*"],
  },
  // Vercel でのPrisma Query Engine問題を解決
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "@prisma/client": "@prisma/client",
      });
    }
    return config;
  },
};

export default nextConfig;
