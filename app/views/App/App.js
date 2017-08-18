import React, {Component} from 'react';

export default class AppView extends Component {
	constructor(props) {
		super(props);

		this.state = {}
	}

	render() {
		return (
			<div className='main'>
				<header>
					<div className='title'>Our Boiler</div>
				</header>
				<div className='children'>
					{this.props.children}
				</div>
			</div>
		);
	}
}

