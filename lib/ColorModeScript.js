// Local imports
import { getColorModeAttributeKey } from './getColorModeAttributeKey'
import { getColorModeDefault } from './getColorModeDefault'





export function ColorModeScript(props) {
	const colorModeAttributeKey = getColorModeAttributeKey(props)
	const colorModeDefault = getColorModeDefault(props)

	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `(function() {
					let theme = '${colorModeDefault}'

					if (typeof window !== 'undefined') {
						const localTheme = window.localStorage.getItem('${colorModeAttributeKey}')

						if (localTheme) {
							theme = localTheme
						} else {
							window.localStorage.setItem('${colorModeAttributeKey}', '${colorModeDefault}')
						}

						document.querySelector('html').setAttribute('${colorModeAttributeKey}', theme)
					}
				})()`,
			}}
			data-testid={props['data-testid']} />
	)
}
