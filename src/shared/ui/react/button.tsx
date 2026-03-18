/**
 * Button Component (React) - Primitive UI component for buttons
 * Follows SOLID principles with single responsibility and open/closed principle
 */

import type { ButtonHTMLAttributes } from "react";
import { cn, getComponentStyles, type Size, type Variant } from "./styles";

export type ButtonVariant = Variant;
export type ButtonSize = Size;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	children: React.ReactNode;
}

export function Button({
	variant = "primary",
	size = "md",
	className,
	children,
	disabled,
	...props
}: ButtonProps) {
	const buttonClasses = cn(
		getComponentStyles(variant, size),
		disabled && "disabled:opacity-50 disabled:cursor-not-allowed",
		className,
	);

	return (
		<button className={buttonClasses} disabled={disabled} {...props}>
			{children}
		</button>
	);
}

