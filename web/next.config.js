/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native': 'react-native-web'
    };
    return config;
  },
  transpilePackages: ['react-native-web'],
  output: 'export',
  distDir: 'out',
  // GitHub Pages doesn't support client-side routing by default
  trailingSlash: true
};

module.exports = nextConfig;
