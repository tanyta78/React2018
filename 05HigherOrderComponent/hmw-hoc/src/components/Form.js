import React, { Component } from 'react';
import Input from './Input';

let ManagedInput={};

export default class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			password: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		ManagedInput= withHandler(Input, this.onChange);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		console.log(this.state);
		this.setState({
			name: '',
			password: ''
		});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<ManagedInput
					type="text"
					name="name"
					value={this.state.name}
				/>
				<ManagedInput	
					type="password"
					name="password"
					value={this.state.password}
				/>
				<input type="submit" value="Login" />
			</form>
		);
	}

}

function withHandler(WrappedComponent, changeHandler) {
	class ManagedInput extends Component {
		render() {
			return (<WrappedComponent 
				onChange={changeHandler} 
				type={this.props.type}
				name={this.props.name} 
				value={this.props.value} 
		 />);
		}
	}

	return ManagedInput;
}