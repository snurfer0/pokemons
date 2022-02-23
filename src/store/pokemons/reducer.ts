import _ from 'lodash';
import { AnyAction, Reducer } from 'redux';
import { Pokemon, PokemonActionTypes, PokemonState } from './types';

const initialState: PokemonState = {
	initialData: [],
	data: [],
	errors: undefined,
	loading: false,
};

const reducer: Reducer<PokemonState> = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case PokemonActionTypes.FETCH_REQUEST: {
			return { ...state, loading: true };
		}
		case PokemonActionTypes.FETCH_SUCCESS: {
			return {
				...state,
				loading: false,
				data: action.payload,
				initialData: action.payload,
			};
		}
		case PokemonActionTypes.FETCH_ERROR: {
			return { ...state, loading: false, errors: action.payload };
		}
		case PokemonActionTypes.FILTER_DATA: {
			return {
				...state,
				data: state.initialData.filter(
					(p: Pokemon) =>
						p.name
							.toLowerCase()
							.includes(action.payload.toLowerCase()),
				),
			};
		}
		case PokemonActionTypes.SORT_ALPHABETICALLY:
			console.log('state data sort alphabetically', state.data);
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
