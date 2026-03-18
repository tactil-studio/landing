import type { APIRoute } from "astro";
import { baseUrl, siteUpdatedAt } from "~/lib/constants";

type RouteEntry = { path: string; priority?: number; changefreq?: string };

const routes: RouteEntry[] = [
	// Main pages
	{ path: "/", priority: 1.0, changefreq: "weekly" },
	{ path: "/projects", priority: 0.9 },
	{ path: "/contact", priority: 0.9 },
	{ path: "/legal", priority: 0.3, changefreq: "monthly" },
	{ path: "/privacy", priority: 0.3, changefreq: "monthly" },
	{ path: "/cookies", priority: 0.3, changefreq: "monthly" },
	// Spanish
	{ path: "/es", priority: 1.0, changefreq: "weekly" },
	{ path: "/es/projects", priority: 0.9 },
	{ path: "/es/contact", priority: 0.9 },
	{ path: "/es/legal", priority: 0.3, changefreq: "monthly" },
	{ path: "/es/privacy", priority: 0.3, changefreq: "monthly" },
	{ path: "/es/cookies", priority: 0.3, changefreq: "monthly" },
	// Catalan
	{ path: "/ca", priority: 1.0, changefreq: "weekly" },
	{ path: "/ca/projects", priority: 0.9 },
	{ path: "/ca/contact", priority: 0.9 },
	{ path: "/ca/legal", priority: 0.3, changefreq: "monthly" },
	{ path: "/ca/privacy", priority: 0.3, changefreq: "monthly" },
	{ path: "/ca/cookies", priority: 0.3, changefreq: "monthly" },
	// Italian
	{ path: "/it", priority: 1.0, changefreq: "weekly" },
	{ path: "/it/projects", priority: 0.9 },
	{ path: "/it/contact", priority: 0.9 },
	{ path: "/it/legal", priority: 0.3, changefreq: "monthly" },
	{ path: "/it/privacy", priority: 0.3, changefreq: "monthly" },
	{ path: "/it/cookies", priority: 0.3, changefreq: "monthly" },
];

const buildSitemap = () => {
	const urls = routes
		.map(({ path, priority = 0.8, changefreq = "weekly" }) => {
			const url = new URL(path, baseUrl).toString();
			return `
  <url>
    <loc>${url}</loc>
    <lastmod>${siteUpdatedAt}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
		})
		.join("");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
};

export const GET: APIRoute = async () => {
	return new Response(buildSitemap(), {
		headers: {
			"Content-Type": "application/xml; charset=utf-8",
		},
	});
};
