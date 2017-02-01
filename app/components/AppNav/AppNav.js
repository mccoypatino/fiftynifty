import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';

let styles;

export const AppNav = React.createClass({
	propTypes: {
		accountData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
	},

	getInitialState() {
		return {
			search: '',
		};
	},

	render() {
		const localUserData = localStorage.getItem('userData');
		const user = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		const location = this.props.location || {};
		const pathname = location.pathname;
		const isLight = pathname !== '/';
		return (
			<nav style={styles.navStyle(isLight)}>
				<div style={styles.navContent}>
					<Link to={'/'}>
						<span style={styles.logo}>Fifty Nifty</span>
					</Link>
					<div style={styles.rightContent}>
						<Link to={'/leaderboard'} style={styles.link}>Leaderboard</Link>
						{!!user.id &&
							<Link to={`/${user.id}`}>Your Profile</Link>	
						}
					</div>
					
				</div>
				
				
			</nav>
		);
	}

});

export default Radium(AppNav);

styles = {
	navStyle: (isLight)=> {
		return {
			minHeight: '75px',
			lineHeight: '75px',
			// boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)',
			position: 'absolute',
			zIndex: '3',
			width: '100%',
			color: isLight ? 'inherit' : 'white',
		};
	},
	navContent: {
		padding: '0em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
		borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
		// backgroundColor: '#F29696',
	},
	link: {
		paddingRight: '1em',
	},
	rightContent: {
		float: 'right',
		paddingLeft: '1em',
	},
	logo: {
		fontFamily: 'Bungee Shade',
		fontSize: '2em',
	}
};
