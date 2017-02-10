import React from 'react';
import { Route } from 'react-router';
import { App, Landing, Leaderboard, Login, NoMatch, User, LearnMore, Song } from 'containers';

export default (
	<Route component={App}>
		<Route path="/" component={Landing} />
		<Route path="/leaderboard" component={Leaderboard} />
		<Route path="/login" component={Login} />
		<Route path="/more" component={LearnMore} />
		<Route path="/song" component={Song} />
		<Route path="/:userId" component={User} />

		<Route path="*" component={NoMatch} />
	</Route>
);
