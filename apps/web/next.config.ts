import "@lofi-study-app/env/web";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // React Compiler is automatically enabled in Next.js 15
  // when babel-plugin-react-compiler is installed
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
