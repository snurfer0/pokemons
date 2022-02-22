import PokemonDetailPage from '../components/pages/PokemonDetailPage';
import HomePage from '../components/pages/HomePage';



export const _routes = [
	{
		component: HomePage,
		path: '/',
		exact: true,
	},
	{
		component: PokemonDetailPage,
		path: '/pokemon/:id',
		exact: true,
	},
];
