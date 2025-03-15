/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Add your theme extensions here if you have any
    },
  },
  plugins: [],
  mode: 'jit', // Optional since it’s default in v3+, but fine to keep
  safelist: [
    { pattern: /^bg-/ }, // Fixed regex syntax
    { pattern: /^text-/ },
  ],
};