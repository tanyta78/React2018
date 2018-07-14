import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/menu.css';
import c from '../../api/constants';

export default class Navigation extends Component {
	isAdmin = () => {
		if (sessionStorage.userRoles !== undefined) {

			return sessionStorage.userRoles.indexOf(c.ADMIN_ROLE_ID) !== -1;
		}
		else {
			return false;
		}
	}

	render() {

		return (
			<div id="menu">
				<div className="title">Navigation</div>
				<NavLink className="nav" to='/'>Home</NavLink>
				<NavLink className="nav" to='/catalog'>Catalog</NavLink>
				<NavLink className="nav" to='/profile'>Profile</NavLink>
				<NavLink className="nav" to='/course/create'>Add new course</NavLink>
				<NavLink className="nav" to='/myCourses'>My courses</NavLink>
				{this.isAdmin() && <NavLink className="nav" to='/admin'>Admin panel</NavLink>}
			</div>
		);
	}
}