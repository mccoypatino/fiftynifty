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
		return (
			<nav style={styles.navStyle}>
				<div style={styles.navContent}>
					<div style={{ display: 'inline-block' }}>
						<Link to={'/'} style={styles.logo}>Fifty Nifty</Link>
						
						<div style={styles.linkWrapper}>
							<Link to={'/leaderboard'} style={styles.link}>Leaderboard</Link>
							{!!user.id &&
								<Link to={`/${user.id}`} style={styles.link}>Your Profile</Link>
							}
							{!user.id &&
								<Link to={'/login'} style={styles.link}>Login</Link>
							}	
						</div>
					</div>
					
				</div>
				
				
			</nav>
		);
	}

});

export default Radium(AppNav);

styles = {
	navStyle: {
			minHeight: '75px',
			// lineHeight: '75px',
			// boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.5)',
			position: 'absolute',
			zIndex: '3',
			width: '100%',
			color: 'white',
	},
	navContent: {
		padding: '1em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
		//borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
		textAlign: 'center',
		// backgroundColor: '#F29696',
	},
	logo: {
		fontFamily: 'Bungee Shade',
		fontSize: '3em',
		textDecoration: 'none',
		display: 'inline-block',
		margin: '0 auto',
		whiteSpace: 'nowrap',
		paddingTop: '0.25em',
	},
	linkWrapper: {
		display: 'table',
		width: '100%',
	},
	link: {
		display: 'table-cell',
		textDecoration: 'none',
		textAlign: 'center',
		padding: '1em 0em',
	},
	// rightContent: {
	// 	float: 'right',
	// 	paddingLeft: '1em',
	// },
	
};
