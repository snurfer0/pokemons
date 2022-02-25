import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import PokemonList from '../items/PokemonList';

interface PropsFromState {
	pokemon: Pokemon;
	relatedPokemons: Pokemon[];
	darkMode: boolean;
}

const PokemonDetailPage: React.FC<PropsFromState> = ({
	pokemon,
	relatedPokemons,
	darkMode,
}) => {
	const history = useHistory();

	if (!pokemon) return <Loading />;

	return (
		<div
			className={`pokemon-detail-container ${darkMode ? 'darkMode' : ''}`}
		>
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
						Default: {pokemon.is_default ? 'True' : 'False'} &nbsp;
						Order: {pokemon.order} &nbsp; Species:{' '}
						{pokemon.species.name}
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

					<div className='alike'>
						<p>You might also like</p>
						<PokemonList pokemons={relatedPokemons} />
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ pokemons, darkMode }: ApplicationState) => {
	return {
		pokemon: pokemons.selectedPokemon,
		relatedPokemons: pokemons.relatedPokemons,
		darkMode: darkMode.status,
	};
};

export default connect(mapStateToProps, null)(PokemonDetailPage);
