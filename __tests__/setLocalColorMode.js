// Local imports
import { setLocalColorMode } from '../lib/setLocalColorMode'





describe('setLocalColorMode', () => {
	test('with defaults', () => {
		const newColorMode = 'dark'
		setLocalColorMode({}, newColorMode)

		const rootElement = document.querySelector('html')
		expect(rootElement.getAttribute('react-color-mode')).toEqual(newColorMode)
	})

	// test('with invalid color mode', () => {
	// 	expect(() => {
	// 		setLocalColorMode({}, 'bork')
	// 	}).toThrow()
	// })

	test('with custom storageKey', () => {
		const config = {
			storageKey: 'custom-storage-key',
		}
		const newColorMode = 'dark'
		setLocalColorMode(config, newColorMode)

		const rootElement = document.querySelector('html')
		expect(rootElement.getAttribute(config.storageKey)).toEqual(newColorMode)
	})
})
