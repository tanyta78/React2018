import React, { Component } from 'react';
import '../../styles/course.css';
import '../../styles/submit.css';

import Navigation from '../common/Navigation';
import CourseEditForm from './CourseEditForm';

export default class CourseEditPage extends Component {

	render() {
		
		return (
			<div>
				<Navigation />
				<section id="viewPostCreate">
					<CourseEditForm {...this.props}/>
				</section>
			</div>
		);
	}
}