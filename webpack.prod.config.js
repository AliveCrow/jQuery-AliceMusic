var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {merge} = require('webpack-merge')
const base = require('./webpack.base.config')
module.exports =merge(base,	{
	mode:'production',

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[name].[hash].css',
		})

	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				],
			},
		]
	}
})
