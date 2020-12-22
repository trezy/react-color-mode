// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function getLocalColorMode() {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(getColorModeAttributeKey())
	}

	return getColorModeDefault()
}
