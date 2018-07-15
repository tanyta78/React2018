import React,{Component} from 'react';

import {Link,withRouter} from 'react-router-dom';

import '../../styles/all.css';

class User extends Component{

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
export default withRouter(User);