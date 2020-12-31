// Module imports
import {
	act,
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
import { setLocalColorModePreference } from '../lib/setLocalColorModePreference'





describe('ColorModeContextProvider', () => {
	const testID = 'color-mode-context'
	const buttonTestID = `${testID}-button`

	beforeAll(() => {
		Object.defineProperty(window, 'matchMediaListeners', {
			writable: true,
			value: {},
		})

		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation(query => ({
				matches: false,
				media: query,
				addEventListener: jest.fn().mockImplementation((eventType, f) => {
					if (!window.matchMediaListeners[eventType]) {
						window.matchMediaListeners[eventType] = []
					}
					window.matchMediaListeners[eventType].push(f)
				}),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn().mockImplementation((eventType, eventData) => {
					if (window.matchMediaListeners[eventType]) {
						window.matchMediaListeners[eventType].forEach(f => f(eventData))
					}
				}),
			})),
		})
	})

	describe('with Consumer', () => {
		function testUpdateColorModePreferenceWithConfig(testName, config) {
			test(testName, () => {
				// Force local color mode
				setLocalColorModePreference((config.defaultConfig || {}), config.initialColorModePreference)

				const { getByTestId } = render((
					<ColorModeContextProvider {...(config.defaultConfig || {})}>
						<ColorModeContext.Consumer>
							{state => {
								const {
									colorMode,
									colorModePreference,
									systemColorMode,
									updateColorModePreference,
								} = state

								return (
									<>
										<div data-testid={`${testID}-colorMode`}>{colorMode}</div>
										<div data-testid={`${testID}-systemColorMode`}>{systemColorMode}</div>
										<div data-testid={`${testID}-colorModePreference`}>{colorModePreference}</div>
										<button
											data-testid={buttonTestID}
											onClick={() => updateColorModePreference(config.updatedColorModePreference)} />
									</>
								)
							}}
						</ColorModeContext.Consumer>
					</ColorModeContextProvider>
				))

				// Verify the initial color mode
				expect(getByTestId(`${testID}-colorMode`).textContent).toEqual(config.initialColorMode)
				expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual(config.systemColorMode)
				expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual(config.initialColorModePreference)

				// Trigger switch to dark mode
				fireEvent.click(getByTestId(buttonTestID))

				// Verify that the color mode has been updated
				expect(getByTestId(`${testID}-colorMode`).textContent).toEqual(config.updatedColorMode)
				expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual(config.systemColorMode)
				expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual(config.updatedColorModePreference)
			})
		}

		testUpdateColorModePreferenceWithConfig('with defaults', {
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'dark',
			updatedColorModePreference: 'dark',
		})

		testUpdateColorModePreferenceWithConfig('with custom storage key', {
			defaultConfig: {
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'dark',
			updatedColorModePreference: 'dark',
		})

		testUpdateColorModePreferenceWithConfig('with custom default mode', {
			defaultConfig: {
				defaultMode: 'dark',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'light',
			updatedColorModePreference: 'light',
		})

		testUpdateColorModePreferenceWithConfig('with custom storage key and default mode', {
			defaultConfig: {
				defaultMode: 'dark',
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'light',
			updatedColorModePreference: 'light',
		})

		test('settings update when system color mode changes', () => {
			// Force local color mode preference
			setLocalColorModePreference({}, 'system')

			const { getByTestId } = render((
				<ColorModeContextProvider>
					<ColorModeContext.Consumer>
						{state => {
							const {
								colorMode,
								colorModePreference,
								systemColorMode,
							} = state

							return (
								<>
									<div data-testid={`${testID}-colorMode`}>{colorMode}</div>
									<div data-testid={`${testID}-systemColorMode`}>{systemColorMode}</div>
									<div data-testid={`${testID}-colorModePreference`}>{colorModePreference}</div>
								</>
							)
						}}
					</ColorModeContext.Consumer>
				</ColorModeContextProvider>
			))

			// Verify the initial color mode
			expect(getByTestId(`${testID}-colorMode`).textContent).toEqual('light')
			expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual('light')
			expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual('system')

			// Trigger switch to dark mode
			act(() => {
				window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent('change', { matches: true })
			})

			// Verify that the color mode has been updated
			expect(getByTestId(`${testID}-colorMode`).textContent).toEqual('dark')
			expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual('dark')
			expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual('system')
		})
	})

	describe('with useColorMode', () => {
		function testUpdateColorModePreferenceWithConfig(testName, config) {
			test(testName, () => {
				// Force local color mode
				setLocalColorModePreference((config.defaultConfig || {}), config.initialColorMode)

				function Consumer() {
					const {
						colorMode,
						colorModePreference,
						systemColorMode,
						updateColorModePreference,
					} = useColorMode()

					return (
						<>
							<div data-testid={`${testID}-colorMode`}>{colorMode}</div>
							<div data-testid={`${testID}-systemColorMode`}>{systemColorMode}</div>
							<div data-testid={`${testID}-colorModePreference`}>{colorModePreference}</div>
							<button
								data-testid={buttonTestID}
								onClick={() => updateColorModePreference(config.updatedColorModePreference)} />
						</>
					)
				}

				const { getByTestId } = render((
					<ColorModeContextProvider {...(config.defaultConfig || {})}>
						<Consumer />
					</ColorModeContextProvider>
				))

				// Verify the initial color mode
				expect(getByTestId(`${testID}-colorMode`).textContent).toEqual(config.initialColorMode)
				expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual(config.systemColorMode)
				expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual(config.initialColorModePreference)

				// Trigger switch to dark mode
				fireEvent.click(getByTestId(buttonTestID))

				// Verify that the color mode has been updated
				expect(getByTestId(`${testID}-colorMode`).textContent).toEqual(config.updatedColorMode)
				expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual(config.systemColorMode)
				expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual(config.updatedColorModePreference)
			})
		}

		testUpdateColorModePreferenceWithConfig('with defaults', {
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'dark',
			updatedColorModePreference: 'dark',
		})

		testUpdateColorModePreferenceWithConfig('with custom storage key', {
			defaultConfig: {
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'dark',
			updatedColorModePreference: 'dark',
		})

		testUpdateColorModePreferenceWithConfig('with custom default mode', {
			defaultConfig: {
				defaultMode: 'dark',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'light',
			updatedColorModePreference: 'light',
		})

		testUpdateColorModePreferenceWithConfig('with custom storage key and default mode', {
			defaultConfig: {
				defaultMode: 'dark',
				storageKey: 'custom-storage-key',
			},
			initialColorMode: 'light',
			initialColorModePreference: 'system',
			systemColorMode: 'light',
			updatedColorMode: 'light',
			updatedColorModePreference: 'light',
		})

		test('settings update when system color mode changes', () => {
			// Force local color mode preference
			setLocalColorModePreference({}, 'system')

			function Consumer() {
				const {
					colorMode,
					colorModePreference,
					systemColorMode,
					updateColorModePreference,
				} = useColorMode()

				return (
					<>
						<div data-testid={`${testID}-colorMode`}>{colorMode}</div>
						<div data-testid={`${testID}-systemColorMode`}>{systemColorMode}</div>
						<div data-testid={`${testID}-colorModePreference`}>{colorModePreference}</div>
						<button
							data-testid={buttonTestID}
							onClick={() => updateColorModePreference(config.updatedColorMode)} />
					</>
				)
			}

			const { getByTestId } = render((
				<ColorModeContextProvider>
					<Consumer />
				</ColorModeContextProvider>
			))

			// Verify the initial color mode
			expect(getByTestId(`${testID}-colorMode`).textContent).toEqual('light')
			expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual('light')
			expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual('system')

			// Trigger switch to dark mode
			act(() => {
				window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent('change', { matches: true })
			})

			// Verify that the color mode has been updated
			expect(getByTestId(`${testID}-colorMode`).textContent).toEqual('dark')
			expect(getByTestId(`${testID}-systemColorMode`).textContent).toEqual('dark')
			expect(getByTestId(`${testID}-colorModePreference`).textContent).toEqual('system')
		})
	})
})
