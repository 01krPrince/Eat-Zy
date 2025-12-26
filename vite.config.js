import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  // tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans: ['Inter', 'sans-serif'],
    },
  },
}
})
