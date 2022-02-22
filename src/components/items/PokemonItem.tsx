import React, {useEffect, useState} from 'react';
import { Pokemon } from '../../store/pokemons/types';

interface Props {
	pokemon: Pokemon;
}

const PokemonItem: React.FC<Props> = ({ pokemon }) => {

	
	return (
		<div className='pokemon-container'>
			<div className='pokemon'>
				<img src={pokemon.sprites.front_shiny} alt='pokemon' />
				<div className='name'>{pokemon.name}</div>
				<div className='props-container'>
					<div className='prop'>
						<p className='label'>Height</p>
						<p className='value'>{pokemon.height}</p>
					</div>
					<div className='prop'>
						<p className='label'>Weight</p>
						<p className='value'>{pokemon.weight}</p>
					</div>
					<div className='prop'>
						<p className='label'>Abilities</p>
						<div className='value'>
							{pokemon.abilities.map((abilityItem, index) => {
								if (index > 1) return null;
								return (
									<p key={abilityItem.ability.name}>
										{abilityItem.ability.name}
									</p>
								);
							})}
						</div>
					</div>
				</div>
				<div className='pokemon-footer'>
					<button className='see-details-button'>See Details</button>
				</div>
			</div>
		</div>
	);
};

export default PokemonItem;
