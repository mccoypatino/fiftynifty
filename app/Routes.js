import React from 'react';
import { Route } from 'react-router';
import { App, Landing, NoMatch, User } from 'containers';

export default (
	<Route component={App}>
		<Route path="/" component={Landing} />
		<Route path="/user/:username" component={User} />

		<Route path="*" component={NoMatch} />
	</Route>
);
