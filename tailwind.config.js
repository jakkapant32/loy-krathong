/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'krathong-blue': '#4A90E2',
        'krathong-purple': '#9B59B6',
        'krathong-dark': '#1A1A2E',
        'krathong-light': '#E8F4F8',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'water-gradient': 'linear-gradient(to bottom, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        sparkle: {
          '0%, 100%': { opacity: 0, transform: 'scale(0)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5, boxShadow: '0 0 20px rgba(154, 90, 226, 0.5)' },
          '50%': { opacity: 1, boxShadow: '0 0 40px rgba(154, 90, 226, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}

