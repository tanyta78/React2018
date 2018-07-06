import React, { Component } from 'react';

import validationFunc from '../utils/formValidator';

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
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
		let user = {
			email: this.state.email,
			password: this.state.password
		};
		this.login(user);
	}

	login(user) {
		fetch('http://localhost:5000/auth/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then(res => {
				return res.json();
			})
			.then(data => {
				console.log(data);
				console.log(this.state);
				
				if(!data.success){
					this.setState({error:data.message,message:''});
					return;
				}

				this.props.authFunc(data);
				
				this.setState({message:data.message,error:'',route:'loggedin'});
				
				
			})
			.catch(err=>{
				console.log(err.message);
				this.setState({error:err.message});
			});
	}

	render() {
		let validObj = validationFunc(
			this.state.email,
			this.state.email,
			'name',
			this.state.password,
			this.state.password
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
						className="form-control" id="input_email" aria-describedby="emailHelp" placeholder="Enter email" />
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
				<input style={({ 'display': (validObj.validPassword && validObj.validMail) === true ? '' : 'none' })} type="submit" className="btn btn-primary" value='Login' />
			</form>
		);
	}
}