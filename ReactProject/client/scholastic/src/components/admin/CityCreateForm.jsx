import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

import '../../styles/all.css';


import observer from '../../api/observer';
import c from '../../api/constants';
import requester from '../../api/requester';

class CityCreateForm extends Component {
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
		let cityObj = {
			name: e.target.name.value
		};

		requester.post('appdata','cities','admin',cityObj).then(res => {
			observer.trigger(observer.events.notification, { type: 'success', message: c.CITY_CREATE_SUCCESS });

			//to redirect to AdminPAnel
			this.props.history.push('/allCities');

		}).catch(err => observer.trigger(observer.events.notification, {
			type: 'error',
			message: err.responseJSON.description
		}));
	}

	render() {
		console.log(this.state);
		return (
			<div className="submitArea">
				<h1>Create City</h1>

				<form id="createCityForm" className="submitForm" onSubmit={this.onFormSubmit}>
					<label>City Name:</label>
					<input
						name="name"
						type="text"
						onChange={this.onInputChange}
					/>
					<input type="submit" value="Create City" />
				</form>
			</div>

		);
	}
}

export default withRouter(CityCreateForm);

