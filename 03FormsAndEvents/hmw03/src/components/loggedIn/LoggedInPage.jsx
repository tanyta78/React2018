import React, { Component } from 'react';

import Pokemon from './Pokemon';


export default class LoggedInPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pokemonName: '',
			pokemonImg: '',
			pokemonInfo: '',
			data: { pokemonColection: [] },
			error:'',
			message:''
		};

		this.createPokemon = this.createPokemon.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	onInputChange(event) {
		let obj = this.state;

		let inputName = event.target.name;
		let inputValue = event.target.value;

		obj[inputName] = inputValue;

		this.setState(obj);
		//can be done with Object.assign(this.state.data,newObj)
	}


	createPokemon(e) {
		e.preventDefault();
		let payload = {
			pokemonName: this.state.pokemonName,
			pokemonImg: this.state.pokemonImg,
			pokemonInfo: this.state.pokemonInfo
		};

		this.createPokemonOnServer(payload);
	}

	createPokemonOnServer(payload) {
		fetch('http://localhost:5000/pokedex/create', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload)
		})
			.then(res => {
				fetch('http://localhost:5000/pokedex/pokedex')
					.then(data => {
						return data.json();
					})
					.then(d => {
						this.setState({ data: d , message:'Succesfully add pokemon to db. Now you can add another one.', error:''});
						
					});
			}).catch(err=>{
				console.log(err.message);
			});
	}


	componentDidMount() {
		fetch('http://localhost:5000/pokedex/pokedex')
			.then(data => {
				return data.json();
			}).then(d => {
				
				this.setState({ data: d , message:d.message, error:''});
			});
	}

	render() {
		return (
			<div>
				<h1>Logged In!</h1>
				<h2>Add pokemon</h2>
				<form className="form-horizontal" onSubmit={this.createPokemon}>
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
				<div style={({ display: 'inline-block' })}>
					{
						this.state.data.pokemonColection.map(
							(pokemon, i) => <Pokemon key={i} item={pokemon} />
						)}
				</div>
			</div>
		);
	}
}