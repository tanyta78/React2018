import React, { Component } from 'react';

import '../../../styles/all.css';

import Navigation from '../../common/Navigation';
import CourseCreateForm from './CourseCreateForm';

export default class CourseCreatePage extends Component {

	render() {
		
		return (
			<div>
				<Navigation />
				<section id="viewPostCreate">
					<CourseCreateForm {...this.props}/>
				</section>
			</div>
		);
	}
}