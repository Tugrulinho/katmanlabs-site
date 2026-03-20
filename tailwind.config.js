/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#103750',
        'primary': '#215080',
        'secondary': '#676fbc',
        'accent': '#cf99fa',
        'accent-light': '#ffd1f4',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #103750 0%, #215080 50%, #676fbc 100%)',
        'gradient-cta': 'linear-gradient(135deg, #215080 0%, #676fbc 100%)',
        'gradient-layer': 'linear-gradient(180deg, #215080 0%, #676fbc 50%, #cf99fa 100%)',
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'scale-up': 'scale-up 0.2s ease-out',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
