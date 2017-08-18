import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './views/App/App';
import Dashboard from './views/Dashboard/Dashboard'
import NotFound from './views/404'

export default class Root extends Component {
	render() {
		return (
			<Router>
				<App>
					<Switch>
						<Route exact path="/" component={Dashboard}/>
						<Route path="*" component={NotFound} />
					</Switch>
				</App>
			</Router>
		);
	}
}

