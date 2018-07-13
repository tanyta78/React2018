import React, { Component } from 'react';

import '../../styles/submit.css';
import observer from '../../../api/observer';
import COURSE_CREATE_SUCCESS from '../../../api/observer';

import courseService from '../../../services/courseService';
import authorService from '../../../services/authorService';
import requester from '../../../api/requester';

export default class CourseCreateForm extends Component {
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
			approved: false,
			categories:[]
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
		let courseObj = {
			authorId: this.state.authorId,
			categoryId: e.target.categoryId.value,
			description: e.target.description.value,
			duration: e.target.div.value,
			imageUrl: e.target.imageUrl.value,
			place: e.target.place.value,
			price: e.target.price.value,
			views: 0,
			likes: 0,
			approved: false
		};

		courseService.createCourse(courseObj).then(res => {
			observer.trigger(observer.events.notification, { type: 'success', message: COURSE_CREATE_SUCCESS });

			//to redirect to my course page 
			this.props.history.push('/myCourses');
		}).catch(err => observer.trigger(observer.events.notification, {
			type: 'error',
			message: err.responseJSON.description
		}));
	}

	componentDidMount() {
		authorService.loadAuthorByUserId(sessionStorage.userId)
			.then(res=>{
				requester.get('appdata', 'categories', 'kinvey').then(categories=>{
					console.log(categories);
					this.setState({
						authorId:res._id,
						categories
					});
				});
				
			}).catch(err => observer.trigger(observer.events.notification, {
				type: 'error',
				message: err.responseJSON.description
			}));
	}

	render() {
		return (
			<div className="submitArea">
				<h1>Create Course</h1>
				<p>Please, fill out the form. A thumbnail image/description is not required.</p>
				<form id="createCourseForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>Category:</label>
					<input
						name="categoryId"
						type="text"
						onChange={this.onInputChange}
					/>
					<label>Description:</label>
					<textarea
						name="description"
						onChange={this.onInputChange}></textarea>
					<label>Duration:</label>
					<input
						name="duration"
						type="text"
						onChange={this.onInputChange} />
					<label>Price for duration:</label>
					<input
						name="price"
						type="text"
						onChange={this.onInputChange} />
					<label>Image Url:</label>
					<input
						name="imageUrl"
						type="text"
						onChange={this.onInputChange} />
					<label>Place for education:</label>
					<input
						name="place"
						type="text"
						onChange={this.onInputChange} />
					<input type="submit" value="Create Post" />
				</form>
			</div>

		);
	}
}

