export function getColorModeDefault() {
	return process?.env?.NEXT_PUBLIC_COLOR_MODE_DEFAULT || 'system'
}
