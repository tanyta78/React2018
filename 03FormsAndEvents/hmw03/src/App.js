import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import LoggedInPage from './components/loggedIn/LoggedInPage';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			route: '',
			username: '',
			token: ''
		};

		this.showApproriateComponent = this.showApproriateComponent.bind(this);
		this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
		this.autenticate = this.autenticate.bind(this);
		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		this.setState({ token: '', username: '', route: '' });
		localStorage.clear();
	}

	autenticate(data) {
		if (data.success) {
			this.setState({ token: data.token, username: data.user.name, route: 'loggedin' });
			localStorage.setItem('token', data.token);
		}
	}

	componentDidMount() {
		this.setState({ token: localStorage.getItem('token') });
	}

	showApproriateComponent() {
		if ((this.state.token !== '' && this.state.token !== 'undefined' && typeof (localStorage.token) !== 'undefined') || this.state.route === 'loggedin') {
			return (
				<div className="col-sm-8 border border-primary">
					<ErrorBoundary>
						<LoggedInPage />
					</ErrorBoundary>
				</div>
			);
		}
		if (this.state.route === 'login') {
			return (
				<div className="col-sm-8 border border-primary">
					<h2>Login form</h2>
					<ErrorBoundary>
						<LoginForm authFunc={this.autenticate} />
					</ErrorBoundary>
				</div>

			);
		} else {
			return (
				<div className="col-sm-8 border border-primary">
					<h2>Sign Up</h2>
					<ErrorBoundary>
						<SignupForm />
					</ErrorBoundary>
				</div>
			);
		}
	}

	toggleLoginRegister() {
		if (this.state.route === 'login') {
			this.setState({ route: '' });
		} else {
			this.setState({ route: 'login' });
		}
	}

	render() {
		return (
			<div className="App">
				<div className="row ">
					<button onClick={this.toggleLoginRegister} type="button" className="btn btn-info">Change Form</button>
					{this.showApproriateComponent()}

					<button onClick={this.logOut} type="button" className="btn btn-info" style={({ 'display': ((this.state.token !== '' && this.state.token !== 'undefined' && typeof (localStorage.token) !== 'undefined') || this.state.route === 'loggedin') === true ? '' : 'none' })}>Log Out</button>

				</div>
			</div>
		);
	}
}

export default App;
