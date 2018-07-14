import React, { Component } from 'react';

import AdminNavigation from '../common/AdminNavigation';

export default class AdminPanel extends Component {

	render() {
		
		return (
			<div>
				<AdminNavigation />
				<section id="viewAdminPanel">
					<h3>The Administration Panel is a dynamic administrative interface that makes managing your site, creating new content, and updating its components a breeze.</h3>			<p>It contains common elements. These are things like Categories, Cities, Users, and ...</p>
					<ul>
						<li> Category section provides option to create and delete categories.</li>
						<li> City section provides option to create and delete cities.</li>
						<li> User section provides option to create, update and delete user profiles.</li>	
					</ul>	
				</section>
			</div>
		);
	}
}