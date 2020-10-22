var path = require ('path')
var HtmlWebpackPlugin = require ('html-webpack-plugin')


module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve (__dirname, 'dist'),
		filename: `main.[hash].js`
	},

	plugins: [
		new HtmlWebpackPlugin ({
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
							implementation: require ('dart-sass')
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
	}

}