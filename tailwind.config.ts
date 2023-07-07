import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // default 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Josefin Sans', ...defaultTheme.fontFamily.sans],
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        'fade-out': {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        'slide-in-left': {
          '0%': {
            '-webkit-transform': 'translateX(-25px)',
            transform: 'translateX(-25px)',
            opacity: '0',
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-in-right': {
          '0%': {
            '-webkit-transform': 'translateX(25px)',
            transform: 'translateX(25px)',
            opacity: '0',
          },
          '100%': {
            '-webkit-transform': 'translateX(0)',
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-in-top': {
          '0%': {
            '-webkit-transform': 'translateY(-25px)',
            transform: 'translateY(-25px)',
            opacity: '0',
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-in-bottom': {
          '0%': {
            '-webkit-transform': 'translateY(25px)',
            transform: 'translateY(25px)',
            opacity: '0',
          },
          '100%': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'swipe-right': {
          '0%': {
            '-webkit-transform': 'translateX(var(--kb-toast-swipe-end-x))',
            transform: 'translateX(var(--kb-toast-swipe-end-x))',
          },
          '100%': {
            '-webkit-transform': 'translateX(var(--kb-toast-swipe-end-x))',
            transform: 'translateX(var(--kb-toast-swipe-end-x))',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in both',
        'fade-out': 'fade-out 0.5s ease-out both',
        'slide-in-left': 'slide-in-left 0.5s ease-in both',
        'slide-in-right': 'slide-in-right 0.5s ease-in both',
        'slide-in-top': 'slide-in-top 0.5s ease-in both',
        'slide-in-bottom': 'slide-in-bottom 0.5s ease-in both',
        'swipe-right': 'swipe-right 0.5s ease-out both',
      },
    },
  },
  plugins: [typography, forms, daisyui],
  daisyui: {
    logs: false,
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
} satisfies Config;
