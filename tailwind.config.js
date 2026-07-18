/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#05070F',
        darkCard: 'rgba(13, 17, 34, 0.65)',
        darkBorder: 'rgba(255, 255, 255, 0.06)',
        darkBorderGlow: 'rgba(59, 130, 246, 0.15)',
        fifaGold: '#D4AF37',
        fifaRed: '#E10600',
        fifaGreen: '#00B050',
        aiCyan: '#06b6d4',
        aiPurple: '#8b5cf6',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        glow: '0 0 15px rgba(6, 182, 212, 0.15)',
        redGlow: '0 0 15px rgba(225, 6, 0, 0.2)',
        greenGlow: '0 0 15px rgba(0, 176, 80, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-spin': 'glowSpin 4s linear infinite',
      },
      keyframes: {
        glowSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
