import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import '../../styles/all.css';

export default class AdminNavigation extends Component {
	render(){
		let linkTo={
			pathname: '/catalog', 
			all: true
		};
		
		return (
			<div className="dropdown">
				<button className="dropbtn">Admin panel Navigation</button>
				<div className="dropdown-content">
					<NavLink className="nav" to={linkTo}>Catalog</NavLink>
					<NavLink className="nav" to='/allCategories'>All categories</NavLink>
					<NavLink className="nav" to='/allCities'>All cities</NavLink>
					<NavLink className="nav" to='/allUsers'>All users</NavLink>
					<NavLink className="nav" to='/category/create'>Add new category</NavLink>
					<NavLink className="nav" to='/city/create'>Add new city</NavLink>
					<NavLink className="nav" to='/course/approve'>Approve courses</NavLink>
				</div>
			</div>
		);
	} 
}