import type { Locale } from "../types";
import { ca } from "./ca";
import { en } from "./en";
import { es } from "./es";
import { it } from "./it";

export const locales = {
	en,
	es,
	ca,
	it,
} as const;

export const localeList = Object.keys(locales) as Locale[];

export const defaultLocale: Locale = "en";
