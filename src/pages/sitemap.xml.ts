import type { APIRoute } from "astro";
import { baseUrl, siteUpdatedAt } from "~/lib/constants";

const routes = [
	"/",
	"/projects",
	"/es",
	"/es/projects",
	"/ca",
	"/ca/projects",
	"/it",
	"/it/projects",
];

const buildSitemap = () => {
	const urls = routes
		.map((route) => {
			const url = new URL(route, baseUrl).toString();

			return `
  <url>
    <loc>${url}</loc>
    <lastmod>${siteUpdatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
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
