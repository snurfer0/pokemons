export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	url: string;
	abilities: { ability: { name: string; url: string } }[];
	base_experience: number;
	forms: any[];
	game_indices: any[];
	held_items: any[];
	moves: any[];
	types: any[];
	stats: any[];
	order: number;
	species: {name: string, url: string};
	sprites: { front_shiny: string };
	is_default: boolean;
}

export enum PokemonActionTypes {
	FILTER_DATA = '@@pokemon/FILTER_DATA',
	FETCH_REQUEST = '@@pokemon/FETCH_REQUEST',
	FETCH_SUCCESS = '@@pokemon/FETCH_SUCCESS',
	FETCH_ERROR = '@@pokemon/FETCH_ERROR',
	SORT_ALPHABETICALLY = '@@pokemon/SORT_ALPHABETICALLY',
	SORT_BY_WEIGHT = '@@pokemon/SORT_BY_WEIGHT',
	SORT_BY_HEIGHT = '@@pokemon/SORT_BY_HEIGHT',
}

export interface PokemonState {
	readonly loading: boolean;
	readonly initialData: Pokemon[];
	readonly data: Pokemon[];
	readonly errors?: string;
}
