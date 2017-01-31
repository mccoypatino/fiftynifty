/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const POST_USER_LOAD = 'user/POST_USER_LOAD';
export const POST_USER_SUCCESS = 'user/POST_USER_SUCCESS';
export const POST_USER_FAIL = 'user/POST_USER_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function postUser(name, phone, zipcode, referral) {
	return (dispatch) => {
		dispatch({ type: POST_USER_LOAD });
		return clientFetch('/api/user', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name,
				phone: phone,
				zipcode: zipcode,
				referral: referral,
			})
		})
		.then((result) => {
			dispatch({ type: POST_USER_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: POST_USER_FAIL, error });
		});
	};
}
