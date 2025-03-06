import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          dark: '#1D4ED8', // blue-700
        },
        background: {
          DEFAULT: '#111827', // gray-900
          dark: '#030712', // gray-950
        },
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true, // Reduces unnecessary hover styles on mobile
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/app/**/*.{js,ts,jsx,tsx}',
      './src/pages/**/*.{js,ts,jsx,tsx}',
      './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [], // Add any classes that might be dynamically created
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;

