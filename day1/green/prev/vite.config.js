import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ 
    plugins: [react()],
    server: {
        port: 3000, // Standardize port for consistent instruction
        open: true, // Auto-open browser on start
    },
});