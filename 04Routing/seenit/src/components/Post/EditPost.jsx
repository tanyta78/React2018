import React, { Component } from 'react';
import '../../index.css';
import requester from '../../api/requester';

export default class EditPostForm extends Component {
	constructor(props) {
		super(props);

		this.onInputChange=this.onInputChange.bind(this);
		this.onFormSubmit= this.onFormSubmit.bind(this);
		
	}

	onInputChange(e){
		let inputName = event.target.name;
		let inputValue = event.target.value;

		this.setState({[inputName]: inputValue});
	}

	onFormSubmit(e){
		e.preventDefault();
		let postId=this.props.postId;//to get post id
		let post = {
			author:sessionStorage.username,
			title:e.target.title,
			description:e.target.description,
			url:e.target.url,
			imageUrl:e.target.image,

		};
		requester.update('appdata',`posts/${postId}`,'kinvey',post)
			.then(res=>{
				// to handle success
			})
			.catch(err=>{
				//to handle err
			});
	}
	
	render() { 
		return (
			<section id="viewPostEdit">
				<div class="submitArea">
					<h1>Edit Post</h1>
					<p>Please, fill out the form. A thumbnail image/description is not required.</p>
					<form id="editPostForm" class="submitForm" onSubmit={this.onFormSubmit}>
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
							onChange={this.onInputChange}/>
						<label>Description (optional):</label>
						<textarea 
							name="description" 
							onChange={this.onInputChange}></textarea>
						<input type="submit" value="Edit Post"/>
					</form>
				</div>
			</section>
		);
	}
}

