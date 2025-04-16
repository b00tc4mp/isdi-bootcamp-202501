/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./app/**/*.{js,ts,jsx,tsx}", // Ajusta si tu estructura es diferente
    ],
    theme: {
        extend: {
            colors: {
                periwinkle: '#CCCCFF',
                mauve: '#E0B0FF',
            },
        },
    },
    plugins: [],
}
