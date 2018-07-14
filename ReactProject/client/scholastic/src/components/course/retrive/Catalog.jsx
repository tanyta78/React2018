import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import c from '../../../api/constants';

import '../../../styles/all.css';

import Navigation from '../../common/Navigation';
import AdminNavigation from '../../common/AdminNavigation';
import CourseList from './CourseList';

class Catalog extends Component {

	isAdmin = () =>{
		if (sessionStorage.userRoles !== undefined) {
			return sessionStorage.userRoles.indexOf(c.ADMIN_ROLE_ID) !== -1;
		}
		else {
			return false;
		}
	}

	render() {
	
		return (
			<div>
				{this.isAdmin() && <AdminNavigation />}
				<Navigation />
				<CourseList author={this.props.author} admin={this.isAdmin()} />
			</div>
		);

	}
}

export default withRouter(Catalog);