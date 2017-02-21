/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_USER_LOAD = 'user/GET_USER_LOAD';
export const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
export const GET_USER_FAIL = 'user/GET_USER_FAIL';

export const REQUEST_CALL_LOAD = 'user/REQUEST_CALL_LOAD';
export const REQUEST_CALL_SUCCESS = 'user/REQUEST_CALL_SUCCESS';
export const REQUEST_CALL_FAIL = 'user/REQUEST_CALL_FAIL';

export const REQUEST_LATLON_LOAD = 'user/REQUEST_LATLON_LOAD';
export const REQUEST_LATLON_SUCCESS = 'user/REQUEST_LATLON_SUCCESS';
export const REQUEST_LATLON_FAIL = 'user/REQUEST_LATLON_FAIL';

<<<<<<< HEAD
export const POST_USER_UPDATE_LOAD = 'user/POST_USER_UPDATE_LOAD';
export const POST_USER_UPDATE_SUCCESS = 'user/POST_USER_UPDATE_SUCCESS';
export const POST_USER_UPDATE_FAIL = 'user/POST_USER_UPDATE_FAIL';
=======
export const POST_USER_UPDATE = 'user/POST_USER_UPDATE';
export const POST_USER_SUCCESS = 'user/POST_USER_SUCCESS';
export const POST_USER_FAIL = 'user/POST_USER_FAIL';
>>>>>>> 55f4ef6161ef3b3eb595cab1601aaf0cf991755a


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

export function requestCall(repId, id) {
	return (dispatch) => {
		dispatch({ type: REQUEST_CALL_LOAD });
		return clientFetch('/api/callfromserver', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: id,
				repId: repId,
			})
		})
		.then((result) => {
			dispatch({ type: REQUEST_CALL_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: REQUEST_CALL_FAIL, error });
		});
	};
}

export function requestLatLong(address, userId) {
	return (dispatch) => {
		dispatch({ type: REQUEST_LATLON_LOAD });
		return clientFetch('/api/user/address', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				address: address,
				userId: userId,
			})
		})
		.then((result) => {
			dispatch({ type: REQUEST_LATLON_SUCCESS, result });
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: REQUEST_LATLON_FAIL, error });
		});
	};
}

export function putUserUpdate(userId, name, zipcode) {
	return (dispatch) => {
		dispatch({ type: POST_USER_UPDATE });
		return clientFetch('/api/user/update', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: userId,
				name: name,
				zipcode: zipcode,
			})
		})
		.then((result) => {
			dispatch({ type: POST_USER_UPDATE_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: POST_USER_UPDATE_FAIL, error });
		});
	};
}
