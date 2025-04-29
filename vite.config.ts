import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    reporters: [`verbose`],
    environment: "jsdom",
    setupFiles: ["src/setupTests.ts"],
    coverage: {
      reportsDirectory: "./coverage",
      exclude: ["main.tsx", "vite-env.d.ts", "**/types.ts", "vite.config.ts"],
      reporter: ["text", "json", "html"],
      include: ["**/*.ts", "**/*.tsx"],
    },
  },
  plugins: [react()],
});
