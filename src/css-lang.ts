import type { Language } from '@eslint/core'

export const css: Language = {
	fileType: 'text',
	lineStart: 1,
	columnStart: 1,
	nodeTypeKey: 'type',
	visitorKeys: {},
	validateLanguageOptions: () => undefined,
	parse: () => {
		return {
			ok: true,
			ast: {},
		}
	},
	createSourceCode: file => {
		return {
			ast: {},
			text: typeof file.body === 'string' ? file.body : '',
			getLoc: () => ({
				start: { line: 0, column: 0 },
				end: { line: 0, column: 0 },
			}),
			getRange: () => [0, 0],
			traverse: () => [],
		}
	},
}