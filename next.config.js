/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  env: {
    REACT_APP_ENV: process.env.REACT_APP_ENV,
    ASSET_PREFIX: process.env.ASSET_PREFIX,
    REACT_APP_FETCH_URL : process.env.REACT_APP_FETCH_URL
  },
  assetPrefix: process.env.ASSET_PREFIX,
  images: {
    loader: 'imgix',
    path: '',
  },
};

module.exports = nextConfig;