import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../store/index';
import { PageResult } from '../../store/pagination/types';
import { fetchPokemons } from '../../store/pokemons/action';
import { Pokemon } from '../../store/pokemons/types';
import Loading from '../items/Loading';
import Pagination from '../items/Pagination';
import PokemonList from '../items/PokemonList';
import TopBar from '../items/TopBar';

interface PropsFromDispatch {
	fetchPokemons: (pageResults: PageResult[]) => any;
}

interface PropsFromState {
	loading: boolean;
	pokemons: Pokemon[];
	errors?: string;
}

type Props = PropsFromState & PropsFromDispatch;

const HomePage: React.FC<Props> = ({
	pokemons,
	loading,
	errors,
	fetchPokemons,
}) => {

	if (loading) return <Loading />;

	return (
		<div id='homepage-container'>
			<div className='content-wrapper'>
				<TopBar />
				<Pagination fetchPokemons={fetchPokemons} />
				<PokemonList pokemons={pokemons} />
			</div>
		</div>
	);
};

const mapStateToProps = ({ pokemons }: ApplicationState) => {
	return {
		pokemons: pokemons.data,
		loading: pokemons.loading,
		errors: pokemons.errors,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		fetchPokemons: (pageResults: PageResult[]) => {
			dispatch(fetchPokemons(pageResults));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
