import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
	sendContactEmail: defineAction({
		input: z.object({
			name: z.string().min(1, "Name is required"),
			email: z.string().email("Invalid email format"),
			phone: z.string().optional(),
			service: z.string().optional(),
			message: z.string().min(1, "Message is required"),
		}),
		handler: async (input) => {
			const { name, email, phone, service, message } = input;

			try {
				const { data, error } = await resend.emails.send({
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
				  <p>Este mensaje fue enviado desde el formulario de contacto de tactilstudio.com</p>
				</div>
            </div>
          `,
				});

				if (error) {
					console.error("Resend error:", error);
					throw new Error("Failed to send email");
				}

				return {
					success: true,
					data,
				};
			} catch (error) {
				console.error("Contact form error:", error);
				throw new Error("Failed to send contact email");
			}
		},
	}),
};
