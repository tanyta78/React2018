import React, { Component } from 'react';

import Roster from './Roster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROSTER_ENDPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			details: {
				name: null,
				id: null,
				url: null,
				bio: null
			}
		};
	}
	componentDidMount = () => this.fetchRoster();

	mapImages(data) {
		return {
			images: data.map(i => {
				return {
					id: i.id,
					url: i.url
				};
			})
		};
	}

	fetchRoster = () =>
		fetcher.get(ROSTER_ENDPOINT, data =>
			this.setState(this.mapImages(data)));

	fetchDetails = id =>
		fetcher.get(DETAILS_ENDPOINT+id, data =>
			this.setState({details:data}));

	selectDetails = id =>this.fetchDetails(id);

	render = () => (
		<div>
			<Roster images={this.state.images} select={this.selectDetails} />
			<Details {...this.state.details} />
		</div>
	)
}