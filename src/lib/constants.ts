import { readdirSync, statSync } from "node:fs";
import path from "node:path";

export const paths = {
	projects: path.join(process.cwd(), "src", "content", "projects"),
};

export const baseUrl = "https://tactilstudio.com";

const freshnessPaths = [
	path.join(process.cwd(), "astro.config.mjs"),
	path.join(process.cwd(), "public"),
	path.join(process.cwd(), "src", "app"),
	path.join(process.cwd(), "src", "components"),
	path.join(process.cwd(), "src", "content"),
	path.join(process.cwd(), "src", "features"),
	path.join(process.cwd(), "src", "pages"),
	path.join(process.cwd(), "src", "shared"),
];

const getLatestModifiedTime = (targetPath: string): number => {
	try {
		const stats = statSync(targetPath);

		if (stats.isDirectory()) {
			return readdirSync(targetPath).reduce(
				(latest, entry) =>
					Math.max(latest, getLatestModifiedTime(path.join(targetPath, entry))),
				stats.mtimeMs,
			);
		}

		return stats.mtimeMs;
	} catch {
		return 0;
	}
};

const latestModifiedTime = Math.max(
	...freshnessPaths.map((targetPath) => getLatestModifiedTime(targetPath)),
);

export const siteUpdatedAt = new Date(
	latestModifiedTime > 0 ? latestModifiedTime : Date.now(),
).toISOString();

export type Metadata = {
	title: string;
	description: string;
	name: string;
	longName: string;
	slogan: string;
	picture: string;
	getInTouchLink: string;
	tags: string[];
	contact: {
		email: string;
	};
	links: {
		website: string;
		twitter: string;
		github: string;
		linkedin: string;
		email: string;
	};
	homeOgImage: string;
};

export function getMetadata(locale = "en"): Metadata {
	if (locale === "es") {
		return {
			title: "Tactil | Estudio de diseño y desarrollo web",
			description:
				"Tactilstudio.com es un estudio de diseño y desarrollo web que crea experiencias digitales elegantes, rápidas y escalables con código a medida.",
			name: "Tactil",
			longName: "Tactil | Estudio Digital",
			slogan: "Sitios web hechos a mano, construidos con código",
			picture: "/assets/branding/logo.png",
			getInTouchLink: "https://forms.gle/J5xpGDUCiVSRS8Pc7",
			tags: [
				"Tactil Digital",
				"Tactil",
				"Estudio Web",
				"UX Design",
				"Frontend Development",
				"React",
				"Astro",
				"TailwindCSS",
				"Custom Web Design",
				"UI/UX",
				"Barcelona",
				"Germany",
				"Landing Pages",
				"Corporate Websites",
				"Dashboards",
				"Accessible Design",
				"SEO Optimization",
			],
			contact: {
				email: "hello@tactilstudio.com",
			},
			links: {
				website: baseUrl,
				twitter: "https://twitter.com/tactil-studio",
				github: "https://github.com/tactil-studio",
				linkedin: "https://www.linkedin.com/in/tactil-studio/",
				email: "mailto:hello@tactilstudio.com",
			},
			homeOgImage: "/assets/thumbnail.png",
		};
	}

	if (locale === "ca") {
		return {
			title: "Tactil | Estudi de disseny i desenvolupament web",
			description:
				"Tactilstudio.com és un estudi de disseny i desenvolupament web que crea experiències digitals elegants, ràpides i escalables amb codi a mida.",
			name: "Tactil",
			longName: "Tactil | Estudi Digital",
			slogan: "Llocs web fets a mà, construïts amb codi",
			picture: "/assets/branding/logo.png",
			getInTouchLink: "https://forms.gle/J5xpGDUCiVSRS8Pc7",
			tags: [
				"Tactil Digital",
				"Tactil",
				"Estudi Web",
				"UX Design",
				"Frontend Development",
				"React",
				"Astro",
				"TailwindCSS",
				"Custom Web Design",
				"UI/UX",
				"Barcelona",
				"Germany",
				"Landing Pages",
				"Corporate Websites",
				"Dashboards",
				"Accessible Design",
				"SEO Optimization",
			],
			contact: {
				email: "hello@tactilstudio.com",
			},
			links: {
				website: baseUrl,
				twitter: "https://twitter.com/tactil-studio",
				github: "https://github.com/tactil-studio",
				linkedin: "https://www.linkedin.com/in/tactil-studio/",
				email: "mailto:hello@tactilstudio.com",
			},
			homeOgImage: "/assets/thumbnail.png",
		};
	}

	if (locale === "it") {
		return {
			title: "Tactil | Studio di design e sviluppo web",
			description:
				"Tactilstudio.com è uno studio di design e sviluppo web che crea esperienze digitali eleganti, veloci e scalabili con codice personalizzato.",
			name: "Tactil",
			longName: "Tactil | Studio Digitale",
			slogan: "Siti web fatti a mano, costruiti con codice",
			picture: "/assets/branding/logo.png",
			getInTouchLink: "https://forms.gle/J5xpGDUCiVSRS8Pc7",
			tags: [
				"Tactil Digital",
				"Tactil",
				"Studio Web",
				"UX Design",
				"Frontend Development",
				"React",
				"Astro",
				"TailwindCSS",
				"Custom Web Design",
				"UI/UX",
				"Barcelona",
				"Italia",
				"Landing Pages",
				"Siti Web Aziendali",
				"Dashboard",
				"Design Accessibile",
				"Ottimizzazione SEO",
			],
			contact: {
				email: "hello@tactilstudio.com",
			},
			links: {
				website: baseUrl,
				twitter: "https://twitter.com/tactil-studio",
				github: "https://github.com/tactil-studio",
				linkedin: "https://www.linkedin.com/in/tactil-studio/",
				email: "mailto:hello@tactilstudio.com",
			},
			homeOgImage: "/assets/thumbnail.png",
		};
	}

	return {
		title: "Tactil | Web Design & Development Studio",
		description:
			"Tactilstudio.com is a web design and development studio crafting elegant, fast, scalable digital experiences with custom code.",
		name: "Tactil",
		longName: "Tactil Digital Studio",
		slogan: "Hand-crafted websites, built with code",
		picture: "/assets/branding/logo.png",
		getInTouchLink:
			"https://docs.google.com/forms/d/e/1FAIpQLSfKWgtLXeSn8ukltI5spuXzIgBHsK-VfbR-QSbaccksEPB7_w/viewform",

		tags: [
			"Tactil Digital",
			"Tactil",
			"Web Studio",
			"UX Design",
			"Frontend Development",
			"React",
			"Astro",
			"TailwindCSS",
			"Custom Web Design",
			"UI/UX",
			"Barcelona",
			"Germany",
			"Landing Pages",
			"Corporate Websites",
			"Dashboards",
			"Accessible Design",
			"SEO Optimization",
		],
		contact: {
			email: "hello@tactilstudio.com",
		},
		links: {
			website: baseUrl,
			twitter: "https://twitter.com/tactil-studio",
			github: "https://github.com/tactil-studio",
			linkedin: "https://www.linkedin.com/in/tactil-studio/",
			email: "mailto:hello@tactilstudio.com",
		},
		homeOgImage: "/assets/thumbnail.png",
	};
}
export const defaultLocale = "en";
