import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

let styles;

export const AppNav = React.createClass({
	propTypes: {
		accountData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		logoutHandler: PropTypes.func,
	},

	getInitialState() {
		return {
			search: '',
		};
	},


	render() {
		
		return (
			<nav style={styles.navStyle}>
				<Link to={'/'}>Fifty Nifty</Link>

			</nav>
		);
	}

});

export default Radium(AppNav);

styles = {
	navStyle: {
		minHeight: '75px',
		lineHeight: '75px',
		// boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)',
		padding: '0em 1em',
		position: 'absolute',
		zIndex: '3',
		width: '100%',
	},
};
