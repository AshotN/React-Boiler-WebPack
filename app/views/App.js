import React, {Component} from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<div>
				<header>
					<div>Our Dank Ass Stock Anaylzing Tool</div>
				</header>
				{this.props.children}
			</div>
		);
	}
}

