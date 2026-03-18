import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Client } from "@notionhq/client";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Inicializar cliente de Notion
const notion = new Client({
	auth: import.meta.env.NOTION_INTEGRATION_SECRET,
});

// Función para parsear User Agent
function parseUserAgent(ua: string) {
	const browser =
		ua.match(/(Chrome|Firefox|Safari|Edge|Opera|MSIE|Trident)/i)?.[0] ||
		"Unknown";
	const os = ua.match(/(Windows|Mac|Linux|Android|iOS)/i)?.[0] || "Unknown";
	const device = /Mobile|Android|iPhone|iPad/i.test(ua)
		? "Mobile"
		: /Tablet|iPad/i.test(ua)
			? "Tablet"
			: "Desktop";

	return { browser, os, device };
}

export const server = {
	sendContact: defineAction({
		accept: "form",
		input: z.object({
			name: z.string().min(1, "El nombre es obligatorio"),
			email: z.string().email("Email inválido"),
			phone: z.string().min(1, "El teléfono es obligatorio"),
			company: z.string().optional(),
			message: z.string().min(1, "El mensaje debe tener al menos 1 carácter"),
			timezone: z.string().optional(),
			utm_source: z.string().optional(),
			utm_medium: z.string().optional(),
			utm_campaign: z.string().optional(),
		}),
		handler: async (input, context) => {
			const {
				name,
				email,
				phone,
				company,
				message,
				timezone,
				utm_source,
				utm_medium,
				utm_campaign,
			} = input;

			// Obtener datos del request
			const userAgent = context.request.headers.get("user-agent") || "Unknown";
			const { browser, os, device } = parseUserAgent(userAgent);
			const language =
				context.request.headers.get("accept-language")?.split(",")[0] ||
				"Unknown";
			const referrer = context.request.headers.get("referer") || "Direct";

			// IP del cliente
			const forwarded = context.request.headers.get("x-forwarded-for");
			const realIP = context.request.headers.get("x-real-ip");
			const cfConnectingIP = context.request.headers.get("cf-connecting-ip");
			const ip =
				forwarded?.split(",")[0].trim() ||
				realIP ||
				cfConnectingIP ||
				"Unknown";

			const now = new Date();
			const timestamp = now.toLocaleString("es-ES", {
				timeZone: "Europe/Madrid",
			});
			const isoTimestamp = now.toISOString();
 
			try {
				// 1. Enviar email con Resend
				const { data: emailData, error: emailError } = await resend.emails.send(
					{
						from: "¡Gracias por contactarnos! <hello@tactilstudio.com>",
						to: ["hello@tactilstudio.com", "gubaupol@gmail.com"],
						replyTo: email,
						subject: `Nuevo contacto: ${name}`,
						html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #2A4227; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 20px; }
                  .label { font-weight: 600; color: #50576b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                  .value { margin-top: 5px; font-size: 16px; }
                  .metadata { background: white; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px; }
                  .metadata-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
                  .metadata-item:last-child { border-bottom: none; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0; font-size: 24px;">Nuevo Contacto desde la Web</h1>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Nombre</div>
                      <div class="value">${name}</div>
                    </div>
                    
                    <div class="field">
                      <div class="label">Email</div>
                      <div class="value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    
                    <div class="field">
                      <div class="label">Teléfono</div>
                      <div class="value"><a href="tel:${phone}">${phone}</a></div>
                    </div>
                    
                    ${
											company
												? `
                    <div class="field">
                      <div class="label">Empresa</div>
                      <div class="value">${company}</div>
                    </div>
                    `
												: ""
										}
                    
                    <div class="field">
                      <div class="label">Mensaje</div>
                      <div class="value">${message.replace(/\n/g, "<br>")}</div>
                    </div>
                    
                    <div class="metadata">
                      <div class="metadata-item">
                        <span><strong>Fecha/Hora:</strong></span>
                        <span>${timestamp}</span>
                      </div>
                      <div class="metadata-item">
                        <span><strong>IP:</strong></span>
                        <span>${ip}</span>
                      </div>
                      <div class="metadata-item">
                        <span><strong>Navegador:</strong></span>
                        <span>${browser}</span>
                      </div>
                      <div class="metadata-item">
                        <span><strong>Sistema:</strong></span>
                        <span>${os}</span>
                      </div>
                      <div class="metadata-item">
                        <span><strong>Dispositivo:</strong></span>
                        <span>${device}</span>
                      </div>
                      ${
												referrer !== "Direct"
													? `
                      <div class="metadata-item">
                        <span><strong>Referrer:</strong></span>
                        <span>${referrer}</span>
                      </div>
                      `
													: ""
											}
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `,
					},
				);

				if (emailError) {
					console.error("Error enviando email:", emailError);
					throw new ActionError({
						code: "INTERNAL_SERVER_ERROR",
						// biome-ignore lint/style/useTemplate: <explanation>
						message: "Error al enviar el email: " + emailError.message,
					});
				}

				const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID;

				if (NOTION_DATABASE_ID) {
					try {
						await notion.pages.create({
							parent: {
								database_id: NOTION_DATABASE_ID,
							},
							properties: {
								Name: {
									title: [
										{
											text: {
												content: name,
											},
										},
									],
								},
								Email: {
									email: email,
								},
								Phone: {
									phone_number: phone,
								},
								company: {
									rich_text: [
										{
											text: {
												content: company || "",
											},
										},
									],
								},
								message: {
									rich_text: [
										{
											text: {
												content: message,
											},
										},
									],
								},
								date: {
									date: {
										start: isoTimestamp,
									},
								},
								timezone: {
									rich_text: [
										{
											text: {
												content: timezone || "Unknown",
											},
										},
									],
								},
								language: {
									rich_text: [
										{
											text: {
												content: language,
											},
										},
									],
								},
								ip: {
									rich_text: [
										{
											text: {
												content: ip,
											},
										},
									],
								},
								browser: {
									rich_text: [
										{
											text: {
												content: browser,
											},
										},
									],
								},
								os: {
									rich_text: [
										{
											text: {
												content: os,
											},
										},
									],
								},
								device: {
									rich_text: [
										{
											text: {
												content: device,
											},
										},
									],
								},
								userAgent: {
									rich_text: [
										{
											text: {
												content: userAgent,
											},
										},
									],
								},
								referrer: {
									rich_text: [
										{
											text: {
												content: referrer,
											},
										},
									],
								},
								"utm-source": {
									rich_text: [
										{
											text: {
												content: utm_source || "",
											},
										},
									],
								},
								"utm-medium": {
									rich_text: [
										{
											text: {
												content: utm_medium || "",
											},
										},
									],
								},
								"utm-campaign": {
									rich_text: [
										{
											text: {
												content: utm_campaign || "",
											},
										},
									],
								},
							},
						});

						console.log("✅ Lead guardado en Notion");
					} catch (notionError) {
						console.error("Error guardando en Notion:", notionError);
						// No lanzar error, continuar aunque falle Notion
					}
				} else {
					console.warn("NOTION_DATABASE_ID no está configurada");
				}

				return {
					success: true,
					message: "Mensaje enviado correctamente",
					emailId: emailData?.id,
				};
			} catch (error) {
				console.error("Error en sendContact:", error);
				throw new ActionError({
					code: "INTERNAL_SERVER_ERROR",
					message: error instanceof Error ? error.message : "Error desconocido",
				});
			}
		},
	}),
};
