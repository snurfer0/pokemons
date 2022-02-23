export type Form = { name: string; url: string };
export type Species = { name: string; url: string };
export type Sprites = { front_shiny: string };
export type Ability = { ability: { name: string; url: string } };
export type Type = { slot: number; type: { name: string; url: string } };
export type GameIndice = {
	game_index: number;
	version: { name: string; url: string };
};

export type Stat = {
	base_stat: number;
	effort: number;
	stat: { name: string; url: string };
};

export type Move = {
	move: {name: string, url: string}
}

export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	url: string;
	abilities: Ability[];
	base_experience: number;
	forms: Form[];
	game_indices: GameIndice[];
	held_items: any[];
	moves: Move[];
	types: Type[];
	stats: any[];
	order: number;
	species: Species;
	sprites: Sprites;
	is_default: boolean;
}

export enum PokemonActionTypes {
	FILTER_DATA = '@@pokemon/FILTER_DATA',
	SELECT_POKEMON = '@@pokemon/SELECT_POKEMON',
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
	readonly selectedPokemon?: Pokemon | null;
	readonly errors?: string;
}
