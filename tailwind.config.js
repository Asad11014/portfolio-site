/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // console base
        base: {
          950: '#05070a',
          900: '#0a0e14',
          850: '#0e131b',
          800: '#131a24',
          700: '#1b2430',
          600: '#27323f',
        },
        // operational accents
        emerald: {
          glow: '#34d399',
        },
        accent: {
          DEFAULT: '#34d399', // emerald
          cyan: '#22d3ee',
          amber: '#fbbf24',
          red: '#f87171',
        },
        ink: {
          DEFAULT: '#e6edf3',
          dim: '#9aa7b4',
          faint: '#5b6877',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(52,211,153,0.25), 0 0 24px -4px rgba(52,211,153,0.35)',
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 12px 40px -12px rgba(0,0,0,0.6)',
      },
      keyframes: {
        blink: { '0%,49%': { opacity: '1' }, '50%,100%': { opacity: '0' } },
        ticker: { '0%': { transform: 'translateY(0)' }, '100%': { transform: 'translateY(-50%)' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        scan: 'scan 6s linear infinite',
        pulseDot: 'pulseDot 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
