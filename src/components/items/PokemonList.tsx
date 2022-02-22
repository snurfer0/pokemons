import React from 'react';
import { Pokemon } from '../../store/pokemons/types';
import PokemonItem from './PokemonItem';

interface Props {
	pokemons: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemons }) => {
	if (!pokemons.length) return null;

	return (
		<div className='pokemon-list-container'>
			{pokemons.map((pokemon: Pokemon) => (
				<PokemonItem key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default PokemonList;
