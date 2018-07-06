import React, { Component } from 'react';
import { createPokemon, fetchAll } from '../../api/remote';


export default class AddPokemonForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: {},
			error: '',
			message: ''
		};

		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		let data = this.state.data;

		let inputName = event.target.name;
		let inputValue = event.target.value;

		data[inputName] = inputValue;

		this.setState({ data });
		//can be done with Object.assign(this.state.data,newObj)
	}

	onFormSubmit(event) {
		event.preventDefault();

		createPokemon(this.state.data).then((result) => {
			fetchAll()
				.then(d => {
					this.setState({ data: d });
				});
		});
	}


	render() {
		return (
			<form className="form-horizontal" onSubmit={this.onFormSubmit}>
				<div className="text-danger">{this.state.error}</div>
				<div className='text-success'>{this.state.message}</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_pokemonName">Pokemon Name </label>
					<input
						type="text"
						name="pokemonName"
						onChange={this.onInputChange}
						className="form-control" id="input_pokemonName" aria-describedby="emailHelp" placeholder="Enter pokemon name" />
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_pokemonImg">Pokemon Image</label>
					<input
						type="text"
						name="pokemonImg"
						onChange={this.onInputChange}
						className="form-control" id="input_pokemonImg" placeholder="Pokemon image url" />
				</div>
				<div className="form-group">
					<label className="control-label col-sm-2" htmlFor="input_pokemonInfo">Pokemon Info</label>
					<input
						type="text"
						name="pokemonInfo"
						onChange={this.onInputChange}
						className="form-control" id="input_pokemonInfo" placeholder="Add pokemon info" />
				</div>
				<button type="submit" className="btn btn-primary">Add pokemon</button>
			</form>
		);
	}
}