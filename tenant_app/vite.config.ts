import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),
  babel({
    filter: /\.[jt]sx?$/,
    babelConfig: {
      presets: ["@babel/preset-typescript"], // if you use TypeScript
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  })],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7213',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
