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
      // Дизайн-система «Воздух»: см. design/system.html
      colors: {
        primary: '#FFFFFF',
        secondary: 'var(--secondary-color)',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666666',
        'background-primary': '#FFFFFF',
        'background-secondary': '#F8F9FA',
        brand: {
          950: '#042C31',
          900: '#063F46',
          800: '#0A5C66',
          700: '#0D7E8B', // акцент
          600: '#109C93', // логотип
          500: '#2EB1B0', // логотип
          300: '#8FD3CF',
          200: '#BFE6E3',
          100: '#DDF2EF',
          50: '#EEF8F6',
        },
        air: '#F7F5F0',
        sand: '#EFEBE3',
        line: '#E6E2DA',
        ink: { DEFAULT: '#0F1F22', 2: '#4A5A5D', 3: '#8A9799' },
        sun: { 100: '#FDF1DC', 300: '#F6CF8E', 500: '#E9A23B', 700: '#A86A12' },
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Manrope: ['Manrope', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['96px', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
        display: ['72px', { lineHeight: '1', letterSpacing: '-0.04em' }],
        h1: ['56px', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        h2: ['44px', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h3: ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h4: ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
      },
      borderRadius: {
        card: '32px',
        block: '40px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,63,70,.04), 0 6px 20px -6px rgba(6,63,70,.08)',
        lift: '0 2px 4px rgba(6,63,70,.04), 0 24px 48px -16px rgba(6,63,70,.22)',
        glass: '0 8px 32px -8px rgba(6,63,70,.18), inset 0 1px 0 rgba(255,255,255,.7)',
        glow: '0 10px 30px -8px rgba(13,126,139,.55)',
      },
      maxWidth: { page: '1280px' },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out',
        wave: 'wave 10s linear infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
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
        breathe: {
          '0%,100%': { transform: 'scale(1)', opacity: '.9' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        drift: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
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
