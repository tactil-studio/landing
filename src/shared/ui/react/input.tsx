/**
 * Input Component (React) - Primitive UI component for form inputs
 */

import type { InputHTMLAttributes } from "react";
import { cn, inputBaseStyles, labelStyles } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	containerClassName?: string;
}

export function Input({
	label,
	error,
	id,
	required,
	className,
	containerClassName,
	...props
}: InputProps) {
	return (
		<div className={cn("flex flex-col gap-2", containerClassName)}>
			{label && (
				<label htmlFor={id} className={labelStyles}>
					{label}
					{required && <span className="text-red-500">*</span>}
				</label>
			)}
			<input
				id={id}
				required={required}
				className={cn(inputBaseStyles, error && "border-red-500", className)}
				{...props}
			/>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}

