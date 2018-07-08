import React, { Component } from 'react';
import '../../style/post.css';

import requester from '../../api/requester';
import observer from '../../api/observer';


export default class EditPostForm extends Component {
	constructor(props) {
		super(props);

		this.state={
			author: '',
			title: '',
			description: '',
			url: '',
			imageUrl: '',
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
		let postId = this.props.match.params.id;//to get post id
		let post = {
			author: sessionStorage.username,
			title: e.target.title.value,
			description: e.target.description.value,
			url: e.target.url.value,
			imageUrl: e.target.image.value,

		};
		requester.update('appdata', `posts/${postId}`, 'kinvey', post)
			.then(res => {
				// to handle success
				observer.trigger(observer.events.notification, { type: 'success', message: 'Successfully edited post!' });
				this.props.history.push('/catalog');
			})
			.catch(err => {
				//to handle err
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });

			});
	}

	componentDidMount() {
		let postId = this.props.match.params.id;//to get post id
		requester.get('appdata', `posts/${postId}`, 'kinvey').then(res => {

			this.setState({
				author: sessionStorage.username,
				title: res.title,
				description: res.description || '',
				url: res.url || '',
				imageUrl: res.imageUrl || '',

			});
			
			//todo handle success
		}).catch(err => {
			console.log(err);
			//todo handlee error
		});
	}

	render() {
		return (

			<section id="viewPostEdit">
			
				<div className="submitArea">
					<h1>Edit Post</h1>
					<p>Please, fill out the form. A thumbnail image/description is not required.</p>
					<form id="editPostForm" className="submitForm" onSubmit={this.onFormSubmit}>
						<label>Link URL:</label>
						<input
							name="url"
							type="text"
							onChange={this.onInputChange}
							value={this.state.url}
						/>
						<label>Link Title:</label>
						<input
							name="title"
							type="text"
							onChange={this.onInputChange}
							value={this.state.title}

						/>
						<label>Link Thumbnail Image (optional):</label>
						<input
							name="image"
							type="text"
							onChange={this.onInputChange} 
							value={this.state.imageUrl}							
						/>
						<label>Description (optional):</label>
						<textarea
							name="description"
							onChange={this.onInputChange}
							value={this.state.description}
						></textarea>
						<input type="submit" value="Edit Post" />
					</form>
				</div>
			</section>
		);
	}
}

