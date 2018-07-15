import React, { Component } from 'react';
import '../../../styles/course.css';

import observer from '../../../api/observer';
import requester from '../../../api/requester';
import c from '../../../api/constants';

import '../../../styles/all.css';

import courseService from '../../../services/courseService';


export default class CourseEditForm extends Component {
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
			categories: []
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
		let courseId = this.props.match.params.id;
		let courseObj = {
			id: courseId,
			authorId: this.state.authorId,
			categoryId: e.target.categoryId.value,
			description: e.target.description.value,
			duration: e.target.duration.value,
			imageUrl: e.target.imageUrl.value,
			place: e.target.place.value,
			price: e.target.price.value,
			views: this.state.views,
			likes: this.state.likes,
			approved: false,

		};
		courseService.editCourse(courseObj)
			.then(res => {
				// to handle success
				observer.trigger(observer.events.notification, { type: 'success', message: c.COURSE_EDIT_SUCCESS });
				this.props.history.push('/myCourses');
			})
			.catch(err => {
				//to handle err
				observer.trigger(observer.events.notification, { type: 'error', message: err.responseJSON.description });

			});
	}

	componentDidMount() {
		let courseId = this.props.match.params.id;
		courseService.loadCourseById(courseId)
			.then(res => {
				requester.get('appdata', 'categories', 'kinvey').then(categories => {

					this.setState({
						author: sessionStorage.username,
						authorId: res.authorId,
						categoryId: res.categoryId,
						description: res.description,
						duration: res.duration,
						imageUrl: res.imageUrl,
						place: res.place,
						price: res.price,
						views: res.views,
						likes: res.likes,
						approved: false,
						categories: categories
					});
				});

			}).catch(err => {
				console.log(err);
				
			});
	}

	render() {
		console.log('from edit course page');
		console.log(this.state);
		let categoriesSelect = this.state.categories.map((c, i) =>
			(<option value={`${c._id}`}>{c.name}</option>));

		return (
			<section id="viewPostEdit">
				<div className="submitArea">
					<h1>Edit Course</h1>
					<p>Please, fill out the form. </p>
					<form id="editCourseForm" className="submitForm" onSubmit={this.onFormSubmit}>
						<label>Category:</label>
						<select name="categoryId" onChange={this.onInputChange} value={`${this.state.categoryId}`}>
							{categoriesSelect}
						</select>
						<label>Description:</label>
						<textarea
							name="description"
							onChange={this.onInputChange}
							value={this.state.description}
						></textarea>
						<label>Duration:</label>
						<input
							name="duration"
							type="text"
							onChange={this.onInputChange}
							value={this.state.duration}
						/>
						<label>Price for duration:</label>
						<input
							name="price"
							type="text"
							onChange={this.onInputChange}
							value={this.state.price}
						/>
						<label>Image Url:</label>
						<input
							name="imageUrl"
							type="text"
							onChange={this.onInputChange}
							value={this.state.imageUrl}
						/>
						<label>Place for education:</label>
						<input
							name="place"
							type="text"
							onChange={this.onInputChange}
							value={this.state.place}
						/>
						<input type="submit" value="Edit course" />
					</form>
				</div>
			</section>
		);
	}
}
