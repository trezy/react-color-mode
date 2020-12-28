// Module imports
import {
	cleanup,
	fireEvent,
	render,
} from '@testing-library/react'
import React from 'react'
import renderer from 'react-test-renderer'





// Local imports
import {
	ColorModeContext,
	ColorModeContextProvider,
	useColorMode,
} from '../lib/ColorModeContext'
import { setLocalColorMode } from '../lib/setLocalColorMode'





describe('ColorModeContextProvider', () => {
	const testID = 'color-mode-context'
	const buttonTestID = `${testID}-button`

	describe('with Consumer', () => {
		function testUpdateColorModeWithConfig(testName, config) {
			test(testName, () => {
				// Force local color mode
				setLocalColorMode((config.defaultConfig || {}), config.initialColorMode)

				const { getByTestId } = render((
					<ColorModeContextProvider {...(config.defaultConfig || {})}>
						<ColorModeContext.Consumer>
							{({ colorMode, updateColorMode }) => (
								<>
									<div data-testid={testID}>{colorMode}</div>
									<button
										data-testid={buttonTestID}
										onClick={() => updateColorMode(config.updatedColorMode)} />
								</>
							)}
						</ColorModeContext.Consumer>
					</ColorModeContextProvider>
				))

				// Verify the initial color mode
				expect(getByTestId(testID).textContent).toEqual(config.initialColorMode)

				// Trigger switch to dark mode
				fireEvent.click(getByTestId(buttonTestID))

				// Verify that the color mode has been updated
				expect(getByTestId(testID).textContent).toEqual(config.updatedColorMode)
			})
		}

		testUpdateColorModeWithConfig('with defaults', {
			initialColorMode: 'system',
			updatedColorMode: 'dark',
		})

		testUpdateColorModeWithConfig('with custom storage key', {
			defaultConfig: {
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'system',
			updatedColorMode: 'dark',
		})

		testUpdateColorModeWithConfig('with custom default mode', {
			defaultConfig: {
				defaultMode: 'dark',
			},
			initialColorMode: 'system',
			updatedColorMode: 'light',
		})

		testUpdateColorModeWithConfig('with custom storage key and default mode', {
			defaultConfig: {
				defaultMode: 'dark',
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'system',
			updatedColorMode: 'light',
		})
	})

	describe('with useColorMode', () => {
		function testUpdateColorModeWithConfig(testName, config) {
			test(testName, () => {
				// Force local color mode
				setLocalColorMode((config.defaultConfig || {}), config.initialColorMode)

				function Consumer() {
					const { colorMode, updateColorMode } = useColorMode()

					return (
						<>
							<div data-testid={testID}>{colorMode}</div>
							<button
								data-testid={buttonTestID}
								onClick={() => updateColorMode(config.updatedColorMode)} />
						</>
					)
				}

				const { getByTestId } = render((
					<ColorModeContextProvider {...(config.defaultConfig || {})}>
						<Consumer />
					</ColorModeContextProvider>
				))


				// Verify the initial color mode
				expect(getByTestId(testID).textContent).toEqual(config.initialColorMode)

				// Trigger switch to dark mode
				fireEvent.click(getByTestId(buttonTestID))

				// Verify that the color mode has been updated
				expect(getByTestId(testID).textContent).toEqual(config.updatedColorMode)
			})
		}

		testUpdateColorModeWithConfig('with defaults', {
			initialColorMode: 'system',
			updatedColorMode: 'dark',
		})

		testUpdateColorModeWithConfig('with custom storage key', {
			defaultConfig: {
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'system',
			updatedColorMode: 'dark',
		})

		testUpdateColorModeWithConfig('with custom default mode', {
			defaultConfig: {
				defaultMode: 'dark',
			},
			initialColorMode: 'system',
			updatedColorMode: 'light',
		})

		testUpdateColorModeWithConfig('with custom storage key and default mode', {
			defaultConfig: {
				defaultMode: 'dark',
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'system',
			updatedColorMode: 'light',
		})
	})
})
