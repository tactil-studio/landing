import { actions } from "astro:actions";
import { useEffect, useState } from "react";

export default function ContactForm() {
	const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
	const [errorMessage, setErrorMessage] = useState("");

	// Capturar UTM parameters de la URL
	const [utmParams, setUtmParams] = useState({
		utm_source: "",
		utm_medium: "",
		utm_campaign: "",
	});

	useEffect(() => {
		// Capturar UTM params al cargar
		const params = new URLSearchParams(window.location.search);
		setUtmParams({
			utm_source: params.get("utm_source") || "",
			utm_medium: params.get("utm_medium") || "",
			utm_campaign: params.get("utm_campaign") || "",
		});
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		// Guardar referencia al form antes del async
		const form = e.currentTarget;
		const formData = new FormData(form);

		// Agregar datos adicionales
		formData.append("timezone", Intl.DateTimeFormat().resolvedOptions().timeZone);
		formData.append("utm_source", utmParams.utm_source);
		formData.append("utm_medium", utmParams.utm_medium);
		formData.append("utm_campaign", utmParams.utm_campaign);

		try {
			// Usar Astro Actions
			const { data, error } = await actions.sendContact(formData);

			if (error) {
				setStatus("error");
				setErrorMessage(error.message || "Error al enviar el mensaje");
				console.error("Action error:", error);
				return;
			}

			if (data?.success) {
				setStatus("success");
				form.reset(); // Usar la referencia guardada
				setTimeout(() => setStatus("idle"), 5000);
			}
		} catch (error) {
			setStatus("error");
			setErrorMessage("Error de conexión. Inténtalo de nuevo.");
			console.error("Error completo:", error);
		}
	};

	return (
		<form className="space-y-4" onSubmit={handleSubmit}>
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
					Nombre
				</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					disabled={status === "loading"}
					className="w-full px-4 py-3 rounded-xl bg-background border border-muted-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
					placeholder="Tu nombre"
				/>
			</div>

			<div>
				<label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					disabled={status === "loading"}
					className="w-full px-4 py-3 rounded-xl bg-background border border-muted-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
					placeholder="tu@email.com"
				/>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				<div>
					<label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
						Empresa (opcional)
					</label>
					<input
						type="text"
						id="company"
						name="company"
						disabled={status === "loading"}
						className="w-full px-4 py-3 rounded-xl bg-background border border-muted-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
						placeholder="Tu empresa"
					/>
				</div>
				<div>
					<label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
						Teléfono
					</label>
					<input
						type="tel"
						id="phone"
						name="phone"
						required
						disabled={status === "loading"}
						className="w-full px-4 py-3 rounded-xl bg-background border border-muted-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
						placeholder="666 123 456"
					/>
				</div>
			</div>

			<div>
				<label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
					Mensaje
				</label>
				<textarea
					id="message"
					minLength={1}
					name="message"
					required
					rows={4}
					disabled={status === "loading"}
					className="w-full px-4 py-3 rounded-xl bg-background border border-muted-foreground text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
					placeholder="¿Cómo podemos ayudarte?"
				/>
			</div>

			{/* Mensaje de éxito */}
			{status === "success" && (
				<div className="p-4 rounded-xl bg-green-50 border border-green-200">
					<p className="text-green-800 text-sm font-medium">
						✓ Mensaje enviado correctamente. Te contactaremos pronto.
					</p>
				</div>
			)}

			{/* Mensaje de error */}
			{status === "error" && (
				<div className="p-4 rounded-xl bg-red-50 border border-red-200">
					<p className="text-red-800 text-sm font-medium">
						✗ {errorMessage}
					</p>
				</div>
			)}

			<button
				type="submit"
				disabled={status === "loading"}
				className="w-full px-6 py-3 bg-primary text-background rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden relative"
			>
				{status === "loading" ? (
					<>
						<svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
							<title>Enviando...</title>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Enviando...
					</>
				) : (
					<>
						Enviar mensaje
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<title>Enviar mensaje</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</>
				)}
			</button>
		</form>
	);
}

