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
			console.log('PokemonActionTypes.FETCH_REQUEST');
			dispatch({
				type: PokemonActionTypes.FETCH_REQUEST,
			});
			let promises: AxiosResponse<Pokemon>[] = [];

			for (let result of pageResults) {
				let pokemonResponse = await api.get<Pokemon>(result.url);
				promises.push(pokemonResponse);
			}

			const responseRaw: AxiosResponse<Pokemon>[] = await Promise.all(
				promises,
			);

			const responseWithSuccess: AxiosResponse<Pokemon>[] =
				responseRaw.filter((response) => response.status === 200);

			if (responseRaw.length === responseWithSuccess.length) {
				let allPokemons: Pokemon[] = responseWithSuccess.map(
					(p: AxiosResponse<Pokemon>) => p.data,
				);

				console.log('PokemonActionTypes.FETCH_SUCCESS');
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
