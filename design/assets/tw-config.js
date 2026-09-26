// Propritok design tokens → Tailwind config.
// Same object can be merged into tailwind.config.ts `theme.extend` in the Next.js app.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#042C31',
          900: '#063F46', // deep ink-teal (dark sections)
          800: '#0A5C66',
          700: '#0D7E8B', // ACCENT (fixed)
          600: '#109C93', // logo
          500: '#2EB1B0', // logo
          300: '#8FD3CF',
          200: '#BFE6E3',
          100: '#DDF2EF',
          50: '#EEF8F6', // "mist"
        },
        air: '#F7F5F0', // warm off-white page background
        sand: '#EFEBE3', // warm neutral surface
        line: '#E6E2DA', // hairlines on warm bg
        ink: {
          DEFAULT: '#0F1F22',
          2: '#4A5A5D',
          3: '#8A9799',
        },
        sun: {
          100: '#FDF1DC',
          300: '#F6CF8E',
          500: '#E9A23B', // warm secondary: promo, "под заказ"
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Manrope', 'sans-serif'], // optional accent face (bold direction)
      },
      fontSize: {
        // [size, lineHeight, letterSpacing]
        'display-xl': ['96px', { lineHeight: '0.98', letterSpacing: '-0.045em' }],
        display: ['72px', { lineHeight: '1', letterSpacing: '-0.04em' }],
        h1: ['56px', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        h2: ['44px', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        h3: ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h4: ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        body: ['16px', { lineHeight: '1.6' }],
        sm: ['14px', { lineHeight: '1.5' }],
        xs: ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        sm: '10px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(6,63,70,.04), 0 6px 20px -6px rgba(6,63,70,.08)',
        lift: '0 2px 4px rgba(6,63,70,.04), 0 24px 48px -16px rgba(6,63,70,.22)',
        glass: '0 8px 32px -8px rgba(6,63,70,.18), inset 0 1px 0 rgba(255,255,255,.7)',
        glow: '0 10px 30px -8px rgba(13,126,139,.55)',
      },
      maxWidth: { page: '1280px' },
      keyframes: {
        breathe: { '0%,100%': { transform: 'scale(1)', opacity: '.9' }, '50%': { transform: 'scale(1.06)', opacity: '1' } },
        drift: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        flow: { to: { strokeDashoffset: '-600' } },
        spin: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        breathe: 'breathe 7s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
        flow: 'flow 14s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
      },
    },
  },
};
