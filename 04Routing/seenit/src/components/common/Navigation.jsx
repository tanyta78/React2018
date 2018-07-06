import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../../style/site.css';


export default class Navigation extends Component {

	render() {
	
		return (
			<div id="menu">
				<div className="title">Navigation</div>
				<NavLink className="nav" to='/catalog' activeClassName="active" exact>Catalog</NavLink>
				<NavLink className="nav" to="/post/create" activeClassName="active" exact>Create Post</NavLink>
				<NavLink className="nav" to="/myPosts" activeClassName="active" exact>My Posts</NavLink>
				<NavLink className="nav" to="/about" activeClassName="active" exact>About</NavLink>
			</div>
		);
	}
}