const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ENV = process.env.NODE_ENV || 'development';

module.exports = {
	entry: resolve(__dirname, 'src', 'index.js'),
	output: {
		path: resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						}
					},
				],
			},
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader'
				}, {
					loader: 'less-loader'
				}]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
	],

	devtool: "source-map",

	mode: ENV,

	optimization: {
		minimize: ENV === 'production',
	},

	devServer: {
		contentBase: resolve(__dirname, 'dist'),
		compress: false,
		port: 9000
	},
};