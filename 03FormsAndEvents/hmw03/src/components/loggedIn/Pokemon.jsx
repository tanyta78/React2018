import React from 'react';

const Pokemon = props => (
	<div style={({ display: 'inline-block', 'width': '200px', 'height': '200px', border: '2px solid orange' })}>
		<h1>{props.item.pokemonName}</h1>
		<p>{props.item.pokemonInfo}</p>
		<img style={({ 'width': '100px' })} alt='pokemon' src={props.item.pokemonImg} />
	</div>

);

export default Pokemon;