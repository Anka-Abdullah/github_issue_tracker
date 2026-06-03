import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.100.31'], /* NOSONAR */
  async rewrites() {
    return []; 
  },
};

export default nextConfig;