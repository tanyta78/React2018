import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/comment.css';


export default class Comment extends Component{

	isAuthor = ()=>{
		return true;
		// this.props.username===sessionStorage.username;
	}

	render (){
		console.log(this.props);
		const linkTo={
			pathname: `/comment/delete/${this.props._id}`, 
			courseId: `${this.props.courseId}`
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