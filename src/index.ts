import { css } from './css-lang'
import { indent } from './rules'
import type { Plugin } from '@eslint/core'
import type { RawstyleEslintPlugin } from '@/types'

const plugin: Plugin = {
	meta: { name: 'rawstyle-eslint', version: '0.0.0' },
	languages: { css },
	rules: { indent },
}

plugin.configs = {
	recommended: {
		plugins: { rawstyle: plugin },
		rules: {
			'rawstyle/indent': 'error',
		},
	},
}

export default plugin as RawstyleEslintPlugin