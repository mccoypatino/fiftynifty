import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_LEADERBOARD_LOAD,
	GET_LEADERBOARD_SUCCESS,
	GET_LEADERBOARD_FAIL,
} from 'containers/Leaderboard/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	leaders: [],
	loading: false,
	error: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_LEADERBOARD_LOAD:
		return state.merge({
			loading: true,
			error: undefined,
			leaders: [],
		});	
	case GET_LEADERBOARD_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			leaders: action.result
		});
	case GET_LEADERBOARD_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
			leaders: null,
		});

	default:
		return ensureImmutable(state);
	}
}
