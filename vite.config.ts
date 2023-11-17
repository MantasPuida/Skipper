import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				index: "index.html",
				"service-worker": "src/background/service-worker.ts"
			},
			output: {
				entryFileNames: "[name].js"
			}
		}
	}
});
