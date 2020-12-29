// Local imports
import { getColorModeAttributeKey } from '../lib/getColorModeAttributeKey'





describe('getColorModeAttributeKey', () => {
	test('with defaults', () => {
		expect(getColorModeAttributeKey({})).toEqual('react-color-mode')
	})

	test('with custom storage key', () => {
		const config = {
			storageKey: 'custom-storage-key',
		}
		expect(getColorModeAttributeKey(config)).toEqual(config.storageKey)
	})
})
