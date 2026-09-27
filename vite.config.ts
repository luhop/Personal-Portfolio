import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  // Relative Asset-Pfade: dieselbe Build-Ausgabe funktioniert auf dem
  // GitHub-Pages-Subpfad (luhop.github.io/Personal-Portfolio/) UND spaeter
  // auf einer Custom-Domain am Root, ohne Umkonfiguration. Moeglich, weil
  // das Routing Hash-basiert ist (kein Server-seitiges Deep-Routing).
  base: './',
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'figma:asset/f815fd85ce6178161b3fe43d375b21d5e71cc30d.png': path.resolve(__dirname, './src/assets/f815fd85ce6178161b3fe43d375b21d5e71cc30d.png'),
      'figma:asset/cb2a452d54f2969d9512e8eabdac208ca12c8b83.png': path.resolve(__dirname, './src/assets/cb2a452d54f2969d9512e8eabdac208ca12c8b83.png'),
      'figma:asset/940e9511500ad0a79fffaeca98af6fde99205965.png': path.resolve(__dirname, './src/assets/940e9511500ad0a79fffaeca98af6fde99205965.png'),
      'figma:asset/902f7ad3dca723434e8d5ae02d061f7bfc150444.png': path.resolve(__dirname, './src/assets/902f7ad3dca723434e8d5ae02d061f7bfc150444.png'),
      'figma:asset/6061b1f178724ac64587ed94a04ecbf9f5a6b9ef.png': path.resolve(__dirname, './src/assets/6061b1f178724ac64587ed94a04ecbf9f5a6b9ef.png'),
      'figma:asset/14bd1f241b4c8b23d02c01b8beaa1f5425b38385.png': path.resolve(__dirname, './src/assets/14bd1f241b4c8b23d02c01b8beaa1f5425b38385.png'),
      'figma:asset/0b5ba37447bb60a45c47a208eb215e137c3a7649.png': path.resolve(__dirname, './src/assets/0b5ba37447bb60a45c47a208eb215e137c3a7649.png'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ['gsap', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
