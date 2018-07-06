import React, { Component } from 'react';
import './App.css';
import ButtonWithClick from './components/ButtonOnClick';
import RegisterForm from './components/RegisterForm';
import Container from './components/Container';


class App extends Component {
	render() {
		return (
			<div className="App">
				<ButtonWithClick/>
				<RegisterForm/>
				<Container>
					<div>Hello</div>
					<h2>Hello 2!</h2>
				</Container>
			</div>
		);
	}
}

export default App;
