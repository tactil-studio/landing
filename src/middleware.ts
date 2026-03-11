import { defineMiddleware } from "astro:middleware";
import { baseUrl } from "~/lib/constants";

const primaryUrl = new URL(baseUrl);
const wwwHost = `www.${primaryUrl.hostname}`;

export const onRequest = defineMiddleware((context, next) => {
	if (context.url.hostname !== wwwHost) {
		return next();
	}

	const redirectUrl = new URL(context.url.pathname, primaryUrl);
	redirectUrl.search = context.url.search;
	redirectUrl.hash = context.url.hash;

	return context.redirect(redirectUrl.toString(), 301);
});
