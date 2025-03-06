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
        // Add gray and blue color palette
        gray: {
          '50': '#F9FAFB',
          '100': '#F3F4F6',
          '200': '#E5E7EB',
          '300': '#D1D5DB',
          '400': '#9CA3AF',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#374151',
          '800': '#1F2937',
          '900': '#111827',
          '950': '#030712',
        },
        blue: {
          '50': '#EFF6FF',
          '100': '#DBEAFE',
          '200': '#BFDBFE',
          '300': '#93C5FD',
          '400': '#60A5FA',
          '500': '#3B82F6',
          '600': '#2563EB',
          '700': '#1D4ED8',
          '800': '#1E40AF',
          '900': '#1E3A8A',
          '950': '#172554',
        },
        // Add other colors used in your project
        yellow: {
          '400': '#FACC15',
        },
        green: {
          '400': '#4ADE80',
        },
        purple: {
          '400': '#C084FC',
        },
        orange: {
          '400': '#FB923C',
        },
        pink: {
          '400': '#F472B6',
        },
      },
      opacity: {
        '10': '0.1',
        '20': '0.2',
        '50': '0.5',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config;

