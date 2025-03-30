/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Configure asset prefix for GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  
  // Configure trailing slash to ensure proper path resolution
  trailingSlash: true,
  
  // Configure images to use unoptimized for static export
  images: {
    unoptimized: true,
  },
  
  // Configure webpack for react-native-web
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web'
    };
    return config;
  },
  
  transpilePackages: ['react-native-web']
};

module.exports = nextConfig;
