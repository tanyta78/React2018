import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import '../../styles/comment.css';
import c from '../../api/constants';


export default class City extends Component{

	render (){
		const isAdmin= sessionStorage.userRoles.indexOf(c.ADMIN_ROLE_ID)!== -1;
		return(
			<article className="comment">
				<div className="comment-content">
					{this.props.name}

				</div>
				
				{isAdmin && <Link to={`/city/delete/${this.props._id}`} className="deletePost">Delete</Link>}
			</article>
		);
		
	}
}