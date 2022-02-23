import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Page } from '../../store/pagination/types';
import { PokemonActionTypes } from '../../store/pokemons/types';
import { PaginationActionTypes } from '../../store/pagination/types';

interface PropsFromState {
	page?: Page;
}

type Props = PropsFromState

const TopBar: React.FC<Props> = ({ page }) => {
	const dispatch = useDispatch();

	return (
		<div className='topbar-container'>
			<div className='dropdown'>
				<input className='dropdown-toggle' type='text' />
				<div className='dropdown-text'>
					Showing {page?.limit} results
				</div>
				<ul className='dropdown-content'>
					<li
						onClick={() =>
							dispatch({
								type: PaginationActionTypes.SET_LIMIT,
								payload: 10,
							})
						}
					>
						Show 10 results
					</li>
					<li
						onClick={() =>
							dispatch({
								type: PaginationActionTypes.SET_LIMIT,
								payload: 20,
							})
						}
					>
						Show 20 results
					</li>
					<li
						onClick={() =>
							dispatch({
								type: PaginationActionTypes.SET_LIMIT,
								payload: 30,
							})
						}
					>
						Show 30 results
					</li>
				</ul>
			</div>
			<div className='search-input-container'>
				<FontAwesomeIcon className='icon' icon={faSearch} />
				<input
					onChange={(e) => dispatch({ type: PokemonActionTypes.FILTER_DATA, payload: e.target.value})}
					id='search-teams-input'
					type='text'
					placeholder='Search Teams'
				></input>
			</div>
			<div className='dropdown'>
				<input className='dropdown-toggle' type='text' />
				<div className='dropdown-text'>Sort Items</div>
				<ul className='dropdown-content'>
					<li
						onClick={() =>
							dispatch({
								type: PokemonActionTypes.SORT_ALPHABETICALLY,
							})
						}
					>
						From A-Z
					</li>
					<li
						onClick={() =>
							dispatch({
								type: PokemonActionTypes.SORT_BY_HEIGHT,
							})
						}
					>
						By Height
					</li>
					<li
						onClick={() =>
							dispatch({
								type: PokemonActionTypes.SORT_BY_WEIGHT,
							})
						}
					>
						By Weight
					</li>
				</ul>
			</div>
		</div>
	);
};

const mapStateToProps = ({ pagination }: ApplicationState) => {
	return {
		page: pagination.data,
	};
};

export default connect(mapStateToProps, null)(TopBar);
