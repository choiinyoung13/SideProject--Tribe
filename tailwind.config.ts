import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        'dot-pulse': {
          '0%, 100%': { transform: 'scale(0.8)', opacity: '0.35' },
          '50%': { transform: 'scale(1.25)', opacity: '1' },
        },
        'dot-bounce': {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '40%': { transform: 'translateY(-6px)', opacity: '1' },
        },
        'spin-ease': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-scale': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.5)' },
          '100%': { transform: 'scale(1)' },
        },
        fillUp: {
          '0%': { transform: 'translateY(100%)' },
          '60%': { transform: 'translateY(25%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        waveMove: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(25%)' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 0.9s ease-in-out infinite',
        'dot-bounce': 'dot-bounce 0.9s ease-in-out infinite',
        'spin-ease': 'spin-ease 1s ease-in-out infinite',
        'pulse-scale': 'pulse-scale 1s ease-in-out infinite',
        fillUp: 'fillUp 1.6s ease-in-out infinite',
        waveMove: 'waveMove 1.1s linear infinite',
      },
    },
  },
  // 기존 스타일/레이아웃이 흔들리지 않도록 Tailwind preflight(reset) 비활성화
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}

export default config


