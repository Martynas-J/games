/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://martynas-game.vercel.app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
