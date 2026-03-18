import { readFileSync } from "node:fs";
import path from "node:path";
import type { APIRoute } from "astro";
import satori from "satori";
import sharp from "sharp";

export const prerender = false;

const fontPath = path.join(
	process.cwd(),
	"src",
	"assets",
	"fonts",
	"stackSans.ttf",
);
const fontData = readFileSync(fontPath);

export const GET: APIRoute = async ({ url }) => {
	const title = url.searchParams.get("title") ?? "Tactil Studio";
	const description =
		url.searchParams.get("description") ?? "Web Design & Development Studio";

	const svg = await satori(
		{
			type: "div",
			props: {
				style: {
					background: "#1a2e18",
					width: "1200px",
					height: "630px",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					justifyContent: "space-between",
					padding: "64px",
					fontFamily: "stackSans",
				},
				children: [
					// Top bar: brand name
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "10px",
							},
							children: [
								{
									type: "span",
									props: {
										style: {
											fontSize: 20,
											fontWeight: 400,
											color: "rgba(255,255,255,0.5)",
											letterSpacing: "0.12em",
											textTransform: "uppercase",
										},
										children: "tactilstudio.com",
									},
								},
							],
						},
					},
					// Bottom: title + description
					{
						type: "div",
						props: {
							style: {
								display: "flex",
								flexDirection: "column",
								gap: "20px",
							},
							children: [
								{
									type: "div",
									props: {
										style: {
											fontSize: title.length > 45 ? 50 : 64,
											fontWeight: 400,
											color: "#a8d5a2",
											lineHeight: 1.1,
											maxWidth: "950px",
										},
										children: title,
									},
								},
								{
									type: "div",
									props: {
										style: {
											fontSize: 26,
											color: "rgba(255,255,255,0.6)",
											maxWidth: "820px",
											lineHeight: 1.45,
										},
										children: description,
									},
								},
							],
						},
					},
				],
			},
		},
		{
			width: 1200,
			height: 630,
			fonts: [
				{
					name: "stackSans",
					data: fontData,
					weight: 400,
					style: "normal",
				},
			],
		},
	);

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png, {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};
