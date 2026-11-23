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
          bg: '#F5F2FA',
          deep: '#ECE5F6',
          card: '#FFFFFF',
          hover: '#F2EDFA',
          border: '#DDD2EF',
          'border-light': '#CFBFE7',
        },
        green: {
          vivid: '#8B5CF6',
          hover: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.25)',
          surface: '#EDE9FE',
          muted: '#DDD6FE',
        },
        text: {
          primary: '#1E1533',
          muted: '#685980',
          dim: '#8E81A6',
        },
      },
      borderRadius: {
        'card': '18px',
        'card-lg': '22px',
        'card-sm': '14px',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(139, 92, 246, 0.2)',
        'glow-md': '0 0 30px -5px rgba(139, 92, 246, 0.25)',
        'glow-lg': '0 0 50px -10px rgba(139, 92, 246, 0.3)',
        'card': '0 4px 20px -2px rgba(139, 92, 246, 0.08), 0 2px 6px -1px rgba(139, 92, 246, 0.04)',
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
