import React, { Component } from 'react';

import requester from '../../api/requester';
import observer from '../../api/observer';

import '../../style/submit.css';

export default class CreateCommentForm extends Component {
	constructor(props) {
		super(props);

		this.state={
			content:''
		};

		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);

	}

	onInputChange(event) {
		let inputName = event.target.name;
		let inputValue = event.target.value;

		this.setState({ [inputName]: inputValue });
	}

	onFormSubmit(e) {
		e.preventDefault();
		let comment = {
			author: sessionStorage.username,
			content: e.target.content.value,
			postId: this.props.postId,

		};
	
		requester.post('appdata', 'comments', 'kinvey', comment)
			.then(res => {
			
				// to handle success
				observer.trigger(observer.events.notification, { type: 'success', message: 'Successfully created comment!' });
				//to redirect to updated post details
				
				console.log('Hello from comment creation');
				this.props.history.push(`/post/details/${comment.postId}`);
				this.setState({content:''});
			})
			.catch(err => {
				//to handle err
				console.log(err);
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render() {
		return (

			<div className="submitArea">
				<h1>Post Comment</h1>
				<form id="createCommentForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>Content:</label>
					<input id="cmtContent" name="content" type="text" onChange={this.onInputChange}/>
					<input type="submit" value="Post Comment"/>
				</form>
			</div>

		);
	}
}