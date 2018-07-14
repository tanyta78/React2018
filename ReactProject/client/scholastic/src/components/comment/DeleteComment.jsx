import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../api/requester';
import observer from '../../api/observer';
import c from '../../api/constants';


export default class DeleteComment extends Component {

	deleteComment() {
		let commentId=this.props.match.params.id;
		let courseId=this.props.location.courseId;
		console.log(courseId);
		
		requester.remove('appdata', `comments/${commentId}`, 'kinvey')
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message:c.COMMENT_DELETE_SUCCESS });
											
			})
			.catch(err => {
			
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render(){
		this.deleteComment();
		let courseId=this.props.location.courseId;
		
		return <Redirect to={`/course/details/${courseId}`}/>;
	}

}
