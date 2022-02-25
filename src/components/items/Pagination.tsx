import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../store/index';
import { fetchPage } from '../../store/pagination/action';
import { fetchPokemons } from '../../store/pokemons/action';
import { Page, PageResult } from '../../store/pagination/types';
import DarkModeToggler from './DarkModeToggler';
import Loading from '../items/Loading'

interface PropsFromDispatch {
	fetchPage: (limit: number, offset: number) => any;
}

interface PropsFromState {
	isFetchingPage: boolean;
	isFetchingPokemons: boolean;
	page: Page;
	errors?: string;
	fetchPokemons: (pageResults: PageResult[]) => any;
}

type Props = PropsFromState & PropsFromDispatch;

const Pagination: React.FC<Props> = ({
	page,
	isFetchingPage,
	isFetchingPokemons,
	fetchPage,
	fetchPokemons,
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setCurrentPage(page.offset / page.limit + 1);
	}, [page]);

	useEffect(() => {
		if (!isFetchingPokemons) {
			fetchPage(page.limit, page.offset);
		}
	}, []);

	useEffect(() => {
		if (!isFetchingPage) {
			fetchPokemons(page.results);
		}
	}, [page.results]);

	return (
		<div className='pagination-container'>
			<button
				onClick={() => fetchPage(page.limit, page.offset - page.limit)}
				disabled={currentPage === 1 ? true : false}
			>
				Previous page
			</button>
			<div>
				{currentPage}&nbsp;/&nbsp;{page.totalPages}
			</div>
			<button
				disabled={currentPage === page.totalPages ? true : false}
				onClick={() => fetchPage(page.limit, page.offset + page.limit)}
			>
				Next Page
			</button>
			<DarkModeToggler />
		</div>
	);
};

const mapStateToProps = ({ pagination, pokemons }: ApplicationState) => {
	return {
		page: pagination.data,
		isFetchingPage: pagination.loading,
		isFetchingPokemons: pokemons.loading,
		errors: pagination.errors,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		fetchPage: (limit: number, offset: number) => {
			dispatch(fetchPage(limit, offset));
		},
		fetchPokemons: (pageResults: PageResult[]) => {
			dispatch(fetchPokemons(pageResults));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
