// Local imports
import { getLocalColorMode } from '../lib/getLocalColorMode'
import { setLocalColorMode } from '../lib/setLocalColorMode'





describe('getLocalColorMode', () => {
	test('with defaults', () => {
		expect(getLocalColorMode({})).toEqual(null)
	})

	test('with updated color mode', () => {
		const newColorMode = 'dark'
		setLocalColorMode({}, newColorMode)
		expect(getLocalColorMode({})).toEqual(newColorMode)
	})

	test('with custom storageKey', () => {
		const config = {
			storageKey: 'custom-storage-key',
		}
		const newColorMode = 'dark'

		setLocalColorMode(config, newColorMode)
		expect(getLocalColorMode(config)).toEqual(newColorMode)
	})
})
