const {resolve} = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	// devtool: 'cheap-module-eval-source-map',
	devtool: 'inline-source-map',

	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./main.js',
		'./assets/stylus/index.styl'
	],

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'public'),
		publicPath: '/',
	},

	context: resolve(__dirname, 'app'),

	devServer: {
		hot: true,
		contentBase: resolve(__dirname, 'public'),
		publicPath: '/',
		historyApiFallback: true,
		port: 8080
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				loaders: [
					'babel-loader',
				],
				exclude: /node_modules/,
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{
							loader: 'stylus-loader',
							query: {
								sourceMap: false,
							},
						},
					],
				}),
			},
			{test: /\.(png|jpg)$/, use: 'url-loader?limit=15000'},
			{test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader'},
			{test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader?name=fonts/[name].[ext]'},
		]
	},
	//For request to work...https://github.com/request/request/issues/1529
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: `${__dirname}/app/index.html`,
			filename: 'index.html',
			inject: 'body',
		}),
		new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true}),
		new CopyWebpackPlugin([{from: 'vendors', to: 'vendors'}]),
		new webpack.HotModuleReplacementPlugin(),
	],
};

module.exports = config;
