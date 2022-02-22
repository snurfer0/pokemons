import {
	AnyAction,
	applyMiddleware,
	combineReducers,
	compose,
	createStore,
	StoreEnhancer
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { PaginationReducer } from './pagination/reducer';
import { PaginationState } from './pagination/types';
// import pokemon's saga
import { PokemonReducer } from './pokemons/reducer';
import { PokemonState } from './pokemons/types';
import { composeWithDevTools } from 'redux-devtools-extension';

 
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

export interface ApplicationState {
	pokemons: PokemonState;
	pagination: PaginationState;
}

const rootReducer = combineReducers({
	pokemons: PokemonReducer,
	pagination: PaginationReducer,
});

export default function configureStore() {
	const middlewareEnhancer: StoreEnhancer<{ dispatch: AnyAction }, {}> =
		applyMiddleware(thunkMiddleware);

	const composedEnhancers: StoreEnhancer =
		composeWithDevTools(middlewareEnhancer);

	const store = createStore(rootReducer, composedEnhancers);

	return store;
}
