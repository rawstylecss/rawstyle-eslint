import type { Plugin } from '@eslint/core'
import { css } from './css-lang'
import { indent } from './rules'

export default {
	meta: { name: 'rawstyle-eslint', version: '0.0.0' },
	languages: { css },
	rules: { indent },
} satisfies Plugin