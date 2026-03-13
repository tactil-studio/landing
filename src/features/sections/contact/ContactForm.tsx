import { actions } from "astro:actions";
import { useEffect, useState } from "react";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Select } from "~/shared/ui/select";
import { Textarea } from "~/shared/ui/textarea";

type ContactFormProps = {
	translations: {
		name_label: string;
		name_placeholder: string;
		email_label: string;
		email_placeholder: string;
		phone_label: string;
		phone_placeholder: string;
		service_label: string;
		service_placeholder: string;
		service_web: string;
		service_landing: string;
		service_ecommerce: string;
		service_app: string;
		service_other: string;
		message_label: string;
		message_placeholder: string;
		submit: string;
		sending: string;
		success: string;
		error: string;
	};
};

// Mapeo de IDs de servicio a valores de traducción
const serviceMap: Record<string, string> = {
	corporate: "service_web",
	landing: "service_landing",
	custom: "service_other",
};

export default function ContactForm({ translations }: ContactFormProps) {
	// Leer el parámetro de servicio de la URL
	const getServiceFromURL = () => {
		if (typeof window === "undefined") return "";
		const params = new URLSearchParams(window.location.search);
		const serviceId = params.get("service");
		if (serviceId && serviceMap[serviceId]) {
			// Retornar el valor traducido correspondiente
			return translations[serviceMap[serviceId] as keyof typeof translations] as string;
		}
		return "";
	};

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		service: getServiceFromURL(),
		message: "",
	});

	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
		"idle",
	);

	// Escuchar cambios en la URL
	useEffect(() => {
		const handleURLChange = () => {
			if (typeof window === "undefined") return;
			const params = new URLSearchParams(window.location.search);
			const serviceId = params.get("service");

			console.log("ContactForm - URL changed");
			console.log("Service ID from URL:", serviceId);
			console.log("Service map:", serviceMap);

			if (serviceId && serviceMap[serviceId]) {
				const translationKey = serviceMap[serviceId];
				const translatedService = translations[translationKey as keyof typeof translations] as string;

				console.log("Translation key:", translationKey);
				console.log("Translated service:", translatedService);

				setFormData((prev) => ({
					...prev,
					service: translatedService,
				}));
			} else {
				console.log("No valid service ID found or not in map");
			}
		};

		// Escuchar cambios en el hash/search params
		window.addEventListener("popstate", handleURLChange);
		window.addEventListener("hashchange", handleURLChange);

		// Ejecutar al montar para capturar el valor inicial
		console.log("ContactForm mounted, checking URL...");
		handleURLChange();

		return () => {
			window.removeEventListener("popstate", handleURLChange);
			window.removeEventListener("hashchange", handleURLChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("sending");

		try {
			const { data, error } = await actions.sendContactEmail(formData);

			if (!error) {
				setStatus("success");
				setFormData({
					name: "",
					email: "",
					phone: "",
					service: "",
					message: "",
				});
				setTimeout(() => setStatus("idle"), 5000);
			} else {
				console.error("Action error:", error);
				setStatus("error");
				setTimeout(() => setStatus("idle"), 5000);
			}
		} catch (error) {
			console.error("Error:", error);
			setStatus("error");
			setTimeout(() => setStatus("idle"), 5000);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
			{/* Name */}
			<Input
				label={translations.name_label}
				id="name"
				name="name"
				type="text"
				value={formData.name}
				onChange={handleChange}
				placeholder={translations.name_placeholder}
				required
			/>

			{/* Email */}
			<Input
				label={translations.email_label}
				id="email"
				name="email"
				type="email"
				value={formData.email}
				onChange={handleChange}
				placeholder={translations.email_placeholder}
				required
			/>

			{/* Phone */}
			<Input
				label={translations.phone_label}
				id="phone"
				name="phone"
				type="tel"
				value={formData.phone}
				onChange={handleChange}
				placeholder={translations.phone_placeholder}
			/>

			{/* Service */}
			<Select
				label={translations.service_label}
				id="service"
				name="service"
				value={formData.service}
				onChange={handleChange}
			>
				<option value="">{translations.service_placeholder}</option>
				<option value={translations.service_web}>
					{translations.service_web}
				</option>
				<option value={translations.service_landing}>
					{translations.service_landing}
				</option>
				<option value={translations.service_ecommerce}>
					{translations.service_ecommerce}
				</option>
				<option value={translations.service_app}>
					{translations.service_app}
				</option>
				<option value={translations.service_other}>
					{translations.service_other}
				</option>
			</Select>

			{/* Message */}
			<Textarea
				label={translations.message_label}
				id="message"
				name="message"
				value={formData.message}
				onChange={handleChange}
				placeholder={translations.message_placeholder}
				required
				rows={6}
			/>

			{/* Submit Button */}
			<Button
				type="submit"
				disabled={status === "sending"}
				variant="primary"
				size="md"
				className="w-full"
			>
				{status === "sending" ? (
					<span className="flex items-center justify-center gap-2">
						<svg
							className="animate-spin h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							aria-label="Loading"
						>
							<title>Loading</title>
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
						{translations.sending}
					</span>
				) : (
					translations.submit
				)}
			</Button>

			{/* Status Messages */}
			{status === "success" && (
				<div className="p-4 bg-muted rounded-xl text-green-800 dark:text-green-400 text-center">
					✓ {translations.success}
				</div>
			)}

			{status === "error" && (
				<div className="p-4 bg-muted rounded-xl text-red-800 dark:text-red-400 text-center">
					✕ {translations.error}
				</div>
			)}
		</form>
	);
}

