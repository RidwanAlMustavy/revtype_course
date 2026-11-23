import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#13111C',
          deep: '#0D0B14',
          card: '#1C1829',
          hover: '#262038',
          border: '#2F2844',
          'border-light': '#3E345B',
        },
        green: {
          vivid: '#C084FC',
          hover: '#D8B4FE',
          glow: 'rgba(192, 132, 252, 0.25)',
          surface: '#261C3B',
          muted: '#201633',
        },
        text: {
          primary: '#F5F3FF',
          muted: '#A79EC4',
          dim: '#756C93',
        },
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '22px',
        'card-sm': '14px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(192, 132, 252, 0.25)',
        'glow-md': '0 0 30px -5px rgba(192, 132, 252, 0.3)',
        'glow-lg': '0 0 50px -10px rgba(192, 132, 252, 0.35)',
        'card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
