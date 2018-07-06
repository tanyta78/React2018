import React, { Component } from 'react';

import '../../style/post.css';

export default class PostDetails extends Component {
	
	render() {
		return (
			<article id="postDetails" className="post">
				<div className="col thumbnail">
					<img src={this.props.imageUrl} alt='post'/>
				</div>
				<div className="post-content">
					<div className="title">
						<strong>{this.props.title}</strong>
					</div>
					<div className="details">
						{this.props.description}
					</div>
				</div>
			</article>
		);
	}
}

