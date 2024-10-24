// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { KVNamespace, ExecutionContext } from '@cloudflare/workers-types';
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				RESOURCES_KV: KVNamespace;
			};
			context: ExecutionContext;
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {};
