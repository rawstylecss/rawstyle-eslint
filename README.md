<div align="center">
	<img alt="logo" src=".github/logo.png" />
	<br>
	An ESLint plugin for <b>formatting CSS inside Rawstyle templates</b>
	<br><br>
	<p>
		<a href="https://www.npmjs.com/package/rawstyle-eslint"><img src="https://img.shields.io/npm/v/rawstyle-eslint?label=npm&logo=npm&style=flat-square&color=c8c9f1&labelColor=363a4f" alt="npm version"/></a>&nbsp;
		<a href="https://www.npmjs.com/package/rawstyle-eslint"><img src="https://img.badgesize.io/https://unpkg.com/rawstyle-eslint/dist/index.js?label=Size&logo=hackthebox&logoColor=c97026&style=flat-square&color=c8c9f1&labelColor=363a4f" alt="runtime size"/></a>&nbsp;
		<a href="https://github.com/rawstylecss/rawstyle-eslint/blob/master/LICENSE"><img src="https://img.shields.io/github/license/rawstylecss/rawstyle-eslint?style=flat-square&label=%F0%9F%9B%A1%EF%B8%8F%20License&color=c8c9f1&labelColor=363a4f" alt="license"></a>&nbsp;
		<a href="https://github.com/rawstylecss/rawstyle-eslint/issues?q=is%3Aissue+is%3Aopen+label%3Abug"><img src="https://img.shields.io/github/issues/rawstylecss/rawstyle-eslint/bug?label=%F0%9F%90%9B%20Bugs&style=flat-square&color=c8c9f1&labelColor=363a4f" alt="bugs"></a>
	</p>
	<p><b>
		<a href="#-features">Features</a>&nbsp; •&nbsp;
		<a href="#%EF%B8%8F-setup">Setup</a>&nbsp; •&nbsp;
		<a href="#-rules">Rules</a>
	</b></p>
	<img alt="demo" src=".github/demo.png" />
</div>

## 🔥 Features

- **✏️ Indentation:** enforce consistent indentation in CSS templates
- **🧹 Trailing Whitespace:** remove trailing whitespace in CSS blocks
- **⚡ Auto-fixable:** seamless integration with editor and CLI autofix
- **💎 Vanilla CSS Support:** the plugin can also be applied to regular `.css` files

## ⚙️ Setup

1. Install the plugin:

```bash
pnpm add -D rawstyle-eslint
```

2. Add the plugin to your ESLint configuration:

```ts
import rawstyle from 'rawstyle-eslint'
// ...
export default defineConfig([
	// via the recommended config:
	{
		name: 'Rawstyle Rules',
		files: ['**/*.ts?(x)'],
		extends: [rawstyle.configs.recommended],
		// plugins: { rawstyle }, // not necessary when using the recommended config
		rules: { 'rawstyle/indent': 'off' }, // can still override rules here
	},
	// or directly:
	{
		name: 'Rawstyle Rules',
		files: ['**/*.ts?(x)'],
		plugins: { rawstyle },
		rules: {
			'rawstyle/indent': 'error',
			'rawstyle/no-trailing-whitespace': 'error',
		},
	},
	// for vanilla CSS files:
	{
		name: 'CSS Rules',
		files: ['**/*.css'],
		language: 'rawstyle/css', // do not specify this if you're using
		// the `@eslint/css` plugin and have already set
		// the `language` for `**/*.css` files
		extends: [rawstyle.configs.recommended],
	},
])
```

> [!WARNING]
> Do not mix `.ts(x)` and `.css` file patterns in the same config object (e.g. `files: ['**/*.{ts,tsx,css}']`) — CSS files require a different parser.

> [!NOTE]
> Make sure you are using the `@typescript-eslint` plugin to enable ESLint support for `.ts(x)` files.

## 🧩 Rules

💼 – set in the `recommended` configuration  
🔧 – automatically fixable

| Rule Name | Description | 💼 | 🔧 |
|-----------|-------------|----|-----|
| `indent` | Enforce consistent indentation | ✔️ | ✔️ |
| `no-trailing-whitespace` | Disallow trailing whitespace | ✔️ | ✔️ |

<br>

<div align="center">
	<b>MIT License © 2026 <a href="https://github.com/rawstylecss">Rawstyle</a></b>
</div>