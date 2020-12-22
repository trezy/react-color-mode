// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function ColorModeScript(props) {
	const colorModeAttributeKey = getColorModeAttributeKey(props)
	const colorModeDefault = getColorModeDefault(props)

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
