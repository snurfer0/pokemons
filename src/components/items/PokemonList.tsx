import React from 'react';
import { Pokemon } from '../../store/pokemons/types';
import PokemonItem from './PokemonItem';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store/index';
import Loading from './Loading'

interface Props {
	pokemons: Pokemon[];
	isFetchingPokemons?: boolean;
}

const PokemonList: React.FC<Props> = ({ pokemons, isFetchingPokemons }) => {
	if (true) return <Loading />;
	return (
		<div className='pokemon-list-container'>
			{pokemons.map((pokemon: Pokemon) => (
				<PokemonItem key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

const mapStateToProps = ({ pokemons }: ApplicationState) => {
	return {
		isFetchingPokemons: pokemons.loading,
	};
};

export default connect(mapStateToProps, null)(PokemonList);
