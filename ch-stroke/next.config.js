/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use standalone output for better serverless function support
  output: 'standalone',
  // Disable static optimization for dynamic routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
