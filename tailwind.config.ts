import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    colors: {
      inherit: 'inherit',
      white: '#fff',
      black: '#000',
      transparent: 'transparent',

      ...['primary', 'neutral', 'destructive'].reduce(
        (obj, colorName) => ({
          ...obj,
          [colorName]: [
            50,
            ...[...Array(9).keys()].map(key => (key + 1) * 100),
            950,
          ].reduce(
            (obj, shade) => ({
              ...obj,
              [shade]: `rgb(var(--color-${colorName}-${shade}) / <alpha-value>)`,
            }),
            {}
          ),
        }),
        {}
      ),

      border: 'rgb(var(--color-border))',
      input: 'rgb(var(--color-input))',
      ring: 'rgb(var(--color-ring))',
      background: 'rgb(var(--color-background))',
      foreground: 'rgb(var(--color-foreground))',
      primary: {
        DEFAULT: 'rgb(var(--color-primary))',
        foreground: 'rgb(var(--color-primary-foreground))',
      },
      secondary: {
        DEFAULT: 'rgb(var(--color-secondary))',
        foreground: 'rgb(var(--color-secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'rgb(var(--color-destructive))',
        foreground: 'rgb(var(--color-destructive-foreground))',
      },
      muted: {
        DEFAULT: 'rgb(var(--color-muted))',
        foreground: 'rgb(var(--color-muted-foreground))',
      },
      accent: {
        DEFAULT: 'rgb(var(--color-accent))',
        foreground: 'rgb(var(--color-accent-foreground))',
      },
      popover: {
        DEFAULT: 'rgb(var(--color-popover))',
        foreground: 'rgb(var(--color-popover-foreground))',
      },
      card: {
        DEFAULT: 'rgb(var(--color-card))',
        foreground: 'rgb(var(--color-card-foreground))',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-family)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--border-radius)',
        md: 'calc(var(--border-radius) - 2px)',
        sm: 'calc(var(--border-radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
