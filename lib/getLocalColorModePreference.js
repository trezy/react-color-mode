// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function getLocalColorModePreference(config) {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(getColorModeAttributeKey(config))
	}

	return getColorModeDefault(config)
}
