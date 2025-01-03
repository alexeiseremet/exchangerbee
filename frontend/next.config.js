const withPlugins = require('next-compose-plugins');
const withOffline = require('next-offline');
const optimizedImages = require('next-optimized-images');
const sass = require('@zeit/next-sass');

const nextConfig = withOffline({
  workboxOpts: {
    exclude: [/admin/],
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkOnly',
      },
    ],
  },
  useFileSystemPublicRoutes: false,
  trailingSlash: false,
  webpack: (config) => {
    // Unshift polyfills in main entrypoint.
    const {
      entry: originalEntry,
    } = config;

    const newEntry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    };

    return {
      ...config,
      entry: newEntry,
    };
  },
});

module.exports = withPlugins(
  [
    [sass, {
      sassLoaderOptions: {
        includePaths: [
          './assets/scss',
          './node_modules',
        ],
      },
    }],
    [optimizedImages, {
      imagesFolder: './assets/images',
    }],
  ],
  nextConfig,
);
