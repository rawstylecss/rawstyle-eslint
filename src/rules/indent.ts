import type { RuleContext, RuleDefinition } from '@eslint/core'

export const indent: RuleDefinition = {
	meta: { fixable: 'code' },
	create(context) {
		if (!('text' in context.sourceCode)) return {}
		const source = context.sourceCode.text

		if (context.filename.endsWith('.css')) {
			report(source, context)
		} else {
			const regex = /\bg?css`(.*?)`/gs
			let match: RegExpExecArray | null
			while ((match = regex.exec(source))) {
				const charOffset = source.indexOf('`', match.index) + 1
				const lineOffset = source.slice(0, charOffset).split('\n').length - 1
				report(match[1], context, lineOffset, charOffset, 1)
			}
		}

		return {}
	},
}

const report = (
	source: string,
	context: RuleContext,
	lineOffset = 0,
	charOffset = 0,
	initLevel = 0,
) => {
	const indentStyle = '\t'
	let level = initLevel

	const lines = source.split('\n')
	if (lines.length < 2) return

	for (let i = 1; i <= lines.length; i++) {
		const line = lines[i - 1]
		const trimmed = line.trim()

		if (!trimmed) {
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
					start: { line: lineOffset + i, column: initLevel },
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
}