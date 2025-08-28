import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 2MBに設定
    },
  },
  images: {
    domains: ['jycmhojexklivwptrbbg.supabase.co'],
  },
};

export default nextConfig;
