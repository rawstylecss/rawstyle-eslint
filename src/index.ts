import { css } from './css-lang'
import { indent, noTrailingWhitespace } from './rules'
import type { Plugin } from '@eslint/core'
import type { RawstyleEslintPlugin } from '@/types'

const plugin: Plugin = {
	meta: { name: 'rawstyle-eslint', version: '0.1.0' },
	languages: { css },
	rules: {
		indent,
		'no-trailing-whitespace': noTrailingWhitespace,
	},
}

plugin.configs = {
	recommended: {
		plugins: { rawstyle: plugin },
		rules: {
			'rawstyle/indent': 'error',
			'rawstyle/no-trailing-whitespace': 'error',
		},
	},
}

export default plugin as RawstyleEslintPlugin