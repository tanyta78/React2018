import React, { Component } from 'react';
import '../../style/post.css';

import Navigation from '../common/Navigation';
import PostList from './PostList';

export default class PostCatalog extends Component {

	render() {
		return (
			<div>
				<Navigation />
				<section id="viewCatalog">
					<PostList author={this.props.author}/>
				</section>
			</div>
		);
	}
}

