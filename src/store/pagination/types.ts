export type PageResult = { name: string; url: string }; 

export interface Page {
	count: number;
	limit: number;
	offset: number;
	next: string | null;
	previous: string | null;
	results: PageResult[];
}

export enum PaginationActionTypes {
	FETCH_NEXT_PAGE = '@@pagination/FETCH_NEXT_PAGE',
	FETCH_PREV_PAGE = '@@pagination/FETCH_PREV_PAGE',
	FETCH_REQUEST = '@@pagination/FETCH_REQUEST',
	FETCH_SUCCESS = '@@pagination/FETCH_SUCCESS',
	FETCH_ERROR = '@@pagination/FETCH_ERROR',
}


export interface PaginationState {
	readonly loading: boolean;
	readonly data: Page;
	readonly errors?: string;
}
