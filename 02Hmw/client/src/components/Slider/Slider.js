import React, { Component } from 'react';
import fetcher from '../../fetcher';

const IMAGE_URL = '/episodePreview/';

export default class Slider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: null,
			id: null
		};
	}

	fetchEpisode = id =>
		fetcher.get(IMAGE_URL + id, data => { this.setState(data); });

	componentDidMount = () => {
		this.fetchEpisode(0);
	}

	prevEpisode = ()=>this.fetchEpisode(this.state.id -1);
	nextEpisode = ()=>this.fetchEpisode(this.state.id +1);

	render = () => (
		<section id="slider">
			<img
				className="button"
				src="/left.png"
				title="previous"
				alt="nav previous"
				onClick={this.prevEpisode}
			/>
			<div className="image-container">
				<img src={this.state.url} alt="episode" />
			</div>
			<img 
				className="button" 
				src="/right.png" 
				title="next" 
				alt="nav next" 
				onClick={this.nextEpisode}
			/>
		</section>
	);
}