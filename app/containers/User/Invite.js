import React, { PropTypes } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import Radium from 'radium';

let styles;

export const Invite = React.createClass({
	propTypes: {
		shareUrl: PropTypes.string,
		url: PropTypes.string,
	},
	getInitialState() {
		return { copied: false };
	},

	render() {
		const shareUrl = this.props.url;

		// Mail
		const mailTitle = 'Call Congress';
		const mailBody = `I am enlisting you in a Challenge.  Your mission is to build a network that spans all 50 states and inspires friends to call their Congresspeople about an issue of importance.  The app makes calling and inviting friends easy:  three clicks and you’re done.  It keeps a score of calls and shows a map of where your network spreads.

Calls matter!  Issues matter!  More than ever it’s important to get your voice heard effectively.  And to use the network to multiply it, hence the Challenge.

This challenge is about issues like the Immigration Executive Order, potential Russian interference in the government and the Affordable Care Act.  But when you call, you can say whatever you like.

This tool, ${shareUrl}, was created by Andy Lippman and colleagues at the MIT Media Lab, and it will help you speed dial your representatives and alert your friends.  Follow the link below to learn more.  Check the leaderboard to see how you do.

Click or paste this link into your browser: ${shareUrl}`;

		// Facebook
		const facebookTitle = encodeURI('Fifty Nifty');
		const facebookAppID = '375710412814285';
		const facebookDescription = encodeURI('Call your congresspeople! Join the challenge, friends don’t let friends stay silent. #FiftyNifty');
		const facebookURL = `https://www.facebook.com/sharer.php?app_id=${facebookAppID}&title=${facebookTitle}&u=${encodeURI(shareUrl)}&description=${facebookDescription}`;
		const we = 600;
		const he = 500;

		// Twitter
		const twitterText = encodeURI('Call your congresspeople! Join the challenge, friends don’t let friends stay silent ');
		const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURI(shareUrl)}&text=${twitterText}&hashtags=Fiftynifty`;

		return (
			<div id="invite" style={styles.sectionBackground}>
			<div style={styles.inviteSection}>
				<div style={styles.inviteHeader}>Invite</div>
				<p>Invite people to join your network by joining Fifty Nifty with this link:</p>
				<div style={styles.inviteLink} className={'pt-input-group pt-fill'}>
					<input className={'pt-input'} readOnly={true} value={shareUrl} />
					<CopyToClipboard 
									style={styles.copyButton} 
									text={shareUrl}
									onCopy={() => this.setState({ copied: true })}>
						<a role="button" className="pt-button pt-copy"><span className="pt-icon-standard pt-icon-clipboard" />Copy</a>
					</CopyToClipboard>
				</div>
				<br /> 
				<br />
				<a style={styles.button} className={'pt-button pt-fill'} href={`mailto:?subject=${encodeURI(mailTitle)}&body=${encodeURI(mailBody)}`}>
					Invite via email
				</a> 
				<br /> 
				<br />
				<a 	
					style={styles.button} 
					className={'pt-button pt-fill'} 
					onClick={() =>{	
						const xleft = (screen.width / 2) - (we / 2); // Centering
						const xtop = (screen.height / 2) - (he / 2);
						window.open(facebookURL,
						'',
						`toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,width=${we},height=${he},top=${xtop},left=${xleft}`); 
					}}>
					Post on Facebook
				</a> 
				<br /> 
				<br />
				<a 	
					style={styles.button} 
					className={'pt-button pt-fill'} 
					onClick={() =>{	
						const xleft = (screen.width / 2) - (we / 2); // Centering
						const xtop = (screen.height / 2) - (he / 2);
						window.open(twitterURL,
						'',
						`toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,width=${we},height=${he},top=${xtop},left=${xleft}`); 
					}}>
					Post on Twitter
				</a> 
			</div>
			</div>
		);
	},
});

export default Radium(Invite);

styles = {
	network: {
		display: 'inline-block',
		textAlign: 'center',
		margin: '1em 1em',
		opacity: '1'
	},
	sectionBackground: {
		backgroundColor: '#003c58',
	},
	inviteSection: {
		textAlign: 'center',
		color: 'white',
		opacity: '1',
		padding: '2em',
		fontWeight: 'lighter',
		width: '80%',
		margin: 'auto',
		'@media screen and (minResolution: 3dppx), screen and (maxWidth: 767px)': {
			padding: '2em 0em',
		},
	},
	inviteHeader: {
		color: '#fff',
		fontSize: '1.9em',
		textAlign: 'center',
		letterSpacing: '0.1em',
		paddingBottom: '1em',
		fontWeight: '200',
	},
	inviteLink: {
		fontWeight: 'bold',
		fontSize: '1.2em',
		WebkitUserSelect: 'text',  /* Chrome all / Safari all */
		MozUserSelect: 'text',     /* Firefox all */
		MsUserSelect: 'text',      /* IE 10+ */
		UserSelect: 'text'          /* Likely future */

	},
	button: {
		color: '#003d59',
		fontWeight: 'bold',
		letterSpacing: '0em',
		maxWidth: '250px',
	},
};
