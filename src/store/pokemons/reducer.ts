import { AnyAction, Reducer } from 'redux';
import { PokemonActionTypes, PokemonState } from './types';

const initialState: PokemonState = {
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
			return { ...state, loading: false, data: action.payload };
		}
		case PokemonActionTypes.FETCH_ERROR: {
			return { ...state, loading: false, errors: action.payload };
		}
		default: {
			return state;
		}
	}
};

export { reducer as PokemonReducer };
