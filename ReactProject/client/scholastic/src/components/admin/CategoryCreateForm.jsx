import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import '../../styles/all.css';

import observer from '../../api/observer';
import requester from '../../api/requester';
import c from '../../api/constants';

class CategoryCreateForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: ''
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
		let categoryObj = {
			name: e.target.name.value
		};

		requester.post('appdata','categories','admin',categoryObj).then(res => {
			observer.trigger(observer.events.notification, { type: 'success', message: c.CATEGORY_CREATE_SUCCESS });

			//to redirect to AdminPAnel
			this.props.history.push('/allCategories');

		}).catch(err => observer.trigger(observer.events.notification, {
			type: 'error',
			message: err.responseJSON.description
		}));
	}

	render() {
		console.log(this.state);
		return (
			<div className="submitArea">
				<h1>Create Category</h1>

				<form id="createCategoryForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>Category Name:</label>
					<input
						name="name"
						type="text"
						onChange={this.onInputChange}
					/>
					<input type="submit" value="Create Category" />
				</form>
			</div>

		);
	}
}

export default withRouter(CategoryCreateForm);

