import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Navigation from '../../common/Navigation';
import AdminNavigation from '../../common/AdminNavigation';

import CourseList from './CourseList';
import c from '../../../api/constants';

class Catalog extends Component {

	render () {
		console.log('from catalog');
	
		const isAdmin= sessionStorage.userRoles.indexOf(c.ADMIN_ROLE_ID)!== -1;
		// const all = this.props.location.all;
		console.log(this.props);
		// const navigation = isAdmin ? <AdminNavigation/> : <Navigation />;
		return (
			<div>
				{isAdmin && <AdminNavigation/>}
				<Navigation />
				<CourseList author={this.props.author} admin={isAdmin} />
			</div>
		);
	}
}

export default withRouter(Catalog);