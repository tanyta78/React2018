import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../../style/header.css';
import '../../style/site.css';
import observer from '../../api/observer';


export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state={
			username:''
		};
		
		observer.subscribe(observer.events.loginUser, this.userLoggedIn);
		observer.subscribe(observer.events.logoutUser,this.userLogout)
	}

	userLogout = ()=>{
		this.setState({username:''});
	}

	userLoggedIn = (username)=>{
		this.setState({username:username});
	}
	
	render() { 
		const profile=
			<div id="profile">
				<span id="username">Hello, {this.state.username}!</span>|<Link to="/logout" >logout</Link>
			</div>;
		return (
			<header>
				<span className="logo">&#9731;</span>
				<span className="header">SeenIt</span>
				{this.state.username ? profile : null}
			</header>
		);
	}
}
