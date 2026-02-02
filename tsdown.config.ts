import type { UserConfig } from 'tsdown'

const isProd = process.argv.includes('--prod')

export default {
	minify: isProd,
	sourcemap: isProd ? false : 'inline',
	noExternal: ['rawstyle'],
	fixedExtension: false,
	inlineOnly: false,
} satisfies UserConfig