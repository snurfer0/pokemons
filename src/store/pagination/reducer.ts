import { AnyAction, Reducer } from 'redux';
import { PaginationActionTypes, PaginationState } from './types';

const initialState: PaginationState = {
	data: {
		count: 0,
		totalPages: 0,
		limit: 20,
		offset: 0,
		next: null,
		previous: null,
		results: [],
	},
	errors: undefined,
	loading: true,
};

const reducer: Reducer<PaginationState> = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case PaginationActionTypes.FETCH_REQUEST:
			return { ...state, loading: true };

		case PaginationActionTypes.FETCH_SUCCESS:
			return {
				...state,
				loading: false,
				data: {
					...action.payload,
					totalPages: Math.round(
						action.payload.count / state.data.limit,
					),
				},
			};

		case PaginationActionTypes.FETCH_ERROR:
			return { ...state, loading: false, errors: action.payload };

		case PaginationActionTypes.SET_LIMIT:
			return {
				...state,
				data: {
					...state.data,
					offset: 0,
					limit: action.payload,
					totalPages: Math.round(state.data.count / action.payload),
				},
			};
		
		default: {
			return state;
		}
	}
};

export { reducer as PaginationReducer };
