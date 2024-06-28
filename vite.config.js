import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	server: {
		port: 3000,
		host: '0.0.0.0',
	},
	build: {
		outDir: 'build',
	},
  plugins: [
    react()
  ],
});
