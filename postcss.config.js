module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Enable experimental features for Tailwind CSS v4
      experimental: {
        // Color opacity utilities
        colorOpacityUtilities: true,
        // All modern utilities
        modernUtilities: true,
      }
    },
    autoprefixer: {},
  },
}
