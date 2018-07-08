import React, { Component } from 'react';
import '../../style/post.css';
import '../../style/submit.css';

import Navigation from '../common/Navigation';
import EditPostForm from './EditPost';

export default class EditPostPage extends Component {

	render() {
		
		return (
			<div>
				<Navigation />
				<section id="viewPostCreate">
					<EditPostForm {...this.props}/>
				</section>
			</div>
		);
	}
}

