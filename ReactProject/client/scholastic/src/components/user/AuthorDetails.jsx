import React, { Component } from 'react';

import '../../styles/all.css';

export default class AuthorDetails extends Component{
	
	render(){
		console.log('from author profile');
		console.log(this.props);
		return(
			<article id="author-details" className="course">
				<div className="course-content">
					<div className="category">
						<strong>{this.props.authorInfo.fullname}</strong>
						<p> 
							<span>&#9742;  </span>Phone:
							<span>{this.props.authorInfo.phone}</span>
						</p>
						<p> 
							<span>&#9993; </span>Email: 
							<span>{this.props.authorInfo.email}</span>
						</p>
						<p> 
							<span role='img'>&#9962;  </span>Address:
							<span>{this.props.authorInfo.address}</span>
						</p>
						<p> 
							<span> Website: </span>
							<span>{this.props.authorInfo.website}</span>
						</p>
					</div>
					<div className="details">
					
					</div>
				</div>
			</article>
		);
	}
}