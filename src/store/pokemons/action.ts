import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../index';
import { PageResult } from '../pagination/types';
import { Pokemon, PokemonActionTypes } from './types';

export type AppThunk = ActionCreator<
	ThunkAction<void, ApplicationState, null, Action<string>>
>;

const api: AxiosInstance = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/',
});

export const fetchPokemons: AppThunk =
	(pageResults: PageResult[]) =>
	async (dispatch: Dispatch): Promise<Action> => {
		try {
			let promises: AxiosResponse<Pokemon>[] = [];

			for (let result of pageResults) {
				let pokemonResponse = await api.get<Pokemon>(result.url);
				promises.push(pokemonResponse);
			}

			const respondsRaw: AxiosResponse<Pokemon>[] = await Promise.all(
				promises,
			);

			const respondsWithSuccess: AxiosResponse<Pokemon>[] =
				respondsRaw.filter((respond) => respond.status === 200);

			if (respondsRaw.length === respondsWithSuccess.length) {
				let allPokemons: Pokemon[] = respondsWithSuccess.map(
					(p: AxiosResponse<Pokemon>) => p.data,
				);

				return dispatch({
					type: PokemonActionTypes.FETCH_SUCCESS,
					payload: allPokemons,
				});
			} else {
				return dispatch({
					type: PokemonActionTypes.FETCH_ERROR,
				});
			}
		} catch (error) {
			return dispatch({
				type: PokemonActionTypes.FETCH_ERROR,
			});
		}
	};
