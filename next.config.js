/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static optimization for dynamic routes
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig