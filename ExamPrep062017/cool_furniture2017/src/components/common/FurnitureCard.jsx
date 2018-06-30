import React, { Component } from 'react';

export default class FurnitureCard extends Component {
	render() {
		const { id, image, make, model, price } = this.props;
		return (
			<div className="col-md-4">
				<div className="card text-white bg-primary">
					<div className="card-body">
						<blockquote className="card-blockquote">
							<img src={image} />
							<p>{model} by {make}</p>
							<footer>
								<cite title="Source Title">{price} &euro;</cite>
							</footer>
							<div className="pull-right">
								<a href={'/details/' + id} className="btn btn-info">Details</a>
							</div>
						</blockquote>
					</div>
				</div>
			</div>
		);
	}
}