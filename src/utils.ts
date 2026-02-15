import { TEMPLATE_PATTERN } from 'rawstyle'
import type { RuleContext, RuleDefinition } from '@eslint/core'

export const createRule = (
	report: (
		source: string,
		context: RuleContext,
		options: {
			lineOffset: number
			charOffset: number
			initLevel: number
			isTemplate: boolean
		},
	) => void,
): RuleDefinition => ({
	meta: { fixable: 'code' },
	create(context) {
		if (!('text' in context.sourceCode)) return {}
		const source = context.sourceCode.text

		if (context.filename.endsWith('.css')) {
			report(source, context, { lineOffset: 0, charOffset: 0, initLevel: 0, isTemplate: false })
		} else {
			for (const match of source.matchAll(TEMPLATE_PATTERN)) {
				const charOffset = source.indexOf('`', match.index) + 1
				const lineOffset = source.slice(0, charOffset).split('\n').length - 1

				const startLine = source.lastIndexOf('\n', charOffset - 1) + 1
				const indent = ((/^\s*/.exec(source.slice(startLine, charOffset)))?.[0].length ?? 0) + 1

				report(match[1], context, { lineOffset, charOffset, initLevel: indent, isTemplate: true })
			}
		}

		return {}
	},
})