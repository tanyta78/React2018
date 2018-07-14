import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/comment.css';
import c from '../../api/constants';

export default class NoAccess extends Component {

	render() {
		return (
			<article className="comment">
				<div className="comment-content">
					<p>{c.NO_ACCESS}</p>
				</div>

				<Link to={'/'} > Return to Home</Link>
			</article>
		);
	}
}