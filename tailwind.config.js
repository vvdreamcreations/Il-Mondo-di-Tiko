/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}", // Matches root files like App.tsx, index.tsx
    ],
    theme: {
        extend: {
            colors: {
                'tiko-cream': '#FFFDD0',
                'tiko-yellow': '#FACC15',
                'tiko-orange': '#FDBA74',
                'tiko-blue': '#7DD3FC',
                'tiko-green': '#10B981',
                'tiko-dark': '#1F2937',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                display: ['Quicksand', 'sans-serif'],
            },
            animation: {
                'gradient': 'gradient 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
        },
    },
    plugins: [],
}
