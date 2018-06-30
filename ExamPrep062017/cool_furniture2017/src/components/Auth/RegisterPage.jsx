import React, { Component } from 'react';
import Input from './Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerAction, loginAction, redirect } from '../../actions/authActions';

class RegisterPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			repeat: '',
			redirect: false
		};

		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSubmitHandler = this.onSubmitHandler.bind(this);

	}
	onChangeHandler(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmitHandler(e) {
		e.preventDefault();
		this.props.register(this.state.name, this.state.email, this.state.password);

	}

	componentWillReceiveProps(newProps) {
		if (newProps.registerSuccess) {
			this.props.login(this.state.email, this.state.password);
		} else if(newProps.loginSuccess){
			this.props.redirect();
			this.props.history.push('/');
		}
	
	}

	render() {
		return (
			<div className="container">
				<div className="row space-top">
					<div className="col-md-12">
						<h1>Register</h1>
						<p>Please fill all fields.</p>
					</div>
				</div>
				<form onSubmit={this.onSubmitHandler}>
					<div className="row space-top">
						<div className="col-md-4">
							<Input
								name="name"
								type="text"
								value={this.state.name}
								onChange={this.onChangeHandler}
								label="Name" />
							<Input
								name="email"
								type="text"
								value={this.state.email}
								onChange={this.onChangeHandler}
								label="Email" />
							<Input
								name="password"
								type="password"
								value={this.state.password}
								onChange={this.onChangeHandler}
								label="Password" />
							<Input
								name="repeat"
								type="password"
								value={this.state.repeat}
								onChange={this.onChangeHandler}
								label="Repeat password" />
							<input type="submit" className="btn btn-primary" value="Register" />
						</div>
					</div>
				</form>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		register: (name, email, password) => dispatch(registerAction(name, email, password)),
		login: (email, password) => dispatch(loginAction(email, password)),
		redirect: () => dispatch(redirect())
	};
}

function mapStateToProps(state) {
	return {
		registerSuccess: state.register.success,
		loginSuccess: state.login.success
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));