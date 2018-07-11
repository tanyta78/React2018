import React, { Component } from 'react';
import './App.css';
import Home from './components/withLogging/Home';
import About from './components/withLogging/About';
import DashboardWithData from './components/withData/Dashboard';
import LoginForm from './components/withHandler/Form';
import dataSource from './services/dataSource';
import CommentsList from './components/CommentsList';

import './components/withStyle/warning.css';
import Title from './components/withStyle/Title';
import RegisterForm from './components/withStyle/Register';
import Navigation from './components/withStyle/Navigation';
import BuggyCounter from './components/withErrorHandling/buggyCounter';

dataSource.setData('comments',[
	'some comment',
	'another comment',
	'angry comment',

]);

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Home/>
				<About/>
				<DashboardWithData/>
				<LoginForm/>
				<CommentsList/> */}
				<Title/>
				<RegisterForm/>
				<Navigation/>
				{/* <BuggyCounter/> */}
			</div>
		);
	}
}

export default App;
