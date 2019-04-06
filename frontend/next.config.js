const withPlugins = require('next-compose-plugins')
const sass = require('@zeit/next-sass')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  webpack: config => {
    // Unshift polyfills in main entrypoint.
    const {
      entry: originalEntry,
    } = config

    config.entry = async () => {
      const entries = await originalEntry()

      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js')
      }

      return entries
    }

    return config
  },
}

module.exports = withPlugins(
  [
    [sass, {
      sassLoaderOptions: {
        includePaths: [
          './assets/scss',
          './node_modules',
        ]
      }
    }],
    optimizedImages,
  ],
  nextConfig,
)
