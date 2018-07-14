import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import authorService from '../../services/authorService';
import observer from '../../api/observer';
import c from '../../api/constants';

import '../../styles/all.css';

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
		
		let profile = {
			authorId:this.state._id,
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
	
		authorService.updateProfile(profile)
			.then(res => {
				observer.trigger(observer.events.notification, { type: 'success', message: c.PROFILE_UPDATE });	
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
		
		if (this.props.location.state !== undefined) {
			let author=this.props.location.state.detail;
			console.log(author);
			this.setState(this.props.location.state.detail);

		} else {
			authorService.loadAuthorByUserId(sessionStorage.userId)
				.then(res => {
						this.setState(res[0]);
				
				});
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
						value={this.state.username} /><br/>
					<label>Full name:</label>
					<input name="fullName"
						type="text"
						onChange={this.onInputChange}
						value={this.state.fullName} /><br/>
					<label>Address:</label>
					<input name="address"
						type="text"
						onChange={this.onInputChange}
						value={this.state.address} /><br/>

					<label>Phone:</label>
					<input name="phone"
						type="text"
						onChange={this.onInputChange}
						value={this.state.phone} /><br/>

					<label>Email:</label>
					<input name="email"
						type="text"
						onChange={this.onInputChange}
						value={this.state.email} /><br/>

					<label>City:</label>
					<input name="cityId"
						type="text"
						onChange={this.onInputChange}
						value={this.state.cityId} /><br/>

					<label>Avatar:</label>
					<input name="profileImg"
						type="text"
						onChange={this.onInputChange}
						value={this.state.profileImg} /><br/>

					<label>Website:</label>
					<input name="website"
						type="text"
						onChange={this.onInputChange}
						value={this.state.website} /><br/>

					<label>Personal Info:</label>
					<input name="personalInfo"
						type="text"
						onChange={this.onInputChange}
						value={this.state.personalInfo} /><br/>

					<input id="btnUpdateProfile" type="submit" value="Save Profile" />
				</form>
			</section>
		)
	}
}

export default withRouter(AuthorProfile);