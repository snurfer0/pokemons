import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ApplicationState } from '../../store/index';
import { Pokemon } from '../../store/pokemons/types';

interface PropsFromState {
	pokemons: Pokemon[];
}

const PokemonDetailPage: React.FC<PropsFromState> = ({ pokemons }) => {
	const [pokemon, setPokemon] = useState<Pokemon>();
	const params: { id: string } = useParams();
	const history = useHistory();

	useEffect(() => {
		const { id } = params;
		let pokemon = pokemons.find((p) => p.id === parseInt(id));
		if (!pokemon) history.push('/');
		if (pokemon) {
			setPokemon(pokemon);
		}
	}, []);

	return (
		<div className='pokemon-detail-container'>
			<div className='wrapper'>
				<div className='pokemon'>
					<button onClick={() => history.push('/')}>Back</button>
					<div className='img-container'>
						<img src={pokemon?.sprites.front_shiny} alt='' />
					</div>
					<p className='pokemon-name'>{pokemon?.name}</p>
					<div className='pokemon-props'>
						Height: {pokemon?.height} &nbsp; Weight:{' '}
						{pokemon?.height} &nbsp; Base experience:{' '}
						{pokemon?.base_experience} &nbsp; Default:{' '}
						{pokemon?.is_default} &nbsp; Order: {pokemon?.order}{' '}
						&nbsp; Species: {pokemon?.species.name}
					</div>
					<div className='tabs'>
						<div className='tab'>
							<input type='checkbox' id='chck1' />
							<label className='tab-label' htmlFor='chck1'>
								Abilities
							</label>
							<div className='tab-content'>
								<ul>
									{pokemon?.abilities.map((a) => {
										return <li>{a.ability.name}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className='tabs'>
						<div className='tab'>
							<input type='checkbox' id='check2' />
							<label className='tab-label' htmlFor='check2'>
								Forms
							</label>
							<div className='tab-content'>
								<ul>
									{pokemon?.abilities.map((a) => {
										return <li>{a.ability.name}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className='tabs'>
						<div className='tab'>
							<input type='checkbox' id='check3' />
							<label className='tab-label' htmlFor='check3'>
								Types
							</label>
							<div className='tab-content'>
								<ul>
									{pokemon?.abilities.map((a) => {
										return <li>{a.ability.name}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>
					<div className='tabs'>
						<div className='tab'>
							<input type='checkbox' id='check4' />
							<label className='tab-label' htmlFor='check4'>
								Game Indicies
							</label>
							<div className='tab-content'>
								<ul>
									{pokemon?.abilities.map((a) => {
										return <li>{a.ability.name}</li>;
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = ({ pokemons }: ApplicationState) => {
	return {
		pokemons: pokemons.data,
	};
};

export default connect(mapStateToProps, null)(PokemonDetailPage);
