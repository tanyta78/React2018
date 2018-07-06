import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../../style/comment.css';

export default class Comment extends Component {
	
	render(){
		//to get userId and authorId
		let isAuthor = true;
		let deleteLink =`/comment/delete/${this.props.commentId}`;
		return(
			<article className="comment">
				<div className="comment-content">
					{this.props.content}
				</div>
				{isAuthor && <Link to={deleteLink} className="action">[Delete]</Link>}
			</article>
		);
	}
}
	