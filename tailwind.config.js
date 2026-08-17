/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        fintech: {
          dark: '#090d16',
          card: '#0f172a',
          emerald: '#10b981',
          cyan: '#06b6d4',
          amber: '#f59e0b',
          indigo: '#6366f1',
          purple: '#8b5cf6'
        }
      }
    },
  },
  plugins: [],
}
