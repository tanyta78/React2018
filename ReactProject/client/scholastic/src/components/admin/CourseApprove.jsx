import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import observer from '../../api/observer';
import requester from '../../api/requester';
import c from '../../api/constants';

import '../../styles/all.css';

import courseService from '../../services/courseService';


export default class CourseApprove extends Component {
	constructor(props) {
		super(props);

		this.state = {
			authorId: '',
			categoryId: '',
			description: '',
			duration: '',
			imageUrl: '',
			place: '',
			price: '',
			views: 0,
			likes: 0,
			approved: false
		};
	}

	approveCourse() {
		let courseId=this.props.match.params.id;
			
		courseService.loadCourseById(courseId)
			.then(res => {
				
				let updatedCourseObj = {
					id: courseId,
					authorId: res.authorId,
					categoryId:res.categoryId,
					description: res.description,
					duration: res.duration,
					imageUrl: res.imageUrl,
					place: res.place,
					price: res.price,
					views: res.views,
					likes: res.likes,
					approved: true
				};
			
				requester.update('appdata',`courses/${courseId}`,'admin',updatedCourseObj).then(res=>{
					observer.trigger(observer.events.notification, { type: 'success', message:c.COURSE_APPROVE_SUCCESS });
				});			
											
			})
			.catch(err => {
			
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render(){
		this.approveCourse();
		
		return <Redirect to={'/course/approve'}/>;
	}

}
