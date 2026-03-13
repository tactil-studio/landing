/**
 * UI Styles - Centralized style definitions following SOLID principles
 * Single source of truth for all UI component styles
 */

export type Variant = "primary" | "secondary" | "outline" | "ghost";
export type Size = "sm" | "md" | "lg";

/**
 * Base styles applied to all interactive elements
 */
export const baseInteractiveStyles =
	"inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98]";

/**
 * Variant styles - color schemes for different component states
 */
export const variantStyles: Record<Variant, string> = {
	primary:
		"bg-primary text-background hover:brightness-95 shadow-md hover:shadow-lg focus:ring-primary",
	secondary:
		"bg-secondary text-background hover:brightness-95 shadow-md hover:shadow-lg focus:ring-secondary",
	outline:
		"border-2 border-border bg-transparent hover:bg-muted focus:ring-border",
	ghost: "bg-transparent hover:bg-muted focus:ring-muted",
};

/**
 * Size styles - consistent sizing across components
 */
export const sizeStyles: Record<Size, string> = {
	sm: "px-4 py-2 text-sm rounded-lg",
	md: "px-6 py-3 text-base rounded-lg",
	lg: "px-8 py-3.5 text-lg rounded-full",
};

/**
 * Disabled state styles
 */
export const disabledStyles = "disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Utility function to combine class names
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(" ");
}

/**
 * Get combined styles for a component
 */
export function getComponentStyles(
	variant: Variant = "primary",
	size: Size = "md",
	additionalClasses?: string,
): string {
	return cn(
		baseInteractiveStyles,
		variantStyles[variant],
		sizeStyles[size],
		additionalClasses,
	);
}

/**
 * Input field styles
 */
export const inputBaseStyles =
	"px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all";

/**
 * Label styles
 */
export const labelStyles = "font-semibold text-sm text-foreground";

/**
 * Card styles
 */
export const cardStyles =
	"bg-background border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300";

/**
 * Section styles
 */
export const sectionStyles =
	"flex flex-col gap-16 py-24 px-4 w-full max-w-7xl mx-auto";

/**
 * Heading styles
 */
export const headingStyles = {
	h1: "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight",
	h2: "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
	h3: "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
	h4: "text-xl md:text-2xl font-bold",
	h5: "text-lg md:text-xl font-semibold",
	h6: "text-base md:text-lg font-semibold",
};

/**
 * Text styles
 */
export const textStyles = {
	body: "text-base leading-relaxed",
	bodyLarge: "text-lg leading-relaxed",
	bodySmall: "text-sm leading-relaxed",
	muted: "text-muted-foreground",
};
