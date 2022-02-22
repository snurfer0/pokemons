import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../store/index';
import { fetchPokemons } from '../../store/pokemons/action';
import { Pokemon } from '../../store/pokemons/types';
import Pagination from '../items/Pagination';
import PokemonList from '../items/PokemonList';
import {PageResult} from '../../store/pagination/types'
import Loading from '../items/Loading';

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
	useEffect(() => {
		console.log("Homepage pokemons", pokemons);
	}, []);

	if(loading) return <Loading/>

	return (
		<div>
			<Pagination fetchPokemons={fetchPokemons} />
			<PokemonList pokemons={pokemons} />
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
