import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../style/post.css';

export default class Post extends Component {
	
	getDaysFromCreation = ()=> {
		let dateIsoFormat = this.props._kmd.ect;
		
        let diff = new Date() - (new Date(dateIsoFormat));
        diff = Math.floor(diff / 60000);
        if (diff < 1) return 'less than a minute';
        if (diff < 60) return diff + ' minute' + pluralize(diff);
        diff = Math.floor(diff / 60);
        if (diff < 24) return diff + ' hour' + pluralize(diff);
        diff = Math.floor(diff / 24);
        if (diff < 30) return diff + ' day' + pluralize(diff);
        diff = Math.floor(diff / 30);
        if (diff < 12) return diff + ' month' + pluralize(diff);
        diff = Math.floor(diff / 12);
        return diff + ' year' + pluralize(diff);

        function pluralize(value) {
            if (value !== 1) return 's';
            else return '';
        }
	}
	
	isAuthor(){
		
		return this.props.author===sessionStorage.username;
	}

	render() {
		return (
			<article className="post">
				<div className="col rank">
					<span>{this.props.rank}</span>
				</div>
				<div className="col thumbnail">
					<a href={this.props.url}>
						<img src={this.props.imageUrl} alt='post' />
					</a>
				</div>
				<div className="post-content">
					<div className="title">
						<a href={this.props.url}>
							{this.props.title}
						</a>
					</div>
					<div className="details">
						<div className="info">
							submitted {this.getDaysFromCreation()} ago by {this.props.author}
						</div>
						<div className="controls">
							<ul>
								<li className="action">
									<Link to={`/post/details/${this.props._id}`}>Details</Link>
								</li>
								{this.isAuthor() && 
								<li className="action">
									<Link to={`/post/edit/${this.props._id}`} className="editPost">Edit</Link>
								</li>}
								{this.isAuthor() && 
								<li className="action">
									<Link to={`/post/delete/${this.props._id}`} className="deletePost">Delete</Link>
								</li>
								}
							</ul>
						</div>

					</div>
				</div>
			</article>
		);
	}
}

