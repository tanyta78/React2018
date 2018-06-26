import React, { Component } from 'react';

export default class Roster extends Component {
	render = () => {
		const images = this.props.images.map(i => (
			<div className="roster-image-container" key={i.id}>
				<img src={i.url} alt="episode img" onClick={()=>this.props.select(i.id)} />
			</div>
		));

		return (
			<section id="roster">
				{images}
			</section>
		);
	}
}