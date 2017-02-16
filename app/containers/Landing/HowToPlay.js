import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link as UnwrappedLink} from 'react-router';
const Link = Radium(UnwrappedLink);
let styles;

export const HowToPlay  = React.createClass({

	propTypes: {
		localUser: PropTypes.object,
	},

	render() {
		const localUserId = this.props.localUser.id;
		return (
			<div style={styles.section}>
				<div style={styles.content}>
					<div style={styles.sectionHeader} id="howToPlay">The Fifty Nifty Challenge</div>

					<p>Fifty Nifty is a grassroots challenge to participate in democracy by building a network of friends that make calls to congresspeople in all 50 states. Live phone calls are the best way to directly express your opinion on an issue to your elected officials. Your mission is to pass this along to friends who will make calls and also pass the link along to others who will do the same. It's a social chain letter and a call to action for a better participatory democracy. Call and tell others to do the same. We’ll help you make the call and express your message.</p>

					<p>As you invite more friends to the game - your network will grow.</p>

					<div style={styles.image}>
						<img style={{ width: '100%' }} alt={'network'} src={'static/network.png'} />
					</div>

					<p>As your friends make calls and invite more friends, your progress map will start to fill.</p>
					<div style={styles.image}>
						<img style={{ width: '100%' }} alt={'map'} src={'static/map.png'} />
					</div>

					<Link to={'/about'}>
						<p style={styles.learnMore}><button style={{color:'white'}} type="button" className="pt-button pt-intent-primary pt-icon-add" >Learn More</button></p>
					</Link>
					{/* <div style={styles.sectionHeader} id="howToPlay">How to Play</div>
					<Link to={localUserId ? `/${localUserId}` : '/#join'} style={styles.howToPlaySection} className={'pt-card pt-elevation-3'}>
						<img style={styles.sectionImage} src={"static/Icon1.png"}/>

						<div style={styles.sectionText}>
							<div style={styles.sectionTitle}>Join</div>
							Provide your zipcode and phone to connect directly to your Represenative and Senators.
						</div>
					</Link>

					<Link to={localUserId ? `/${localUserId}` : '/#join'} style={styles.howToPlaySection} className={'pt-card pt-elevation-3'}>
						<img style={styles.sectionImage} src={"static/Icon2.png"} />
						<div style={styles.sectionText}>
							<div style={styles.sectionTitle}>Use your voice</div>
							Call your Representative or Senator and talk
							to them about an issue you choose.
						</div>
					</Link>

					<Link to={localUserId ? '/#invite' : '/#join'} style={styles.howToPlaySection} className={'pt-card pt-elevation-3'}>
						<img style={styles.sectionImage} src={"static/Icon3.png"} />
						<div style={styles.sectionText}>
							<div style={styles.sectionTitle}>Spread your influence</div>
							Share the link with your friends in other states. When someone in your network does the same, you get the points.
						</div>
					</Link>
					<Link to={'/leaderboard'} style={styles.howToPlaySection} className={'pt-card pt-elevation-3'}>
						<img style={styles.sectionImage} src={"static/Icon4.png"} />
						<div style={styles.sectionText}>
							<div style={styles.sectionTitle}>Collect 'em all!</div>
							When you get someone from all 50 states to make a call, you win!
						</div>
					</Link>

					<Link to={'/about'}>
						<p style={styles.learnMore}><button style={{color:'white'}} type="button" className="pt-button pt-intent-primary pt-icon-add" >Learn More</button></p>
					</Link> */}

				</div>
			</div>
		)
	}

});

export default Radium(HowToPlay);


styles = {
	section: {
		backgroundColor:"#003d59",
		padding: '2em 1em',
		margin: '0 auto',
		backgroundSize:'cover',
		fontWeight: 'lighter',
	},
	sectionHeader: {
		fontSize: '2em',
		fontWeight: 'lighter',
		margin: '1.5em 0em',
		textAlign:'center',
		color:'white',
		letterSpacing:'0.1em',
	},
	howToPlaySection: {
		// display:'table-cell',
		position: 'relative',
		display: 'inline-block',
		textDecoration: 'none',
		width:'48%',
		margin: '0px 1% 10px',
		textAlign:'left',
		height: 150,
		verticalAlign: 'top',
		padding: '1.75em 1em',
		color:'white',
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			width: '100%',
			margin: '0px 0px 10px',
			height: 'auto',
			minHeight: '150px',
		},
	},
	sectionImage: {
		position: 'absolute',
		width: '50px',
		left: 15,
		top: 25,
	},
	sectionText: {
		paddingLeft: '75px'
	},
	sectionTitle: {
		fontWeight: '600',
		fontSize: '1.2em',
		paddingBottom: '0.5em',
	},
	learnMore: {
		textAlign:'center',
		color:'white',
		padding:'1em',
	},
	content:{
		maxWidth:'1024px',
		margin: '0 auto',
		color: 'white',
		fontSize: '1.1em',
		lineHeight: '1.4',
		marginBottom: '2em',
		letterSpacing: '1px',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			padding: '0em .5em',
		},
	},
	image: {
		width: '60%', 
		margin: '2em auto',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			width: '100%', 
		},
	},

};