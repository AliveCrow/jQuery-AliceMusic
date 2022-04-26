/*
 * @Description: 输入文件描述信息
 * @Author: liu-wb
 * @Date: 2021-12-11 13:10:20
 * @LastEditTime: 2022-01-27 13:41:54
 */
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: __dirname + '/dist/',
		filename: `main.[hash].js`,
	},
	devServer: {
		inline: false,
		contentBase: './dist',
	},
	plugins: [
		new HtmlWebpackPlugin({
			// title:'basd',
			filename: 'index.html',
			template: './index.html'
		})
	],

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('dart-sass')
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: "[hash].[ext]",
							publicPath: "assets/img/",
							outputPath: "assets/img/"
						}
					}
				]
			},
			{
				test: /\.html$/i,
				use: [{
					loader: "html-loader"
				}]
			}

		]
	},
}