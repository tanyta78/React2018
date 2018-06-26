import React, { Component } from 'react';

export default class Details extends Component {
	render = () => {
		let content = this.props.bio ? (
			<div>
				<div className="image">
					<img src={this.props.url} />
				</div>
				<div className="info">
					<p>Name: <strong>{this.props.name}</strong></p>
					<p>Bio: {this.props.bio}</p>
					<p></p>
				</div>
			</div>)
			: <i>Select an image!</i>;
		return (
			<section id="bio">
				{content}
			</section>
		);
	}
}