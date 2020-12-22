// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function getLocalColorMode(config) {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(getColorModeAttributeKey(config))
	}

	return getColorModeDefault(config)
}
