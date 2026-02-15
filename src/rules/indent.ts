import { createRule } from '../utils'

export const indent = createRule((source, context, { lineOffset, charOffset, initLevel }) => {
	const indentStyle = '\t'
	let level = initLevel

	const lines = source.split('\n')
	if (lines.length < 2) return

	for (let i = 1; i <= lines.length; i++) {
		const line = lines[i - 1]
		const trimmed = line.trim()

		if (!trimmed || trimmed.startsWith('//')) {
			charOffset += line.length + 1
			continue
		}

		let expectedLevel = level
		if (trimmed.startsWith('}')) expectedLevel = Math.max(initLevel, level - 1)

		const expectedIndent = indentStyle.repeat(expectedLevel)
		const actualIndent = (/^\s*/.exec(line))?.[0] ?? ''

		if (actualIndent !== expectedIndent) {
			context.report({
				message: `Incorrect indentation`,
				loc: {
					start: { line: lineOffset + i, column: 0 },
					end: { line: lineOffset + i, column: actualIndent.length + 1 - initLevel },
				},
				fix: fixer => fixer.replaceTextRange(
					[charOffset, charOffset + actualIndent.length],
					expectedIndent,
				),
			})
		}

		const openBraces = (line.match(/\{/g) ?? []).length
		const closeBraces = (line.match(/\}/g) ?? []).length
		level += openBraces - closeBraces
		level = Math.max(initLevel, level)
		charOffset += line.length + 1
	}
})