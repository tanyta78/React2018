import React, { Component } from 'react';

import AdminNavigation from '../common/AdminNavigation';

export default class AdminPanel extends Component {

	render() {
		
		return (
			<div>
				<AdminNavigation />
				<section id="viewAdminPanel">
					<h3>ADD SOME INFO</h3>				
				</section>
			</div>
		);
	}
}