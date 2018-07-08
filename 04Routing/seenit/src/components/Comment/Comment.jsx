import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import '../../style/comment.css';


export default class Comment extends Component {
	
	isAuthor(){
		
		return this.props.author===sessionStorage.username;
	}

	render(){
		console.log(this.props);
		const linkTo={
			pathname: `/comment/delete/${this.props.commentId}`, 
			postId: `${this.props.postId}`
		};
	
		
		return(
			<article className="comment">
				<div className="comment-content">
					{this.props.content}

				</div>
				
				{this.isAuthor() && <Link to={linkTo} className="deletePost">Delete</Link>}
			</article>
		);
	}
}
	