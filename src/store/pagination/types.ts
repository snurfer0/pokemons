export type PageResult = { name: string; url: string }; 

export interface Page {
	count: number;
	totalPages: number;
	limit: number;
	offset: number;
	next: string | null;
	previous: string | null;
	results: PageResult[];
}

export enum PaginationActionTypes {
	SET_LIMIT = '@@pagination/SET_LIMIT',
	FETCH_REQUEST = '@@pagination/FETCH_REQUEST',
	FETCH_SUCCESS = '@@pagination/FETCH_SUCCESS',
	FETCH_ERROR = '@@pagination/FETCH_ERROR',
}


export interface PaginationState {
	readonly loading: boolean;
	readonly data: Page;
	readonly errors?: string;
}
