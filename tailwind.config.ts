import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'coffee-bg-primary': '#2D1810',
                'coffee-bg-secondary': '#3D2820',
                'coffee-border': '#5A4034',
                'coffee-text-primary': '#F5E6D3',
                'coffee-text-secondary': '#C9B8A0',
                'coffee-accent': '#4F9C8F',
                'coffee-gold': '#FFD700',
                'espresso-dark': '#1A0F0A',
                'coffee-cream': '#D4A574',
            },
            fontFamily: {
                playfair: ['var(--font-playfair)', 'serif'],
                inter: ['var(--font-inter)', 'sans-serif'],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(79, 156, 143, 0.2)' },
                    '100%': { boxShadow: '0 0 20px rgba(79, 156, 143, 0.6)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
