import type { HandleFetch } from "@sveltejs/kit";

type RequestMode = "cors" | "navigate" | "no-cors" | "same-origin";
type RequestCredentials = "include" | "omit" | "same-origin";

class RequestFix extends Request {
	get mode(): RequestMode {
		return "cors";
	}

	get credentials(): RequestCredentials {
		return "same-origin";
	}
}

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
	// FIXME: Hack for https://github.com/sveltejs/kit/issues/6739
	const req = new RequestFix(request);
	return fetch(req);
}