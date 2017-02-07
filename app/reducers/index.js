import Immutable from 'immutable';
import { combineReducers } from 'redux';
import landing from './landing';
import leaderboard from './leaderboard';
import user from './user';
import login from './login';

export function ensureImmutable(state) {
	// For some reason the @@INIT action is receiving a state variable that is a regular object.
	// If that's the case, cast it to Immutable and keep chugging.
	// If the @@INIT weirdness can be solved, we can remove this function.
	let output;
	if (!Immutable.Iterable.isIterable(state)) {
		output = Immutable.fromJS(state);
	} else {
		output = state;
	}
	return output;
}

export default combineReducers({
	landing,
	leaderboard,
	user,
	login,
});
