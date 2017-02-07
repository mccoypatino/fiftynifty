import Immutable from 'immutable';
import { ensureImmutable } from './index';

/* ---------- */
// Load Actions
/* ---------- */
import {
	CREATE_VERIFICATION_LOAD,
	CREATE_VERIFICATION_SUCCESS,
	CREATE_VERIFICATION_FAIL,
	CHECK_VERIFICATION_LOAD,
	CHECK_VERIFICATION_SUCCESS,
	CHECK_VERIFICATION_FAIL,
} from 'containers/Login/actions';

/* ------------------- */
// Define Default State
/* ------------------- */
const defaultState = Immutable.Map({
	codeCreationSuccess: undefined,
	codeCreationLoading: false,
	codeCreationError: undefined,
	verificationSuccess: undefined,
	verificationLoading: false,
	verificationError: undefined,
});

/* ----------------------------------------- */
// Bind actions to specific reducing functions
/* ----------------------------------------- */
export default function reducer(state = defaultState, action) {
	switch (action.type) {
	
	case CREATE_VERIFICATION_LOAD:
		return state.merge({
			codeCreationSuccess: undefined,
			codeCreationLoading: true,
			codeCreationError: undefined,
		});	
	case CREATE_VERIFICATION_SUCCESS:
		return state.merge({
			codeCreationSuccess: true,
			codeCreationLoading: false,
			codeCreationError: undefined,
		});	
	case CREATE_VERIFICATION_FAIL:
		return state.merge({
			codeCreationSuccess: false,
			codeCreationLoading: false,
			codeCreationError: action.error,
		});	
	case CHECK_VERIFICATION_LOAD:
		return state.merge({
			verificationSuccess: undefined,
			verificationLoading: true,
			verificationError: undefined,
		});	
	case CHECK_VERIFICATION_SUCCESS:
		return state.merge({
			verificationSuccess: true,
			verificationLoading: false,
			verificationError: undefined,
		});	
	case CHECK_VERIFICATION_FAIL:
		return state.merge({
			verificationSuccess: false,
			verificationLoading: false,
			verificationError: action.error,
		});	

	default:
		return ensureImmutable(state);
	}

}

