import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import authorService from '../../services/authorService';
import Navigation from '../common/Navigation';


class AuthorProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			userId: '',
			fullName: '',
			address: '',
			phone: '',
			email: '',
			cityId: '',
			profileImg: '',
			website: '',
			personalInfo: ''
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		let inputName = event.target.name;
		let inputValue = event.target.value;

		this.setState({ [inputName]: inputValue });
	}

	onFormSubmit(e) {
		e.preventDefault();
		//TODO: to check input validation
		console.log(e.target);
		let profile = {
			username: e.target.username.value,
			fullName: e.target.fullName.value,
			address: e.target.address.value,
			phone: e.target.phone.value,
			email: e.target.email.value,
			cityId: e.target.cityId.value,
			profileImg: e.target.profileImg.value,
			website: e.target.website.value,
			personalInfo: e.target.personalInfo.value,
		};
		console.log(profile);

		authorService.updateProfile(profile)
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message: 'Profile updated successful.' });
				
				this.props.history.push('/catalog');
			})
			.catch(err => {
				observer.trigger(observer.events.notification, {
					type: 'error',
					message: err.responseJSON.description
				});
				this.setState({
					username: '',
					userId: '',
					fullName: '',
					address: '',
					phone: '',
					email: '',
					cityId: '',
					profileImg: '',
					website: '',
					personalInfo: ''
				});
			})

	}


	componentDidMount() {
		// to access detail in AuthorProfile component - withRouter + this.props.location.state.detail
		let obj = {}
		if (this.props.location.state !== undefined) {
			Object.assign(obj, this.props, this.props.location.state.detail);
			this.setState(obj);

		} else {
			authorService.loadAuthorByUserId(sessionStorage.userId)
				.then(res => {
					Object.assign(obj, this.props, res[0]);
					this.setState(obj)
				})
		}

	}

	render = () => {
		return (
			<section id="authorProfile">
				<Navigation />
				<form id="updateAuthorForm" onSubmit={this.onFormSubmit}>
					<h2>My profile</h2>
					<label>Username:</label>
					<input name="username"
						type="text"
						onChange={this.onInputChange}
						value={this.state.username} />
					<label>Full name:</label>
					<input name="fullName"
						type="text"
						onChange={this.onInputChange}
						value={this.state.fullName} />
					<label>Address:</label>
					<input name="address"
						type="text"
						onChange={this.onInputChange}
						value={this.state.address} />

					<label>Phone:</label>
					<input name="phone"
						type="text"
						onChange={this.onInputChange}
						value={this.state.phone} />

					<label>Email:</label>
					<input name="email"
						type="text"
						onChange={this.onInputChange}
						value={this.state.email} />

					<label>City:</label>
					<input name="cityId"
						type="text"
						onChange={this.onInputChange}
						value={this.state.cityId} />

					<label>Avatar:</label>
					<input name="profileImg"
						type="text"
						onChange={this.onInputChange}
						value={this.state.profileImg} />

					<label>Website:</label>
					<input name="website"
						type="text"
						onChange={this.onInputChange}
						value={this.state.website} />

					<label>Personal Info:</label>
					<input name="personalInfo"
						type="text"
						onChange={this.onInputChange}
						value={this.state.personalInfo} />

					<input id="btnUpdateProfile" type="submit" value="Save Profile" />
				</form>
			</section>
		)
	}
}

export default withRouter(AuthorProfile);