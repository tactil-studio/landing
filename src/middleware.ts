import { defineMiddleware } from "astro:middleware";
import { baseUrl } from "~/lib/constants";

const primaryUrl = new URL(baseUrl);
const wwwHost = `www.${primaryUrl.hostname}`;

const supportedLocales = ["en", "es", "ca", "it"];
const defaultLocale = "en";

// Mapeo de códigos de idioma del navegador a nuestros locales
const localeMap: Record<string, string> = {
	en: "en",
	"en-US": "en",
	"en-GB": "en",
	es: "es",
	"es-ES": "es",
	"es-MX": "es",
	"es-AR": "es",
	ca: "ca",
	"ca-ES": "ca",
	it: "it",
	"it-IT": "it",
	"it-CH": "it",
};

function getBrowserLocale(acceptLanguage: string | null): string {
	if (!acceptLanguage) return defaultLocale;

	// Parsear el header Accept-Language
	const languages = acceptLanguage
		.split(",")
		.map((lang) => {
			const [locale, q = "1"] = lang.trim().split(";q=");
			return {
				locale: locale.trim(),
				quality: Number.parseFloat(q),
			};
		})
		.sort((a, b) => b.quality - a.quality);

	// Buscar el primer idioma soportado
	for (const { locale } of languages) {
		// Intentar match exacto primero
		if (localeMap[locale]) {
			return localeMap[locale];
		}

		// Intentar match con el código de idioma base (ej: "es" de "es-MX")
		const baseLocale = locale.split("-")[0];
		if (localeMap[baseLocale]) {
			return localeMap[baseLocale];
		}
	}

	return defaultLocale;
}

export const onRequest = defineMiddleware((context, next) => {
	// 1. Redirección de www a non-www
	if (context.url.hostname === wwwHost) {
		const redirectUrl = new URL(context.url.pathname, primaryUrl);
		redirectUrl.search = context.url.search;
		redirectUrl.hash = context.url.hash;
		return context.redirect(redirectUrl.toString(), 301);
	}

	// 2. Detección automática de idioma
	const pathname = context.url.pathname;

	// No redirigir si ya está en una ruta con locale
	const hasLocalePrefix = supportedLocales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	// Solo aplicar detección de idioma en la raíz
	if (pathname === "/" && !hasLocalePrefix) {
		// Verificar si ya tiene una preferencia guardada
		const cookieLocale = context.cookies.get("preferred-locale")?.value;

		if (cookieLocale && supportedLocales.includes(cookieLocale)) {
			// Usar la preferencia guardada
			if (cookieLocale !== defaultLocale) {
				return context.redirect(`/${cookieLocale}`, 302);
			}
		} else {
			// Primera visita: detectar idioma del navegador
			const acceptLanguage = context.request.headers.get("accept-language");
			const browserLocale = getBrowserLocale(acceptLanguage);

			// Guardar preferencia
			context.cookies.set("preferred-locale", browserLocale, {
				path: "/",
				maxAge: 60 * 60 * 24 * 365, // 1 año
				sameSite: "lax",
			});

			// Redirigir si no es el idioma por defecto
			if (browserLocale !== defaultLocale) {
				return context.redirect(`/${browserLocale}`, 302);
			}
		}
	}

	return next();
});
