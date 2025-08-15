/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', '@react-three/fiber'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.krishnanacharya.me',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable static exports if needed for deployment
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig
