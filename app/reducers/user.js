import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	GET_USER_LOAD,
	GET_USER_SUCCESS,
	GET_USER_FAIL,

	REQUEST_CALL_LOAD,
	REQUEST_CALL_SUCCESS,
	REQUEST_CALL_FAIL,

	REQUEST_LATLON_LOAD,
	REQUEST_LATLON_SUCCESS,
	REQUEST_LATLON_FAIL,

	POST_USER_UPDATE_LOAD,
	POST_USER_UPDATE_SUCCESS,
	POST_USER_UPDATE_FAIL, 

} from 'containers/User/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	user: {},
	loading: false,
	error: undefined,

	callLoading: false,
	callError: undefined,

	latLonLoading: false,
	latLonError: undefined,

	updateLoading: false,
	updateError: undefined,

});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case GET_USER_LOAD:
		return state.merge({
			loading: true,
			error: undefined,
			user: {},
		});	
	case GET_USER_SUCCESS:
		return state.merge({
			loading: false,
			error: undefined,
			user: action.result
		});
	case GET_USER_FAIL:
		return state.merge({
			loading: false,
			error: action.error,
			user: {},
		});

	case REQUEST_CALL_LOAD:
		return state.merge({
			callLoading: true,
			callError: undefined,
		});	
	case REQUEST_CALL_SUCCESS:
		return state.merge({
			callLoading: false,
			callError: undefined,
		});
	case REQUEST_CALL_FAIL:
		return state.merge({
			callLoading: false,
			callError: action.error,
		});

	case REQUEST_LATLON_LOAD:
		return state.merge({
			latLonLoading: true,
			latLonError: undefined,
		});	
	case REQUEST_LATLON_SUCCESS:
		return state.merge({
			latLonLoading: false,
			latLonError: undefined,
			user: action.result
		});
	case REQUEST_LATLON_FAIL:
		return state.merge({
			latLonLoading: false,
			latLonError: action.error,
		});
	case POST_USER_UPDATE_LOAD:
		return state.merge({
			updateLoading: true,
			updateError: undefined,
		});
	case POST_USER_UPDATE_SUCCESS:
		return state.merge({
			updateLoading: false,
			updateError: undefined,
			user: action.result,
		});
	case POST_USER_UPDATE_FAIL:
		return state.merge({
			updateLoading: false,
			updateError: action.error,
		});

	default:
		return ensureImmutable(state);
	}
}
