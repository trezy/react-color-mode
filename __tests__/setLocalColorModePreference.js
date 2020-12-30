// Local imports
import { setLocalColorModePreference } from '../lib/setLocalColorModePreference'





describe('setLocalColorModePreference', () => {
	test('with defaults', () => {
		const newColorMode = 'dark'
		setLocalColorModePreference({}, newColorMode)

		const rootElement = document.querySelector('html')
		expect(rootElement.getAttribute('react-color-mode')).toEqual(newColorMode)
	})

	// test('with invalid color mode', () => {
	// 	expect(() => {
	// 		setLocalColorModePreference({}, 'bork')
	// 	}).toThrow()
	// })

	test('with custom storageKey', () => {
		const config = {
			storageKey: 'custom-storage-key',
		}
		const newColorMode = 'dark'
		setLocalColorModePreference(config, newColorMode)

		const rootElement = document.querySelector('html')
		expect(rootElement.getAttribute(config.storageKey)).toEqual(newColorMode)
	})
})
