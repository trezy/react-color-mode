// Module imports
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import progress from 'rollup-plugin-progress'
import resolve from '@rollup/plugin-node-resolve'





// Local imports
import pkg from './package.json'





export default [
	{
		external: ['react'],
		input: 'lib/index.js',
		output: [
			{
				file: pkg.main,
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: pkg.module,
				format: 'es',
				sourcemap: true,
			},
		],
		plugins: [
			progress(),
			resolve(),
			babel({
				babelHelpers: 'bundled',
				exclude: 'node_modules/**',
			}),
			commonjs({ include: ['node_modules/**'] }),
		],
	},
]
