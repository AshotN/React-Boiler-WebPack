import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import Root from './Router';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.getElementById('root'),
	);
};

render(Root);

if(module.hot) {
	module.hot.accept('./Router', () => {
		const newApp = require('./Router').default;
		render(newApp);
	});

	//Hot reloading for CSS
	let hotEmitter = require("webpack/hot/emitter");
	hotEmitter.on("webpackHotUpdate", function(currentHash) {
		document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
			const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
			link.href = nextStyleHref
		})
	})
}