import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../api/requester';
import observer from '../../api/observer';

export default class DeleteComment extends Component {

	deleteComment() {
		let commentId=this.props.match.params.id;
		let postId=this.props.location.postId;
		console.log(postId);
		
		requester.remove('appdata', `comments/${commentId}`, 'kinvey')
			.then(res => {
		
			// to handle success
				observer.trigger(observer.events.notification, { type: 'success', message: 'Successfully delete comment!' });
				//to redirect to updated post details
				
			
			})
			.catch(err => {
			//to handle err
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render(){
		this.deleteComment();
		let postId=this.props.location.postId;
		
		return <Redirect to={`/post/details/${postId}`}/>;
	}

}
