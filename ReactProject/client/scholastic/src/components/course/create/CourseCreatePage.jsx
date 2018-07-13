import React, { Component } from 'react';
import '../../styles/course.css';
import '../../styles/submit.css';

import Navigation from '../common/Navigation';
import CourseCreateForm from './CourseCreateForm';

export default class CourseCreatePage extends Component {

	render() {
		console.log(this.props);
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