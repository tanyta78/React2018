import React, { Component } from 'react';

import requester from '../../api/requester';
import observer from '../../api/observer';

import '../../style/submit.css';

export default class CreatePostForm extends Component {
	constructor(props) {
		super(props);

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
		let post = {
			author: sessionStorage.username,
			title: e.target.title.value,
			description: e.target.description.value,
			url: e.target.url.value,
			imageUrl: e.target.image.value,

		};
	
		requester.post('appdata', 'posts', 'kinvey', post)
			.then(res => {
			
				// to handle success
				observer.trigger(observer.events.notification, { type: 'success', message: 'Successfully created post!' });
				//to redirect to all post page catalog
				this.props.history.push('/catalog');
			})
			.catch(err => {
				//to handle err
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });
			});
	}

	render() {
		return (

			<div className="submitArea">
				<h1>Create Post</h1>
				<p>Please, fill out the form. A thumbnail image/description is not required.</p>
				<form id="createPostForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>Link URL:</label>
					<input
						name="url"
						type="text"
						onChange={this.onInputChange}
					/>
					<label>Link Title:</label>
					<input
						name="title"
						type="text"
						onChange={this.onInputChange}
					/>
					<label>Link Thumbnail Image (optional):</label>
					<input
						name="image"
						type="text"
						onChange={this.onInputChange} />
					<label>Description (optional):</label>
					<textarea
						name="description"
						onChange={this.onInputChange}></textarea>
					<input type="submit" value="Create Post" />
				</form>
			</div>

		);
	}
}

