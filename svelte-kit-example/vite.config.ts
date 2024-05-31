import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['graphql', '@neo4j/graphql-ogm']
	},
	build: {
		rollupOptions: {
			external: ['graphql', '@neo4j/graphql-ogm']
		}
	}
});
