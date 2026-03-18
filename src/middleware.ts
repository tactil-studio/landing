import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(
	async ({ url, request, redirect }, next) => {
		const host = url.hostname.toLowerCase();

		// Solo redirigir en producción (no en localhost ni desarrollo)
		const isLocalhost =
			host === "localhost" ||
			host === "127.0.0.1" ||
			host.startsWith("192.168.") ||
			host.includes("localhost");

		// Salir temprano si es localhost
		if (isLocalhost) {
			console.debug("✅ Es localhost, no redirigiendo");
			return next();
		}

		// Solo en producción: redirigir www y http
		const forwardedProto = request.headers.get("x-forwarded-proto");
		const protocol = (
			forwardedProto ?? url.protocol.replace(":", "")
		).toLowerCase();

		const shouldRedirectToCanonical =
			host === "www.tactilstudio.com" || protocol === "http";

		if (shouldRedirectToCanonical) {
			const targetUrl = new URL(
				`${url.pathname}${url.search}`,
				"https://tactilstudio.com",
			);
			return redirect(targetUrl.toString(), 301);
		}

		return next();
	},
);
