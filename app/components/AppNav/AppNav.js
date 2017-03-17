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
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		const loggedIn = localUser.id && localUser.hash;

		const location = this.props.location || {};
		const pathname = location.pathname;
		return (
			<nav style={styles.navStyle}>
				<div style={styles.navContent}>
					<div style={{ display: 'inline-block' }}>
						<div className={'show-child-on-hover'} style={styles.logoWrapper}>
							<Link to={'/'} style={styles.logoAndTagline}>
								<div style={styles.logo} className={'header-logo'} />
								<div style={styles.tagline}>
									An MIT Media Lab Project</div>
							</Link>

							<div style={styles.songWrapper} className={'hidden-child'}>
								<Link to={'/song'} className={'pt-button pt-minimal pt-icon-music'} style={styles.songIcon} />
							</div>
						</div>
						
						
						<div style={styles.linkWrapper}>
							<Link to={'/'} style={styles.link(pathname === '/')}>Home</Link>
							
							{!!loggedIn &&
								<Link to={`/${localUser.id}`} style={styles.link(pathname === `/${localUser.id}`)}>Your Profile</Link>
							}
							{!loggedIn &&
								<Link to={'/login'} style={styles.link(pathname === '/login')}>Login</Link>
							}
							
							<Link to={'/leaderboard'} style={styles.link(pathname === '/leaderboard')}>Leaderboard</Link>
							<Link to={'/about'} style={styles.link(pathname === '/about')}>About</Link>
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
		maxWidth: '100vw',
		overflow: 'hidden',
		color: 'white',
	},
	navContent: {
		padding: '1.5em 1em 1.5em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
		//borderBottom: '1px solid rgba(0, 0, 0, 0.25)',
		textAlign: 'center',
		// backgroundColor: '#F29696',
	},
	logoWrapper: {
		position: 'relative',
	},
	songWrapper: {
		position: 'absolute',
		right: '-70px',
		top: '0px',
		padding: '7px 15px',
		
	},
	songIcon: {
		border: '2px solid rgba(255, 255, 255, 0.5)',
		padding: '10px',
		borderRadius: '40px',
		height: '40px',
		color: 'rgba(255, 255, 255, 0.75)',
		lineHeight: '0px',
	},
	logo: { // Relation : 800/88, so 100/11
		width: '90vw',
		height: '9.9vw',
		backgroundSize: '100%',
		textAlign: 'center',
		backgroundRepeat: 'no-repeat',
		'@media (min-width: 635px)': {
			width: '500px',
			height: '58px',
		},
		// See styles.css for image use
		// Need to set images there so they pre-load correctly.
	},
	tagline: {
		opacity: '0.5',
		fontSize: '13px',
		':hover': {
			color: 'white',
		}
	},
	logoAndTagline: {
		textDecoration: 'none',
		color: 'white',
	},
	linkWrapper: {
		display: 'table',
		width: '100%',
	},
	link: function(isCurr) {
		return {
			display: 'table-cell',
			textDecoration: 'none',
			textAlign: 'center',
			width: '25%',
			padding: '1em 0em',
			color: isCurr ? '#848484' : 'white',
		};
	},
	// rightContent: {
	// 	float: 'right',
	// 	paddingLeft: '1em',
	// },
	
};
