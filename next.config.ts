import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thirsty-jade-mollusk.myfilebase.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
