import React, { Component } from 'react';

import PokemonField from './formFields/PokemonField';
import Input from './formFields/Input';


class Pokedex extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pokemonName: '',
			pokemonImg: '',
			pokemonInfo: '',
			data: { pokemonColection: [] }
		}

		this.createPokemon = this.createPokemon.bind(this)
	}

	createPokemon(e) {
		e.preventDefault();
		let payload = {
			pokemonName: this.state.pokemonName,
			pokemonImg: this.state.pokemonImg,
			pokemonInfo: this.state.pokemonInfo
		}

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
						return data.json()
					})
					.then(d => {
						this.setState({ data: d })
					})
			})
	}

	componentDidMount() {
		fetch('http://localhost:5000/pokedex/pokedex')
			.then(data => {
				return data.json()
			}).then(d => {
				this.setState({ data: d })
			})
	}


	render() {
		let validName = this.state.pokemonName !== '';
		let validImg = this.state.pokemonImg.startsWith('http');
		let validInfo = this.state.pokemonInfo !== '' && this.state.pokemonInfo.length < 50

		return (
			<div>
				<form onSubmit={this.createPokemon}>
					<fieldset className='App'>
						<Input
							data='pokemonName'
							name='Pokemon Name'
							func={e => {
								this.setState({ pokemonName: e.target.value })
							}}
							valid={validName}
						/>
						<Input
							data='pokemonImg'
							name='Pokemon Image'
							func={e => {
								this.setState({ pokemonImg: e.target.value })
							}}
							valid={validImg}
						/>
						<Input
							data='pokemonInfo'
							name='Pokemon Info'
							func={e => {
								this.setState({ pokemonInfo: e.target.value })
							}}
							valid={validInfo}
						/>
						<input
							style={({ "display": (validImg && validInfo && validName) === true ? '' : 'none' })}
							type='submit'
							value='Create Pokemon'
						/>
					</fieldset>
				</form>
				<div style={({display: 'inline-block'})}>
				{
					this.state.data.pokemonColection.map((e, i) => {
						return <PokemonField key={i} data={e} />
					})
				}
				</div>
			</div>

		);
	}
}

export default Pokedex