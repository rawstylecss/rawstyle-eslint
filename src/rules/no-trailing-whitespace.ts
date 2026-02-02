import type { RuleContext, RuleDefinition } from '@eslint/core'
import { TEMPLATE_PATTERN } from 'rawstyle'

export const noTrailingWhitespace: RuleDefinition = {
	meta: { fixable: 'code' },
	create(context) {
		if (!('text' in context.sourceCode)) return {}
		const source = context.sourceCode.text

		if (context.filename.endsWith('.css')) {
			report(source, context, 0, 1)
		} else {
			for (const match of source.matchAll(TEMPLATE_PATTERN)) {
				const charOffset = source.indexOf('`', match.index) + 1
				const lineOffset = source.slice(0, charOffset).split('\n').length - 1
				report(match[1], context, lineOffset, 0, charOffset)
			}
		}

		return {}
	},
}

const report = (source: string, context: RuleContext, lineOffset = 0, columnOffset = 0, charOffset = 0) => {
	for (const match of source.matchAll(/^.*?([ \t]+)$/gm)) {
		const [fullLine, trailingWs] = [match[0], match[1]]
		const lineNum = source.slice(0, match.index).split('\n').length
		const wsStartColumn = fullLine.length - trailingWs.length
		const wsEndColumn = fullLine.length

		context.report({
			message: `Trailing whitespace`,
			loc: {
				start: { line: lineNum + lineOffset, column: wsStartColumn + columnOffset },
				end: { line: lineNum + lineOffset, column: wsEndColumn + columnOffset },
			},
			fix: fixer => fixer.removeRange([
				charOffset + match.index + wsStartColumn,
				charOffset + match.index + wsEndColumn,
			]),
		})
	}
}