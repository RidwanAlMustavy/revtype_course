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
          bg: '#171D19',
          deep: '#121914',
          card: '#242D28',
          hover: '#2C3731',
          border: '#334139',
          'border-light': '#3F5046',
        },
        green: {
          vivid: '#23C530',
          hover: '#38DA45',
          glow: 'rgba(35, 197, 48, 0.25)',
          surface: '#182E20',
          muted: '#1E3B29',
        },
        text: {
          primary: '#F7FAF7',
          muted: '#ADB8B0',
          dim: '#859288',
        },
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '22px',
        'card-sm': '14px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(35, 197, 48, 0.2)',
        'glow-md': '0 0 30px -5px rgba(35, 197, 48, 0.25)',
        'glow-lg': '0 0 50px -10px rgba(35, 197, 48, 0.3)',
        'card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
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
