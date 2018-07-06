import React, { Component } from 'react';

import requester from '../../api/requester';
import observer from '../../api/observer';


export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state={
			username:'',
			password:''
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event){
		let inputName = event.target.name;
		let inputValue = event.target.value;

		this.setState({[inputName]: inputValue});
	}

	onFormSubmit(e){
		e.preventDefault();
		let user = {
			username: this.state.username,
			password: this.state.password
		};
		requester.post('user','login','basic',user)
			.then(res=>{
				observer.trigger(observer.events.loginUser,res.username);
				
				sessionStorage.setItem('authtoken', res._kmd.authtoken);
				sessionStorage.setItem('username', res.username);


				observer.trigger(observer.events.notification, {type:'success',message:'Successful login!'});
				//to redirect to all post page catalog
				this.props.history.push('/catalog');

			})
			.catch(err=>{
				//to render error msg
				observer.trigger(observer.events.notification, {type:'error',message:err.responseJSON.description});
				
				this.setState({username:'',password:''});
			});
	}


	render() {
		return (
			<form id="loginForm" onSubmit={this.onFormSubmit}>
				<h2>Sign In</h2>
				<label>Username:</label>
				<input 
					name="username" 
					type="text" 
					onChange={this.onInputChange}
					value={this.state.username}/>
				<label>Password:</label>
				<input 
					name="password" 
					type="password" 
					onChange={this.onInputChange}
					value={this.state.password}/>
				<input id="btnLogin" type="submit" value="Sign In" />
			</form>
		);
	}
}