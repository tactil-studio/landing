/**
 * Client-side language detection
 * Detecta el idioma del navegador y redirige automáticamente
 */

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

function getBrowserLocale(): string {
	// Obtener idiomas del navegador
	const languages = navigator.languages || [navigator.language];

	// Buscar el primer idioma soportado
	for (const lang of languages) {
		// Intentar match exacto primero
		if (localeMap[lang]) {
			return localeMap[lang];
		}

		// Intentar match con el código de idioma base (ej: "es" de "es-MX")
		const baseLocale = lang.split("-")[0];
		if (localeMap[baseLocale]) {
			return localeMap[baseLocale];
		}
	}

	return defaultLocale;
}

function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(";").shift() || null;
	}
	return null;
}

function setCookie(name: string, value: string, days: number = 365): void {
	const maxAge = days * 24 * 60 * 60;
	document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function detectAndRedirect(): void {
	// Solo ejecutar en la raíz
	if (window.location.pathname !== "/") {
		return;
	}

	// Verificar si ya tiene una preferencia guardada
	const cookieLocale = getCookie("preferred-locale");

	if (cookieLocale && supportedLocales.includes(cookieLocale)) {
		// Usar la preferencia guardada
		if (cookieLocale !== defaultLocale) {
			window.location.href = `/${cookieLocale}`;
		}
	} else {
		// Primera visita: detectar idioma del navegador
		const browserLocale = getBrowserLocale();

		// Guardar preferencia
		setCookie("preferred-locale", browserLocale);

		// Redirigir si no es el idioma por defecto
		if (browserLocale !== defaultLocale) {
			window.location.href = `/${browserLocale}`;
		}
	}
}

// Ejecutar detección
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", detectAndRedirect);
} else {
	detectAndRedirect();
}

