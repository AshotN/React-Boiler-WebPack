require('babel-core/register');

const port = 9532;

const path = require('path');
const webpack = require('webpack');
const express = require('express');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const WebpackDevServer = require('webpack-dev-server');
const apiFallback = require('connect-history-api-fallback');
const config = require('../webpack.config');
let proxy = require('proxy-middleware');
let url = require('url');

const app = express();

if (process.env.NODE_ENV === 'development') {
	const compiler = webpack(config);

	app.use(apiFallback());
	// app.use(WebpackDevMiddleware(compiler, config.devServer));
	let server = new WebpackDevServer(webpack(config), config.devServer);
	server.listen(config.devServer.port, 'localhost', function(err) {});
	app.use(WebpackHotMiddleware(compiler));
	app.use('/', proxy(url.parse('http://localhost:9533/')));
	// app.get("*", function (req, res) {
	// 	res.sendFile(path.join(__dirname, "../public/index.html"));
	// });
}

if (process.env.NODE_ENV === 'production') {
	//TODO
	// const indexPath = path.resolve(__dirname, '../dist/index.html');
	// app.get('/', (req, res) => res.sendFile(indexPath));
}
// app.use(express.static(path.resolve(__dirname, '../static/')));

app.listen(port, 'localhost', function (err) {
	if (err) {
		console.log(err)
	}
	console.log('Listening on localhost:' + port)
});
