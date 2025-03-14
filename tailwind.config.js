/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Keep your theme extensions
    },
  },
  plugins: [],
  // Enable JIT mode for smaller CSS bundles
  mode: 'jit',
  // Purge unused CSS
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    options: {
      safelist: [
        // Add classes that are dynamically created and shouldn't be purged
        /^bg-/,
        /^text-/,
      ],
    },
  },
}
