import type { Plugin, ConfigObject } from '@eslint/core'

export interface RawstyleEslintPlugin extends Plugin {
	configs: {
		recommended: ConfigObject
	}
}