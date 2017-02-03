/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_USER_LOAD = 'user/GET_USER_LOAD';
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'user/GET_USER_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getUser(userId) {
	return (dispatch) => {
		dispatch({ type: GET_USER_LOAD });
		return clientFetch(`/api/user?userId=${userId}`)
		.then((result) => {
			dispatch({ type: GET_USER_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_USER_FAIL, error });
		});
	};
}

export function requestCall(congressNumber, userId) {
	return (dispatch) => {
		return clientFetch('/api/callfromserver', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				congressNumber: congressNumber,
				userId: userId,
			})
		});
	}; // Do then and catch
}

export function requestLatLong(address, zipcode) {
	console.log('2');
	return (dispatch) => {
		return clientFetch('/api/address', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address: address,
				zipcode: zipcode,
			})
		})
		.then((result) => {
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});
	};
}
