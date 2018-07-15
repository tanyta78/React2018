import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/all.css';

export default class User extends Component{

	
	render (){
		console.log(this.props);
		
		return(
			<article className="comment">
				<div className="comment-content">
					{this.props.username}

				</div>
				<Link to={`/users/edit/${this.props._id}`} className="deletePost">Edit</Link>}
				
				<Link to={`/users/delete/${this.props._id}`} className="deletePost">Delete</Link>}
			</article>
		);
		
	}
}