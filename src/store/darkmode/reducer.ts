import { AnyAction, Reducer } from 'redux';
import { DarkModeActionTypes, DarkModeState } from './types';

const initialState: DarkModeState = {
	status: false,
};

const reducer: Reducer<DarkModeState> = (
	state = initialState,
	action: AnyAction,
) => {
	switch (action.type) {
		case DarkModeActionTypes.TOGGLE_DARK_MODE:
			return {
				...state,
				status: !state.status,
			};

		default: {
			return state;
		}
	}
};

export { reducer as DarkModeReducer };
