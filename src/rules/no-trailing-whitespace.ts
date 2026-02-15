import { createRule } from '../utils'

export const noTrailingWhitespace = createRule((source, context, { lineOffset, charOffset, isTemplate }) => {
	for (const match of source.matchAll(/^(?!\/\/).*?([ \t]+)$/gm)) {
		const [fullLine, trailingWs] = [match[0], match[1]]

		if (isTemplate && match.index + fullLine.length === source.length && !fullLine.trim().length) continue

		const lineNum = source.slice(0, match.index).split('\n').length
		const wsStartColumn = fullLine.length - trailingWs.length
		const wsEndColumn = fullLine.length

		context.report({
			message: `Trailing whitespace`,
			loc: {
				start: { line: lineNum + lineOffset, column: wsStartColumn },
				end: { line: lineNum + lineOffset, column: wsEndColumn },
			},
			fix: fixer => fixer.removeRange([
				charOffset + match.index + wsStartColumn,
				charOffset + match.index + wsEndColumn,
			]),
		})
	}
})