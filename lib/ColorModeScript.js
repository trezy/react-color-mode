// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function ColorModeScript() {
	const colorModeAttributeKey = getColorModeAttributeKey()
	const colorModeDefault = getColorModeDefault()

	return (
		<script dangerouslySetInnerHTML={{
			__html: `(function() {
				let theme = '${colorModeDefault}'

				if (typeof window !== 'undefined') {
					theme = window.localStorage.getItem('${colorModeAttributeKey}') || theme
				}

				document.querySelector('html').setAttribute('${colorModeAttributeKey}', theme)
			})()`,
		}} />
	)
}
