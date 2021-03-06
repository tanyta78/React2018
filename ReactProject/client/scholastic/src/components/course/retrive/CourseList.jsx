import React, { Component } from 'react';

import '../../../styles/all.css';

import c from '../../../api/constants';
import courseService from '../../../services/courseService';

import Course from './Course';

export default class CourseList extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			courses: [] 
		};
	}

	componentDidMount() {
		let endpoint = this.props.author ? `courses?query={"_acl.creator":"${sessionStorage.userId}"}&sort={"_kmd.ect": -1}`:'courses?query={"approved":"true"}&sort={"_kmd.ect": -1}';

		if(this.props.admin){
			endpoint='courses?query={"approved":"false"}&sort={"_kmd.ect": -1}';
		}

		if(this.props.all){
			endpoint='courses?sort={"_kmd.ect": -1}';
		}

		if(this.props.limit){
			endpoint=(`courses?query={"approved":"true"}&sort={"_kmd.ect": -1}&limit=${c.LIMIT_COURSE_SHOWN}`);
		}
		
		courseService.loadAllApprovedCourses(endpoint)
			.then(res => {
				this.setState({ courses: res });
			});

	}
       
	render() {
	
		return (
			<section id="viewCatalog">
				
				{this.state.courses.map((p, i) =>
					<Course key={p._id} rank={i+1} courseId={p._id} {...p} />				
				)}
			</section>
		);
	}
}