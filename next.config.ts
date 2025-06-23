import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://media.guim.co.uk/**')],
  },
};

export default nextConfig;
