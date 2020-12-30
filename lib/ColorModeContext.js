// Module imports
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useReducer,
} from 'react'





// Local imports
import { getLocalColorModePreference } from './getLocalColorModePreference'
import { setLocalColorModePreference } from './setLocalColorModePreference'





// Local constants
const ALLOWED_PREFERENCES = ['dark', 'light', 'system']
const INITIAL_STATE = {
	colorMode: 'light',
	colorModePreference: getLocalColorModePreference({}),
	systemColorMode: null,
}





function reducer(state, action) {
	const {
		payload,
		type,
	} = action

	switch (type) {
		case 'update system color mode':
			return {
				...state,
				systemColorMode: payload.colorMode,
			}

		case 'update user preference':
			return {
				...state,
				colorMode: (payload.preference === 'system') ? state.systemColorMode : payload.preference,
				colorModePreference: payload.preference,
			}

		default:
			throw new Error()
	}
}





export const ColorModeContext = createContext({
	...INITIAL_STATE,
	updateColorModePreference: () => {},
})

export function ColorModeContextProvider(props) {
	const { children } = props
	const [state, dispatch] = useReducer(reducer, { ...INITIAL_STATE })

	const updateColorModePreference = useCallback(preference => {
		if (!ALLOWED_PREFERENCES.includes(preference.toLowerCase())) {
			throw new TypeError(`Invalid color preference provided. Preference must be one of: ${ALLOWED_PREFERENCES.join(', ')}`)
		}

		setLocalColorModePreference(props, preference)

		return dispatch({
			payload: { preference },
			type: 'update user preference',
		})
	}, [setLocalColorModePreference])

	const updateSystemColorMode = useCallback(({ matches }) => {
		return dispatch({
			payload: {
				colorMode: matches ? 'dark' : 'light',
			},
			type: 'update system color mode',
		})
	}, [])

	useEffect(() => {
		const mql = window.matchMedia('(prefers-color-scheme: dark)')

		mql.addEventListener('change', updateSystemColorMode)

		return () => {
			mql.removeEventListener('change', updateSystemColorMode)
		}
	}, [updateSystemColorMode])

	return (
		<ColorModeContext.Provider
			value={{
				...state,
				updateColorModePreference,
			}}>
			{children}
		</ColorModeContext.Provider>
	)
}

export const useColorMode = () => useContext(ColorModeContext)
