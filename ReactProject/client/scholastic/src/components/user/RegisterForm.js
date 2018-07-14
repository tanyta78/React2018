import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import authorService from '../../services/authorService';
import requester from '../../api/requester';
import observer from '../../api/observer';
import c from '../../api/constants';

class RegisterForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
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
		// to check input validation
		let user = {
			username: this.state.username,
			password: this.state.password
		};

		requester.post('user', '', 'basic', user)
			.then(res => {
				console.log('form user creation');
				console.log(res);
				observer.trigger(observer.events.loginUser, res.username);
				observer.trigger(observer.events.notification, { type: 'success', message: c.USER_REGISTER_SUCCESS });
				let userRoles = res._kmd.roles ? res._kmd.roles.map(r => r.roleId) : [];
				sessionStorage.setItem('authtoken', res._kmd.authtoken);
				sessionStorage.setItem('userRoles', userRoles.join(','));
				sessionStorage.setItem('username', res.username);
				sessionStorage.setItem('userId', res._id);
				authorService.createAuthor(res._id)
					.then(authorObj => {
						console.log('form author creation');

						console.log(authorObj);
						console.log(this.props);
						this.props.history.push(
							{
								pathname: '/profile',
								state: { detail: authorObj }
							});
						// to access detail in AuthorProfile component - withRouter + this.props.location.state.detail
						observer.trigger(observer.events.notification, { type: 'success', message: c.AUTHOR_REGISTER_SUCCESS });

					})
					.catch(
						err => {
							observer.trigger(observer.events.notification, {
								type: 'error',
								message: err.responseJSON.description
							});
							this.setState({ username: '', password: '' });
						}
					);
			});

	}


	render() {
		return (
			<form id="registerForm" onSubmit={this.onFormSubmit}>
				<h2>Register</h2>
				<label>Username:</label>
				<input
					name="username"
					type="text"
					onChange={this.onInputChange} /><br/>
				<label>Password :</label>
				<input
					name="password"
					type="password"
					onChange={this.onInputChange} /><br/>
				<label>Repeat Pass:</label>
				<input
					name="repeatPass"
					type="password"
					onChange={this.onInputChange} />
				<input id="btnRegister" type="submit" value="Sign Up" />
			</form>
		);
	}
}

export default withRouter(RegisterForm);