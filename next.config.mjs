/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is the important part:
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
