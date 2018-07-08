import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import requester from '../../api/requester';
import observer from '../../api/observer';

export default class DeletePost extends Component {
	deletePost() {
		let postId=this.props.match.params.id;
		
		requester.remove('appdata', `posts/${postId}`, 'kinvey')
			.then(res => {
				
				observer.trigger(observer.events.notification, {type:'success',message:'Successful delete post!'});
				//redirect to updated catalog page
			

			}).catch(err => {
				//handle err msg
				console.log(err);
				observer.trigger(observer.events.notification, {type:'error',message:'Unsuccesful delete post!'});
				
			});
	}

	render(){
		this.deletePost();
		return <Redirect to="/catalog"/>;
	}

}
