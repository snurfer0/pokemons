import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../store/index';
import { fetchPage } from '../../store/pagination/action';
import { Page, PageResult } from '../../store/pagination/types';

interface PropsFromDispatch {
	fetchPage: (limit: number, offset: number) => any;
}

interface PropsFromState {
	loading: boolean;
	page: Page;
	errors?: string;
	fetchPokemons: (pageResults: PageResult[]) => any;
}

type Props = PropsFromState & PropsFromDispatch;

const Pagination: React.FC<Props> = ({
	page,
	loading,
	errors,
	fetchPage,
	fetchPokemons,
}) => {
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		setCurrentPage(page.offset / page.limit + 1);
	}, [page]);

	useEffect(() => {
		fetchPage(page.limit, page.offset);
	}, [page.limit, page.offset, fetchPage]);

	useEffect(() => {
		if (page.results) {
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
		</div>
	);
};

const mapStateToProps = ({ pagination }: ApplicationState) => {
	return {
		page: pagination.data,
		loading: pagination.loading,
		errors: pagination.errors,
	};
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		fetchPage: (limit: number, offset: number) => {
			dispatch(fetchPage(limit, offset));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
