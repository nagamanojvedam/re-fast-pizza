import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracing: true,

  // The critical part: correct App Router tracing
  outputFileTracingIncludes: {
    // App Route Handlers
    "/app/**/route": ["./node_modules/.prisma/client/**/*"],

    // Server Components & Actions
    "/app/**": ["./node_modules/.prisma/client/**/*"],

    // Legacy pages router APIs (if used)
    "/pages/api/**": ["./node_modules/.prisma/client/**/*"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dclaevazetcjjkrzczpc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
