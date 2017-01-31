/*--------*/
// Define Action types
//
// All action types are defined as constants. Do not manually pass action
// types as strings in action creators
/*--------*/
export const GET_LEADERBOARD_LOAD = 'user/GET_LEADERBOARD_LOAD';
export const GET_LEADERBOARD_SUCCESS = 'user/GET_LEADERBOARD_SUCCESS';
export const GET_LEADERBOARD_FAIL = 'user/GET_LEADERBOARD_FAIL';

/*--------*/
// Define Action creators
//
// All calls to dispatch() call one of these functions. Do not manually create
// action objects (e.g. {type:example, payload:data} ) within dispatch()
// function calls
/*--------*/
export function getLeaderboard() {
	return (dispatch) => {
		dispatch({ type: GET_LEADERBOARD_LOAD });
		return clientFetch('/api/leaderboard')
		.then((result) => {
			dispatch({ type: GET_LEADERBOARD_SUCCESS, result });
		})
		.catch((error) => {
			console.log(error);
			dispatch({ type: GET_LEADERBOARD_FAIL, error });
		});
	};
}
