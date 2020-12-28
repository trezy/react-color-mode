// Module imports
import {
	cleanup,
	fireEvent,
	render,
} from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'





// Local imports
import { ColorModeScript } from '../lib/ColorModeScript'





describe('ColorModeScript', () => {
	test('with defaults', () => {
		const colorMode = 'system'
		const storageKey = 'next-color-mode'
		const testID = 'color-mode-script'
		const { getByTestId } = render(
			<ColorModeScript data-testid={testID} />
		)

		const rootElement = document.querySelector('html')

		// Verify that the script tag is added to the DOM
		expect(getByTestId(testID)).toBeTruthy()

		// TODO: Figure out how to get <script> tags to execute
		// Verify that the script tag has fired
		// expect(rootElement.getAttribute(storageKey)).toEqual(colorMode)
		// expect(window.localStorage.getItem(storageKey)).toEqual(colorMode)
	})

	// TODO: Figure out how to get <script> tags to execute
	xtest('with custom storage key', () => {
		const colorMode = 'system'
		const storageKey = 'custom-storage-key'
		const testID = 'color-mode-script'
		const { getByTestId } = render(
			<ColorModeScript
				data-testid={testID}
				storageKey={storageKey} />
		)

		const rootElement = document.querySelector('html')

		// Verify that the script tag is added to the DOM
		expect(getByTestId(testID)).toBeTruthy()

		// Verify that the script tag has fired
		expect(rootElement.getAttribute(storageKey)).toEqual(colorMode)
		expect(window.localStorage.getItem(storageKey)).toEqual(colorMode)
	})

	// TODO: Figure out how to get <script> tags to execute
	xtest('with custom default mode', () => {
		const colorMode = 'dark'
		const storageKey = 'next-color-mode'
		const testID = 'color-mode-script'
		const { getByTestId } = render(
			<ColorModeScript
				data-testid={testID}
				defaultMode={colorMode} />
		)

		const rootElement = document.querySelector('html')

		// Verify that the script tag is added to the DOM
		expect(getByTestId(testID)).toBeTruthy()

		// Verify that the script tag has fired
		expect(rootElement.getAttribute(storageKey)).toEqual(colorMode)
		expect(window.localStorage.getItem(storageKey)).toEqual(colorMode)
	})

	// TODO: Figure out how to get <script> tags to execute
	xtest('with custom storage key and default mode', () => {
		const colorMode = 'dark'
		const storageKey = 'custom-storage-key'
		const testID = 'color-mode-script'
		const { getByTestId } = render(
			<ColorModeScript
				data-testid={testID}
				defaultMode={colorMode}
				storageKey={storageKey} />
		)

		const rootElement = document.querySelector('html')

		// Verify that the script tag is added to the DOM
		expect(getByTestId(testID)).toBeTruthy()

		// Verify that the script tag has fired
		expect(rootElement.getAttribute(storageKey)).toEqual(colorMode)
		expect(window.localStorage.getItem(storageKey)).toEqual(colorMode)
	})
})
