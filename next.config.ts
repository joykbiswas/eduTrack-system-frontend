import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      // Add more patterns as needed
      {
        protocol: 'https',
        hostname: '**.cloudinary.com', // For Cloudinary images
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google profile pictures
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // For GitHub avatars
      },
      // Allow local images
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
};

export default nextConfig;