import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import App from '../../app/views/App/App';
import Dashboard from '../../app/views/Dashboard/Dashboard';

describe('<App />', () => {
	let wrapper;

	it('should exist', () => {
		wrapper = shallow(<App />);
		expect(wrapper).to.exist;
	});

	it("should have one header", () => {
		wrapper = shallow(<App />);
		expect(wrapper.find('header')).to.have.length(1);
	});

	it("should have one heading", () => {
		wrapper = shallow(<Dashboard />);
		expect(wrapper.find('h3')).to.have.length(1);
	});
});