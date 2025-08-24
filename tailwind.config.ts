import { heroui } from '@heroui/react';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out',
        wave: 'wave 10s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wave: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 200%' },
        },
      },
      fontFamily: {
        Montserrat: ['Montserrat'],
      },
      colors: {
        primary: '#FFFFFF',
        secondary: '#A0E7E5',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666666',
        'background-primary': '#FFFFFF',
        'background-secondary': '#F8F9FA',
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: '#000',
            success: '#00e4d9',
          },
        },
        dark: {
          colors: {
            success: '#00e4d9',
            default: {
              500: '#ffffff',
            },
          },
        },
      },
    }) as any,
  ],
};

export default config;
