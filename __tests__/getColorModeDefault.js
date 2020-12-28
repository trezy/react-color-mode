// Local imports
import { getColorModeDefault } from '../lib/getColorModeDefault'





describe('getColorModeDefault', () => {
	test('with defaults', () => {
		expect(getColorModeDefault({})).toEqual('system')
	})

	test('with custom default mode', () => {
		const config = {
			defaultMode: 'dark',
		}
		expect(getColorModeDefault(config)).toEqual(config.defaultMode)
	})
})
