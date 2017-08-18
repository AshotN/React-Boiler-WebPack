const {resolve} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
	devtool: 'cheap-module-source-map',

	entry: [
		'./main.js',
		'./assets/stylus/index.styl',
	],

	context: resolve(__dirname, 'app'),

	output: {
		filename: 'bundle.js',
		path: resolve(__dirname, 'dist'),
		publicPath: '/',
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: `${__dirname}/app/index.html`,
			filename: 'index.html',
			inject: 'body',
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true,
			},
			compress: {
				screw_ie8: true,
			},
			comments: false,
		}),
		new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify('production')}}),
		new ExtractTextPlugin({filename: 'style.css', disable: false, allChunks: true}),
		new CopyWebpackPlugin([{from: './vendors', to: 'vendors'}]),
	],

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.styl$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						'css-loader',
						{loader: 'stylus-loader', query: {sourceMap: false}},
					],
				}),
			},
			{test: /\.(png|jpg)$/, use: 'url-loader?limit=15000'},
			{test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader'},
			{test: /\.(eot|svg|ttf|woff|woff2)$/, use: 'file-loader?name=public/fonts/[name].[ext]'},

		]
	},
	//For request to work...https://github.com/request/request/issues/1529
	node: {
		console: true,
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};

module.exports = config;
