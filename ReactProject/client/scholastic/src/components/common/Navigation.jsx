import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../../styles/menu.css';

export default class Navigation extends Component {
	render(){
       
		return (
			<div id="menu">
				<div className="title">Navigation</div>
				<NavLink className="nav" to='/'>Home</NavLink>
				<NavLink className="nav" to='/catalog'>Catalog</NavLink>
				<NavLink className="nav" to='/profile'>Profile</NavLink>
				<NavLink className="nav" to='/course/create'>Add new course</NavLink>
				<NavLink className="nav" to='/myCourses'>My courses</NavLink>
                
			</div>
		);
	} 
}