/**
 * Textarea Component (React) - Primitive UI component for text areas
 */

import type { TextareaHTMLAttributes } from "react";
import { cn } from "~/lib/utils";
import { inputBaseStyles, labelStyles } from "./styles";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string;
	containerClassName?: string;
}

export function Textarea({
	label,
	error,
	id,
	required,
	className,
	containerClassName,
	...props
}: TextareaProps) {
	return (
		<div className={cn("flex flex-col gap-2", containerClassName)}>
			{label && (
				<label htmlFor={id} className={labelStyles}>
					{label}
					{required && <span className="text-red-500">*</span>}
				</label>
			)}
			<textarea
				id={id}
				required={required}
				className={cn(
					inputBaseStyles,
					"resize-none",
					error && "border-red-500",
					className,
				)}
				{...props}
			/>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}

