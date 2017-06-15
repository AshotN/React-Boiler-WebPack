import React, {Component} from 'react';
import {BrowserRouter as Router, Route, IndexRoute} from 'react-router-dom';
import App from './views/App';
import Dashboard from './views/Dashboard'

export default class Root extends Component {
	render() {
		return (
			<Router>
				<App>
					<Route exact path="/" component={Dashboard}/>
				</App>
			</Router>
		);
	}
}

