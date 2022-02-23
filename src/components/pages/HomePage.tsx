import React from 'react';
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
	darkMode: boolean;
}

type Props = PropsFromState & PropsFromDispatch;

const HomePage: React.FC<Props> = ({
	darkMode,
	pokemons,
	loading,
}) => {
	if (loading) return <Loading />;

	return (
		<div id='homepage-container' className={darkMode ? 'darkMode' : ''}>
			<div className='content-wrapper'>
				<TopBar />
				<Pagination />
				<PokemonList pokemons={pokemons} />
			</div>
		</div>
	);
};

const mapStateToProps = ({ pokemons, darkMode }: ApplicationState) => {
	return {
		darkMode: darkMode.status,
		pokemons: pokemons.data,
		loading: pokemons.loading,
		errors: pokemons.errors,
	};
};


export default connect(mapStateToProps, null)(HomePage);
