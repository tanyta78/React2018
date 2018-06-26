import React from 'react';

import Rooster from './Rooster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROOSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			images: [],
			details: {
				id: null,
				name: null,
				url: null,
				bio: null
			}
		};
	}

	fetchRooster = () =>
		fetcher.get(ROOSTER_ENPOINT, data =>
			this.setState({
				images: data.map(i => ({
					id: i.id,
					url: i.url
				}))
			}));

	fetchDetails = id =>
		fetcher.get(DETAILS_ENDPOINT + id, data => this.setState({ details: data }));

	componentDidMount = () =>
		this.fetchRooster();

	render = () => (
		<div>
			<Rooster images={this.state.images} switch={this.fetchDetails} />
			<Details {...this.state.details} />
		</div>
	)
}