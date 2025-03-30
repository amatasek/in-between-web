/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Set production asset prefix to handle GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
  
  // Add trailing slash for better path resolution
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
  
  transpilePackages: ['react-native-web'],
  
  // Disable source maps in production
  productionBrowserSourceMaps: false,
};

export default nextConfig;
