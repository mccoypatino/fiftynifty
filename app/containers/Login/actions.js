/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const CREATE_VERIFICATION_LOAD = 'user/CREATE_VERIFICATION_LOAD';
export const CREATE_VERIFICATION_SUCCESS = 'user/CREATE_VERIFICATION_SUCCESS';
export const CREATE_VERIFICATION_FAIL = 'user/CREATE_VERIFICATION_FAIL';
export const CHECK_VERIFICATION_LOAD = 'user/CHECK_VERIFICATION_LOAD';
export const CHECK_VERIFICATION_SUCCESS = 'user/CHECK_VERIFICATION_SUCCESS';
export const CHECK_VERIFICATION_FAIL = 'user/CHECK_VERIFICATION_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/

export function createVerificationCode(phone, mode) {
	return (dispatch) => {
		dispatch({ type: CREATE_VERIFICATION_LOAD });
		return clientFetch((`/api/twofactor/${phone}/${mode}`))
			.then(() => {
				dispatch({ type: CREATE_VERIFICATION_SUCCESS });
			})
			.catch((error) => {
				dispatch({ type: CREATE_VERIFICATION_FAIL, error });
			});
	};
}

export function checkVerificationCode(phone, code) {
	return (dispatch) => {
		dispatch({ type: CHECK_VERIFICATION_LOAD });
		return clientFetch('/api/twofactor', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				phone: phone,
				code: code,
			})
		})
		.then((result) => {
			dispatch({ type: CHECK_VERIFICATION_SUCCESS, result });
		})
		.catch((error) => {
			dispatch({ type: CHECK_VERIFICATION_FAIL, error });
		});
	};
}
