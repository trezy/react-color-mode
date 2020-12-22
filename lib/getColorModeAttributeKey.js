export function getColorModeAttributeKey() {
	return process?.env?.NEXT_PUBLIC_COLOR_MODE_KEY || 'next-color-mode'
}
