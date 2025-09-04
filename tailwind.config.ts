import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Golf Color Palette
        golf: {
          green: {
            50: '#f0f9f4',
            100: '#dcf2e3',
            200: '#bce5ca',
            300: '#8dd1a7',
            400: '#57b67d',
            500: '#339b5c',
            600: '#267d47',
            700: '#1f633a',
            800: '#1b4f30',
            900: '#004225', // Deep Green - Primary
          },
          gold: {
            50: '#fefdf8',
            100: '#fdf9e7',
            200: '#fbf2c4',
            300: '#f7e896',
            400: '#f1d956',
            500: '#C9A646', // Gold - Accent
            600: '#b8941f',
            700: '#997a1a',
            800: '#7d621b',
            900: '#69511c',
          },
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'golf-ball-roll': 'roll 2s ease-in-out infinite',
        'swing': 'swing 1.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'parallax': 'parallax 20s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        roll: {
          '0%': { transform: 'translateX(0) rotate(0deg)' },
          '100%': { transform: 'translateX(20px) rotate(360deg)' },
        },
        swing: {
          '0%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(-15deg)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        parallax: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-golf': 'linear-gradient(135deg, #004225 0%, #267d47 50%, #339b5c 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C9A646 0%, #f1d956 100%)',
        'hero-pattern': "url('/golf-pattern.svg')",
      },
      boxShadow: {
        'golf': '0 10px 40px rgba(0, 66, 37, 0.1)',
        'gold': '0 10px 40px rgba(201, 166, 70, 0.2)',
        'premium': '0 25px 50px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
};
export default config;
