/**
 * UI Components - Centralized export for all primitive UI components
 * Following SOLID principles for better maintainability
 */

// Export all style utilities
export * from "./styles";

// Re-export components (for TypeScript imports)
export { default as Button } from "./button.astro";
export { default as Link } from "./link.astro";
export { default as Input } from "./input.astro";
export { default as Textarea } from "./textarea.astro";
export { default as Select } from "./select.astro";
export { default as Card } from "./card.astro";
export { default as Section } from "./section.astro";

// Export types
export type { ButtonVariant, ButtonSize } from "./button.astro";
export type { LinkVariant, LinkSize } from "./link.astro";

