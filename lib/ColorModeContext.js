// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react'





// Local imports
import { getLocalColorMode } from './getLocalColorMode'
import { setLocalColorMode } from './setLocalColorMode'





export const ColorModeContext = createContext({
	colorMode: getLocalColorMode({}),
	updateColorMode: () => {},
})





export function ColorModeContextProvider(props) {
	const { children } = props

	const [colorMode, setColorMode] = useState(getLocalColorMode(props))

	const updateColorMode = useCallback(newColorMode => {
		const allowedColorModes = ['dark', 'light', 'system']

		if (!allowedColorModes.includes(newColorMode.toLowerCase())) {
			throw new TypeError(`Invalid color mode provided. Color mode must be one of: ${allowedColorModes.join(', ')}`)
		}

		setLocalColorMode(props, newColorMode)
		setColorMode(newColorMode)
	}, [setColorMode])

	return (
		<ColorModeContext.Provider
			value={{
				colorMode,
				updateColorMode,
			}}>
			{children}
		</ColorModeContext.Provider>
	)
}

export const useColorMode = () => useContext(ColorModeContext)
