/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'cdn.sanity.io',
      'images.unsplash.com',
      'picsum.photos',
      'i.imgur.com'
    ],
  }
}

module.exports = nextConfig
