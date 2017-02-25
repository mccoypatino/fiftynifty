import React from 'react';
import { Route } from 'react-router';
// import { App, Landing, Leaderboard, Login, NoMatch, User, About, Song } from 'containers';

function getComponent(component) {
	return (location, cb)=> {
		System.import(`containers/${component}/${component}`)
		.then(function(module) {
			cb(null, module.default);
		})
		.catch(function(error) {
			throw new Error(`Dynamic page loading failed: ${error}`);
		});
	};
}

export default (
	<Route getComponent={getComponent('App')}>
		<Route path="/" getComponent={getComponent('Landing')} />
		<Route path="/leaderboard" getComponent={getComponent('Leaderboard')} />
		<Route path="/login" getComponent={getComponent('Login')} />
		<Route path="/about" getComponent={getComponent('About')} />
		<Route path="/song" getComponent={getComponent('Song')} />
		<Route path="/stats" getComponent={getComponent('Stats')} />
		<Route path="/:userId" getComponent={getComponent('User')} />

		<Route path="*" getComponent={getComponent('NoMatch')} />
	</Route>
);
