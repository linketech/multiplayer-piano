module.exports = {
	env: {
		es6: true,
		node: true,
		browser: true,
		jquery: true,
	},
	extends: 'airbnb-base',
	root: true,
	rules: {
		'no-tabs': 0,
		indent: [
			'error',
			'tab',
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		semi: [
			'error',
			'never',
		],
		'object-curly-newline': 0,
	},
}
