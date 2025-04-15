import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    colors: {
        'pink-app-bg': '#ffc1c9',
        'pink-form-bg': '#ffe1df',
        'salmon-form-border': '#d79d99',
        'salmon-form-border-selected': '#da8a6c',
        'cream-input-bg': '#fce2d0',
        'black-font-color': '#070707',
        'lightblack-font-color': '#242424'

    }
})