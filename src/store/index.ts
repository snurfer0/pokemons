import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	StoreEnhancer
} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import pagination's saga
import { PaginationReducer } from './pagination/reducer';
import { PaginationState } from './pagination/types';
// import pokemon's saga
import { PokemonReducer } from './pokemons/reducer';
import { PokemonState } from './pokemons/types';
// import darkmode's sage
import { DarkModeReducer } from './darkmode/reducer';
import { DarkModeState } from './darkmode/types';
import { composeWithDevTools } from 'redux-devtools-extension';

 
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export interface ApplicationState {
	pokemons: PokemonState;
	pagination: PaginationState;
	darkMode: DarkModeState;
}

const rootReducer = combineReducers({
	pokemons: PokemonReducer,
	pagination: PaginationReducer,
	darkMode: DarkModeReducer
});

export default function configureStore() {
	const middlewareEnhancer: StoreEnhancer<{ dispatch: AnyAction }, {}> =
		applyMiddleware(thunkMiddleware);

	const composedEnhancers: StoreEnhancer =
		composeWithDevTools(middlewareEnhancer);

	const store = createStore(rootReducer, composedEnhancers);

	return store;
}
