import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ApplicationState } from '../../store/index';
import { Page, PaginationActionTypes } from '../../store/pagination/types';
import { Pokemon, PokemonActionTypes } from '../../store/pokemons/types';

interface PropsFromState {
	page?: Page;
	pokemons?: Pokemon[];
	pokemonsLoaded?: boolean;
}

type Props = PropsFromState;

const TopBar: React.FC<Props> = ({ page, pokemons, pokemonsLoaded }) => {
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (pokemons) {
	// 		let sorted = localStorage.getItem('sort');

	// 		if (sorted === 'az') {
	// 			console.log('sorting b az');
	// 			dispatch({
	// 				type: PokemonActionTypes.SORT_ALPHABETICALLY,
	// 			});
	// 		} else if (sorted === 'height') {
	// 			console.log('sorting b h');
	// 			dispatch({
	// 				type: PokemonActionTypes.SORT_BY_HEIGHT,
	// 			});
	// 		} else if (sorted === 'weight') {
	// 			console.log('sorting b w');
	// 			dispatch({
	// 				type: PokemonActionTypes.SORT_BY_WEIGHT,
	// 			});
	// 		}
	// 	}
	// }, [pokemonsLoaded]);

	if(!pokemons) return null

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
					onChange={(e) =>
						dispatch({
							type: PokemonActionTypes.FILTER_DATA,
							payload: e.target.value,
						})
					}
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
						onClick={() => {
							localStorage.setItem('sort', 'az');
							dispatch({
								type: PokemonActionTypes.SORT_ALPHABETICALLY,
							});
						}}
					>
						From A-Z
					</li>
					<li
						onClick={() => {
							localStorage.setItem('sort', 'height');
							dispatch({
								type: PokemonActionTypes.SORT_BY_HEIGHT,
							});
						}}
					>
						By Height
					</li>
					<li
						onClick={() => {
							localStorage.setItem('sort', 'weight');
							dispatch({
								type: PokemonActionTypes.SORT_BY_WEIGHT,
							});
						}}
					>
						By Weight
					</li>
				</ul>
			</div>
		</div>
	);
};

const mapStateToProps = ({ pagination, pokemons }: ApplicationState) => {
	return {
		pokemons: pokemons.data,
		pokemonsLoaded: pokemons.loading,
		page: pagination.data,
	};
};

export default connect(mapStateToProps, null)(TopBar);
