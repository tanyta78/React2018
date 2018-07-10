import React, { Component } from 'react';
import './App.css';
import Home from './components/withLogging/Home';
import About from './components/withLogging/About';
import DashboardWithData from './components/Dashboard';
import LoginForm from './components/Form';
import dataSource from './services/dataSource';
import CommentsList from './components/CommentsList';

dataSource.setData('comments',[
	'some comment',
	'another comment',
	'angry comment',

])

class App extends Component {
	render() {
		return (
			<div className="App">
				<Home/>
				<About/>
				<DashboardWithData/>
				<LoginForm/>
				<CommentsList/>
			</div>
		);
	}
}

export default App;
