// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'





export function setLocalColorMode(config, newColorMode) {
	const newColorModeLowerCase = newColorMode.toLowerCase()
	const colorModeAttributeKey = getColorModeAttributeKey(config)

	window.localStorage.setItem(colorModeAttributeKey, newColorModeLowerCase)

	const rootElement = document.querySelector('html')
	rootElement.setAttribute(colorModeAttributeKey, newColorModeLowerCase)
}
