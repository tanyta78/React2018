import React, { Component } from 'react';

import validationFunc from '../utils/formValidator';

export default class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			confirmEmail: '',
			confirmPassword: '',
			error: '',
			message: ''

		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		let obj = this.state;

		let inputName = event.target.name;
		let inputValue = event.target.value;

		obj[inputName] = inputValue;

		this.setState(obj);
		//can be done with Object.assign(this.state.user,newObj)
	}

	onFormSubmit(event) {
		event.preventDefault();

		let credentials = {
			email: this.state.email,
			password: this.state.password,
			name: this.state.name
		};

		this.register(credentials);
		
	}

	register(credentials){
		fetch('http://localhost:5000/auth/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(credentials)
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				if(!data.success){
					this.setState({error:data.message,message:''});
					return;
				}else{
					this.setState({message:data.message,error:''});
				}
			});
	}

	render() {
		let validObj = validationFunc(
			this.state.email,
			this.state.confirmEmail,
			this.state.name,
			this.state.password,
			this.state.confirmPassword
		);

		return (
			<form className="form-horizontal" onSubmit={this.onFormSubmit}>
				<div className="text-danger">{this.state.error}</div>
				<div className='text-success'>{this.state.message}</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_email">Email {validObj.validMail ?
						<span className="glyphicon" role="img" aria-label="valid"> &#10004;</span>
						:
						<span className="glyphicon" role="img" aria-label="valid">&#9940;</span>
					}</label>
					<input
						type="email"
						name="email"
						onChange={this.onInputChange}
						className="form-control" id="input_email" aria-describedby="emailHelp" placeholder="Enter email"
					/>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_confirmEmail">Confirm Email {validObj.validMail ?
						<span className="glyphicon" role="img" aria-label="valid"> &#10004;</span>
						:
						<span className="glyphicon" role="img" aria-label="valid">&#9940;</span>
					}</label>
					<input
						type="email"
						name="confirmEmail"
						onChange={this.onInputChange}
						className="form-control" id="input_confirmEmail" aria-describedby="emailHelp" placeholder="Repeat email"
					/>
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_password">Password {validObj.validPassword ?
						<span className="glyphicon" role="img" aria-label="valid"> &#10004;</span>
						:
						<span className="glyphicon" role="img" aria-label="valid">&#9940;</span>}</label>
					<input
						type="password"
						name="password"
						onChange={this.onInputChange}
						className="form-control" id="input_password" placeholder="Password" />
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_confirmPassword">Repeat Password {validObj.validPassword ?
						<span className="glyphicon" role="img" aria-label="valid"> &#10004;</span>
						:
						<span className="glyphicon" role="img" aria-label="valid">&#9940;</span>}</label>
					<input
						type="password"
						name="confirmPassword"
						onChange={this.onInputChange}
						className="form-control" id="input_confirmPassword" placeholder="Repeat Password" />
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_username">Username {validObj.validName ?
						<span className="glyphicon" role="img" aria-label="valid"> &#10004;</span>
						:
						<span className="glyphicon" role="img" aria-label="valid">&#9940;</span>}</label>
					<input
						type="text"
						name="name"
						onChange={this.onInputChange}
						className="form-control" id="input_username" placeholder="Username" />
				</div>
				<button style={({ 'display': (validObj.validMail && validObj.validName && validObj.validPassword) === true ? '' : 'none' })} type="submit" className="btn btn-primary">Register</button>
			</form>
		);
	}
}