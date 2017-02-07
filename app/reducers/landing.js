import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	POST_USER_LOAD,
	POST_USER_SUCCESS,
	POST_USER_FAIL,

	GET_USER_SUCCESS,
} from 'containers/Landing/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	signupResult: {},
	signupLoading: false,
	signupError: undefined,
	referralDetails: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case POST_USER_LOAD:
		return state.merge({
			signupLoading: true,
			signupError: undefined,
			signupResult: {},
		});	
	case POST_USER_SUCCESS:
		return state.merge({
			signupLoading: false,
			signupError: undefined,
			signupResult: action.result
		});
	case POST_USER_FAIL:
		return state.merge({
			signupLoading: false,
			signupError: action.error,
			signupResult: null,
		});
	case GET_USER_SUCCESS:
		return state.merge({
			referralDetails: action.result
		});

	default:
		return ensureImmutable(state);
	}

}
