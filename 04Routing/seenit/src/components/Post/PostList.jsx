import React, { Component } from 'react';
import '../../style/post.css';
import requester from '../../api/requester';
import Post from './Post';


export default class PostList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			posts: []
		};

	}

	componentDidMount() {
		let endpoint = this.props.author ? `posts?query={"author":"${sessionStorage.username}"}&sort={"_kmd.ect": -1}`:'posts?query={}&sort={"_kmd.ect": -1}';
		requester.get('appdata', endpoint, 'kinvey')
			.then(data => {
				
				this.setState({'posts': data});
			})
			.catch(err => {
				//handle error
			});
	}


	render() {
				
		return (
			<div  className="posts">
				{this.state.posts.map((p, i) =>
					<Post key={p._id} rank={i+1} postId={p._id} {...p} />				
				)}
			</div>

		);
	}
}

