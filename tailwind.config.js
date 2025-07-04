/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',
        secondary: '#52B788',
        accent: '#FF6B35',
        surface: '#FFFFFF',
        background: '#F8FFF9',
        success: '#40916C',
        warning: '#F4A261',
        error: '#E63946',
        info: '#457B9D',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'soft': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(82, 183, 136, 0.3)',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}