import React, { Component } from 'react';
import '../../style/post.css';
import '../../style/submit.css';

import Navigation from '../common/Navigation';
import requester from '../../api/requester';
import PostDetails from './PostDetails';
import CreateCommentForm from '../Comment/CreateCommentForm';
import CommentCatalog from '../Comment/CommentCatalog';

export default class PostDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state={
			author:'',
			title: '',
			description: '',
			url: '',
			imageUrl: '',
			comments:[]
		};

		this.getAllComments=this.getAllComments.bind(this);
	}

	setComments(data){
		this.setState({comments:data});
	}

	getAllComments(){
		let postId =this.props.match.params.id;
		let endpoint = `comments?query={"postId":"${postId}"}&sort={"_kmd.ect": -1}`;
	
		requester.get('appdata',endpoint,'kinvey').then(commentsData=>{
			console.log(commentsData);
			this.setState({comments:commentsData});
		});
	}

	componentDidMount(){
		//to find exact post with appropriate info
		let postId=this.props.match.params.id;
		requester.get('appdata',`posts/${postId}`,'kinvey').then(
			data=>{
								
				this.setState({
					author:data.author,
					title: data.title,
					description: data.description||'No description',
					url: data.url,
					imageUrl: data.imageUrl,
				});

				this.getAllComments(postId);
				
			}
		).catch(err=>{
			//handle err 
		});
	}
	

	render() {

		return (
			<div>
				<Navigation />
				<section id="viewPostDetails">
					<PostDetails {...this.state}/>
					<CreateCommentForm postId={this.props.match.params.id} setComments={this.getAllComments}  />
					<CommentCatalog comments={this.state.comments} {...this.props} setComments={this.getAllComments}/>
				</section>
			</div>
		);
	}
}

