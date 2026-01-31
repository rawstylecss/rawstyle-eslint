import type { Plugin } from '@eslint/core'
import { css } from './css-lang'
import { indent } from './rules'

const plugin: Plugin = {
	meta: { name: 'rawstyle-eslint', version: '0.0.0' },
	languages: { css },
	rules: { indent },
}

export default plugin