import _ from 'lodash';
import { AnyAction, Reducer } from 'redux';
import { Pokemon, PokemonActionTypes, PokemonState } from './types';

const initialState: PokemonState = {
	initialData: [],
	data: [],
	errors: undefined,
	selectedPokemon: null,
	relatedPokemons: null,
	loading: false,
};

const reducer: Reducer<PokemonState> = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case PokemonActionTypes.FETCH_REQUEST:
			return { ...state, loading: true };

		case PokemonActionTypes.FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				data: action.payload,
				initialData: action.payload,
			};

		case PokemonActionTypes.SELECT_POKEMON:
			let selectedPokemon = state.data.find(
				(pokemon: Pokemon) => pokemon.id === action.payload,
			);
			let shuffledPokemons = state.data.sort(
				() => 0.5 - Math.random(),
			);
			return {
				...state,
				selectedPokemon: selectedPokemon,
				relatedPokemons: shuffledPokemons.slice(0, 3),
			};
		
		case PokemonActionTypes.FETCH_ERROR:
			return { ...state, loading: false, errors: action.payload };

		case PokemonActionTypes.FILTER_DATA:
			return {
				...state,
				data: state.initialData.filter((p: Pokemon) =>
					p.name.toLowerCase().includes(action.payload.toLowerCase()),
				),
			};

		case PokemonActionTypes.SORT_ALPHABETICALLY:
			return {
				...state,
				data: _.orderBy(
					state.data,
					[(pokemon: Pokemon) => pokemon.name.toLowerCase()],
					['asc'],
				),
			};
		case PokemonActionTypes.SORT_BY_HEIGHT:
			return {
				...state,
				data: _.orderBy(state.data, ['height'], ['asc']),
			};
		case PokemonActionTypes.SORT_BY_WEIGHT:
			return {
				...state,
				data: _.orderBy(state.data, ['weight'], ['asc']),
			};
		default: {
			return state;
		}
	}
};

export { reducer as PokemonReducer };
