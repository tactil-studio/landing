/**
 * Select Component (React) - Primitive UI component for select dropdowns
 */

import type { SelectHTMLAttributes } from "react";
import { cn, inputBaseStyles, labelStyles } from "./styles";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	containerClassName?: string;
	children: React.ReactNode;
}

export function Select({
	label,
	error,
	id,
	required,
	className,
	containerClassName,
	children,
	...props
}: SelectProps) {
	return (
		<div className={cn("flex flex-col gap-2", containerClassName)}>
			{label && (
				<label htmlFor={id} className={labelStyles}>
					{label}
					{required && <span className="text-red-500">*</span>}
				</label>
			)}
			<select
				id={id}
				required={required}
				className={cn(
					inputBaseStyles,
					"cursor-pointer",
					"[&>option]:bg-background [&>option]:text-foreground",
					"dark:[&>option]:bg-gray-900 dark:[&>option]:text-white",
					error && "border-red-500",
					className,
				)}
				{...props}
			>
				{children}
			</select>
			{error && <span className="text-sm text-red-500">{error}</span>}
		</div>
	);
}

