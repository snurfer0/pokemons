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
	order: any[];
	species: any[];
	sprites: { front_shiny: string };
}

export enum PokemonActionTypes {
	FETCH_REQUEST = '@@pokemon/FETCH_REQUEST',
	FETCH_SUCCESS = '@@pokemon/FETCH_SUCCESS',
	FETCH_ERROR = '@@pokemon/FETCH_ERROR',
}

export interface PokemonState {
	readonly loading: boolean;
	readonly data: Pokemon[];
	readonly errors?: string;
}
