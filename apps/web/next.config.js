/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { 
        protocol: 'http',
        hostname: 'localhost',
      },
      { 
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      { 
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      { 
        protocol: 'https',
        hostname: 'jcwd040802.purwadhikabootcamp.com',
      },
    ],
  },
};

module.exports = nextConfig;
