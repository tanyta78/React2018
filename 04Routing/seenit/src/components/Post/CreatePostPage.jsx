import React, { Component } from 'react';
import '../../style/post.css';
import '../../style/submit.css';

import Navigation from '../common/Navigation';
import CreatePostForm from './CreatePostForm';

export default class CreatePostPage extends Component {

	render() {
		
		return (
			<div>
				<Navigation />
				<section id="viewPostCreate">
					<CreatePostForm {...this.props}/>
				</section>
			</div>
		);
	}
}

