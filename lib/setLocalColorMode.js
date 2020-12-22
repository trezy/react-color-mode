// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'





export function setLocalColorMode(newColorMode) {
	const newColorModeLowerCase = newColorMode.toLowerCase()
	const colorModeAttributeKey = getColorModeAttributeKey()

	window.localStorage.setItem(newColorModeLowerCase)

	const rootElement = document.querySelector('html')
	rootElement.setAttribute(colorModeAttributeKey, newColorModeLowerCase)
}
