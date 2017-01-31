import React from 'react';
import { Route } from 'react-router';
import { App, Landing, Leaderboard, NoMatch, User } from 'containers';

export default (
	<Route component={App}>
		<Route path="/" component={Landing} />
		<Route path="/leaderboard" component={Leaderboard} />
		<Route path="/:userId" component={User} />

		<Route path="*" component={NoMatch} />
	</Route>
);
