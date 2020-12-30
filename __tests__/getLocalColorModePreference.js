// Local imports
import { getLocalColorModePreference } from '../lib/getLocalColorModePreference'
import { setLocalColorModePreference } from '../lib/setLocalColorModePreference'





describe('getLocalColorModePreference', () => {
	test('with defaults', () => {
		expect(getLocalColorModePreference({})).toEqual(null)
	})

	test('with updated color mode', () => {
		const newColorMode = 'dark'
		setLocalColorModePreference({}, newColorMode)
		expect(getLocalColorModePreference({})).toEqual(newColorMode)
	})

	test('with custom storageKey', () => {
		const config = {
			storageKey: 'custom-storage-key',
		}
		const newColorMode = 'dark'

		setLocalColorModePreference(config, newColorMode)
		expect(getLocalColorModePreference(config)).toEqual(newColorMode)
	})
})
