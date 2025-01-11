/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  output: "standalone",
  reactStrictMode: false,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    if (process.env.NODE_ENV === "development") {
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }
    return config;
  },
};

module.exports = nextConfig;
