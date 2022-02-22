import { PaginationActionTypes, PaginationState } from './types';
import { AnyAction } from 'redux';
import { Reducer } from 'redux';

const initialState: PaginationState = {
	data: {
		count: 0,
		limit: 20,
		offset: 0,
		next: null,
		previous: null,
		results: [],
	},
	errors: undefined,
	loading: false,
};

const reducer: Reducer<PaginationState> = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case PaginationActionTypes.FETCH_REQUEST: {
			return { ...state, loading: true };
		}
		case PaginationActionTypes.FETCH_SUCCESS: {
			return { ...state, loading: false, data: action.payload };
		}
		case PaginationActionTypes.FETCH_ERROR: {
			return { ...state, loading: false, errors: action.payload };
		}
		default: {
			return state;
		}
	}
};

export { reducer as PaginationReducer };
