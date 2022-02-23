import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationState } from '../../store/index';
import {
	Ability,
	Form,
	GameIndice,
	Move,
	Pokemon,
	Stat,
	Type,
} from '../../store/pokemons/types';
import DarkModeToggler from '../items/DarkModeToggler';
import Dropdown from '../items/Dropdown';
import Loading from '../items/Loading';

interface PropsFromState {
	pokemon: Pokemon;
}

const PokemonDetailPage: React.FC<PropsFromState> = ({ pokemon }) => {
	const history = useHistory();

	if (!pokemon) return <Loading />;

	return (
		<div className='pokemon-detail-container'>
			<div className='wrapper'>
				<div className='pokemon'>
					<button onClick={() => history.push('/')}>Back</button>
					<DarkModeToggler />
					<div className='img-container'>
						<img src={pokemon.sprites.front_shiny} alt='' />
					</div>
					<p className='pokemon-name'>{pokemon.name}</p>
					<div className='pokemon-props'>
						Height: {pokemon.height} &nbsp; Weight: {pokemon.height}{' '}
						&nbsp; Base experience: {pokemon.base_experience} &nbsp;
						Default: {pokemon.is_default}  &nbsp; Order:{' '}
						{pokemon.order} &nbsp; Species: {pokemon.species.name}
					</div>
					<Dropdown
						label={'Abilities'}
						renderData={pokemon.abilities.map((a: Ability) => {
							return (
								<li key={a.ability.name}>{a.ability.name}</li>
							);
						})}
					/>
					<Dropdown
						label={'Forms'}
						renderData={pokemon.forms.map((form: Form) => {
							return <li key={form.name}>{form.name}</li>;
						})}
					/>
					<Dropdown
						label={'Types'}
						renderData={pokemon.types.map((type: Type) => {
							return (
								<li key={type.type.name}>{type.type.name}</li>
							);
						})}
					/>
					<Dropdown
						label={'Game Indices'}
						renderData={pokemon.game_indices.map(
							(gi: GameIndice) => {
								return (
									<li key={gi.version.name}>
										{gi.version.name}
									</li>
								);
							},
						)}
					/>
					{pokemon?.stats !== undefined && (
						<Dropdown
							label={'Stats'}
							renderData={pokemon.stats.map((stat: Stat) => {
								return (
									<li key={stat.stat.name}>
										{stat.stat.name}: {stat.base_stat}
									</li>
								);
							})}
						/>
					)}
					<Dropdown
						label={'Moves'}
						renderData={pokemon.moves.map(
							(move: Move, index: number) => {
								if (index === pokemon.moves.length - 1) {
									return move.move.name + ' ';
								}
								return move.move.name + ', ';
							},
						)}
					/>

					<div className="alike">
						<p>You might also like</p>
						<div className="alike-pokemon-list">

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ pokemons }: ApplicationState) => {
	return {
		pokemon: pokemons.selectedPokemon,
	};
};

export default connect(mapStateToProps, null)(PokemonDetailPage);
