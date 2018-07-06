import React, { Component } from 'react';

import requester from '../../api/requester';
import observer from '../../api/observer';

export default class RegisterForm extends Component {
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
			.then(res=>{
				observer.trigger(observer.events.loginUser,res.username);
				sessionStorage.setItem('authtoken', res._kmd.authoken);
				//to handle success msg

			})
			.catch(err=>{
				//to handle error msg

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
					onChange={this.onInputChange} />
				<label>Password:</label>
				<input
					name="password"
					type="password"
					onChange={this.onInputChange} />
				<label>Repeat Password:</label>
				<input
					name="repeatPass"
					type="password"
					onChange={this.onInputChange} />
				<input id="btnRegister" type="submit" value="Sign Up" />
			</form>
		);
	}
}