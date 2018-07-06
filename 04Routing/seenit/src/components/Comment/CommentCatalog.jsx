import React, { Component } from 'react';
import '../../style/comment.css';

import Comment from './Comment';

export default class CommentCatalog extends Component {

	render() {
		let comments = this.props.comments;
		return (
			<div id="allComments" className="comments">
				{comments.map((c, i) =>
					<Comment key={c._id} commentId={c._id} {...c} />		
				)}
			</div>

		);
	}
}
