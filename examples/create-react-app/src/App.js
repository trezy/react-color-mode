import { useColorMode } from 'react-color-mode'

export default function ColorModeManager() {
	const {
		colorMode,
		updateColorMode,
	} = useColorMode()

	return (
		<>
			<div>Hello! The current color mode is <code>{colorMode}</code>.</div>
			<button onClick={() => updateColorMode('light')}>Light mode</button>
			<button onClick={() => updateColorMode('dark')}>Dark mode</button>
			<button onClick={() => updateColorMode('system')}>System mode</button>
		</>
	)
}
