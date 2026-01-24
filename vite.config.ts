import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), netlify()],
});
