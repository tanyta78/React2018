import React, { Component } from 'react';

import '../../../styles/all.css';

import observer from '../../../api/observer';
import c from '../../../api/constants';

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
			duration: e.target.duration.value,
			imageUrl: e.target.imageUrl.value,
			place: e.target.place.value,
			price: e.target.price.value,
			views: 0,
			likes: 0,
			approved: false,
			categories:[]
		};

		courseService.createCourse(courseObj).then(res => {
			observer.trigger(observer.events.notification, { type: 'success', message: c.COURSE_CREATE_SUCCESS });

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
				console.log(res[0]);
				requester.get('appdata', 'categories', 'kinvey').then(categories=>{
					console.log(categories);
					this.setState({
						authorId:res[0]._id,
						categories
					});
					console.log(this.state);
				});
				
			}).catch(err => observer.trigger(observer.events.notification, {
				type: 'error',
				message: err.responseJSON.description
			}));
	}

	render() {
		console.log(this.state);
		let categoriesSelect= this.state.categories.map((c,i)=>(<option value={`${c._id}`}>{c.name}</option>));
		return (
			<div className="submitArea">
				<h1>Create Course</h1>
				<p>Please, fill out the form. </p>
				<form id="createCourseForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>Category:</label>
					<select name="categoryId" onChange={this.onInputChange}>
						<option value="all" selected>All</option>
						{categoriesSelect}
          			</select>
					<input
						
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
					<input type="submit" value="Create Course" />
				</form>
			</div>

		);
	}
}

