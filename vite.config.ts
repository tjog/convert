import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteStaticCopy({
    targets: [
      // Cloudflare Pages configuration for cross-origin isolation
      { src: "_headers", dest: "" },
      // Self hosted ffmpeg.wasm blobs
      // { src: "node_modules/@ffmpeg/ffmpeg/dist/ffmpeg-core.js", dest: "ffmpeg-core.js" },
      // { src: "node_modules/@ffmpeg/ffmpeg/dist/ffmpeg-core.wasm", dest: "ffmpeg-core.wasm" },
    ],

  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "@ffmpeg/util"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
})
