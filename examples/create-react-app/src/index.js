import './index.css'

import {
	ColorModeContextProvider,
	ColorModeScript,
} from 'next-color-mode'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

ReactDOM.render(
	(
		<>
			<ColorModeScript />
			<ColorModeContextProvider>
				<App />
			</ColorModeContextProvider>
		</>
	),
	document.getElementById('root')
)
