import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { _routes } from './utils/_routes';

const App = () => {
  return (
		<Switch>
			{_routes.map((route) => (
				<Route
					key={route.path}
					path={route.path}
					component={route.component}
					exact={route.exact}
				/>
			))}
		</Switch>
  );
}

export default App;
