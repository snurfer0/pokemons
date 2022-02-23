import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ApplicationState } from '../index';
import { PaginationActionTypes } from './types';

export type AppThunk = ActionCreator<
	ThunkAction<void, ApplicationState, null, Action<string>>
>;

const api: AxiosInstance = axios.create({
	baseURL: 'https://pokeapi.co/api/v2/',
});

interface PageResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: { name: string; url: string }[];
}

export const fetchPage: AppThunk =
	(limit: number, offset: number) =>
	async (dispatch: Dispatch): Promise<Action> => {
		try {
			console.log('PaginationActionTypes.FETCH_REQUEST');
			dispatch({
				type: PaginationActionTypes.FETCH_REQUEST,
			});
			let response: AxiosResponse<PageResponse> =
				await api.get<PageResponse>(
					`/pokemon/?limit=${limit}&offset=${offset}`,
				);

			if (response.status === 200) {
				console.log('PaginationActionTypes.FETCH_SUCCESS');
				return dispatch({
					type: PaginationActionTypes.FETCH_SUCCESS,
					payload: { limit: limit, offset: offset, ...response.data },
				});
			} else {
				return dispatch({
					type: PaginationActionTypes.FETCH_ERROR,
					errors: `Response code: ${response.status}`,
				});
			}
		} catch (error) {
			return dispatch({
				type: PaginationActionTypes.FETCH_ERROR,
				errors: error,
			});
		}
	};
