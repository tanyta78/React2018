import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

import observer from '../../../api/observer';
import c from '../../../api/constants';

import courseService from '../../../services/courseService';

export default class CourseDelete extends Component {
	deleteCourse() {
		let courseId=this.props.match.params.id;
		
		courseService.deleteCourse(courseId)
			.then(res => {	
				observer.trigger(observer.events.notification, {type:'success',message:c.COURSE_DELETE_SUCCESS});

			}).catch(err => {
				//handle err msg
				console.log(err);
				observer.trigger(observer.events.notification, {type:'error',message:err.responseJSON.description });
				
			});
	}

	render(){
		this.deleteCourse();
		
		return <Redirect to='/myCourses'/>;
	}

}
