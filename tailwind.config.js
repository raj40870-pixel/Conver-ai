/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#09090b',
        card: '#111113',
        'card-elevated': '#18181b',
        border: '#27272a',
        'border-subtle': '#1c1c1f',
        primary: {
          DEFAULT: '#7c3aed',
          50: 'rgba(124,58,237,0.05)',
          100: 'rgba(124,58,237,0.1)',
          200: 'rgba(124,58,237,0.2)',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
        },
        muted: '#3f3f46',
        'muted-foreground': '#71717a',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(124,58,237,0.3)',
        'glow-md': '0 0 24px rgba(124,58,237,0.4)',
        'glow-lg': '0 0 48px rgba(124,58,237,0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'purple-gradient': 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a78bfa 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [],
};