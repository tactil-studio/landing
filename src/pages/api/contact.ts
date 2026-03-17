import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
	try {
		const body = await request.json();
		const { name, email, phone, service, message } = body;

		// Validación básica
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({ error: "Missing required fields" }),
				{ status: 400 },
			);
		}

		// Llamar a la API de Resend
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.RESEND_API_KEY}`,
			},
			body: JSON.stringify({
				from: "Tactil Contact Form <hello@tactilstudio.com>",
				to: ["hello@tactilstudio.com"],
				subject: `Nuevo contacto: ${service || "Sin servicio especificado"}`,
				html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            Nuevo mensaje de contacto
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong>Nombre:</strong> ${name}
            </p>
            <p style="margin: 10px 0;">
              <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
            </p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone}</p>` : ""}
            ${service ? `<p style="margin: 10px 0;"><strong>Servicio:</strong> ${service}</p>` : ""}
          </div>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Mensaje:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Este mensaje fue enviado desde el formulario de contacto de tactil.digital</p>
          </div>
        </div>
      `,
			}),
		});

		if (!response.ok) {
			const error = await response.json();
			console.error("Resend error:", error);
			return new Response(
				JSON.stringify({ error: "Failed to send email" }),
				{ status: 500 },
			);
		}

		const data = await response.json();

		return new Response(JSON.stringify({ success: true, data }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Contact form error:", error);
		return new Response(
			JSON.stringify({ error: "Failed to send contact email" }),
			{ status: 500 },
		);
	}
};

