import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link, browserHistory } from 'react-router';
import Radium from 'radium';
import { getLogin, requestLogin } from './actions';

let styles;

export const Login = React.createClass({
	propTypes: {
		userData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	render() {

		return (
			<div style={styles.container}>
				<h1>Login</h1>
				

			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		userData: state.user.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Login));

styles = {
	container: {
		padding: 'calc(115px + 3em) 1em 3em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	content: {
		padding: '2em 0em',
	},
	title: {
		fontSize: '2.5em',
		fontWeight: '200',
	},
	section: {
		padding: '2em 0em',
	},
	sectionTitle: {
		fontSize: '2em',
	},

};
