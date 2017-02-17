import React, { PropTypes } from 'react';
import {
	ShareButtons,
	generateShareIcon,
} from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import Radium from 'radium';


let styles;

const {
	FacebookShareButton,
	GooglePlusShareButton,
	TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');


export const Invite = React.createClass({
	propTypes: {
		shareUrl: PropTypes.string,
	},
	getInitialState() {
		return { copied: false };
	},

	render() {
		const shareUrl = this.props.url;
		const title = 'Join the Fifty Nifty Game!';

		const hashtag = encodeURIComponent("#FiftyNifty")

		// Mail
		const mailTitle = 'Call Congress';
		const mailBody = `I am writing to enlist you in a network challenge — use your network for action. Read the call to action below and MOST IMPORTANT, pass this on and convince your friends to follow suit. That’s the Fifty Nifty Challenge — use your grassroots networks to multiply your power.\n\nCall your Representatives in Congress NOW. It doesn't matter if you are D, or R, or other: every citizen should demand an exhaustive investigation to clear up the Russian mess. Flynn is the tip of the iceberg, but there may be an International Watergate brewing here. A month ago, The Department of Justice warned the White House, but no action was taken. (https://www.washingtonpost.com/world/national-security/justice-department-warned-white-house-that-flynn-could-be-vulnerable-to-russian-blackmail-officials-say/2017/02/13/fc5dab88-f228-11e6-8d72-263470bf0401_story.html?utm_term=.ae8dec347782)\n\nSince the White House has not taken action, the citizenry must. Our calls really matter, and Congress must act firmly. This tool, http://fiftynifty.org, was created by Andy Lippman and colleagues at the MIT Media Lab, and it will help you speed dial your representatives and alert your friends.\n\nClick or paste this link into your browser: ${shareUrl}`;

		// Facebook
		const facebookTitle = encodeURI('Fifty Nifty');
		const facebookDescription = encodeURI('It doesn\'t matter if you are D, or R, or other: every citizen should demand an exhaustive investigation to clear up the Russian mess. Our calls really matter, and Congress must act firmly. This tool will help you speed dial your representatives and enlist your friends.');
		const facebookSummary = encodeURI('Call your Representatives in Congress NOW ')+hashtag;
		const facebookURL = `https://www.facebook.com/sharer/sharer.php?title=${facebookTitle}&quote=${facebookSummary}&u=${encodeURI(shareUrl)}&description=${facebookDescription}`;
		const we = 600;
		const he = 500;

		// Twitter
		const twitterText = encodeURI('Call your congresspeople! Join the challenge, friends don’t let friends stay silent ')+hashtag;
		const twitterURL = `https://twitter.com/intent/tweet?url=${encodeURI(shareUrl)}&text=${twitterText}`;

		return (
			<div id="invite" style={styles.sectionBackground}>
			<div style={styles.inviteSection}>
				<div style={styles.inviteHeader}>Invite</div>
				<p>Invite people to join your network by joining Fifty Nifty with this link:</p>
				<p style={styles.inviteLink}><a href={shareUrl}>{shareUrl}</a></p>
				<CopyToClipboard 
								style={styles.copyButton} 
								text={shareUrl}
								onCopy={() => this.setState({ copied: true })}>
					<a role="button" className="pt-button pt-minimal"><span className="pt-icon-standard pt-icon-clipboard" /> Copy to clipboard</a>
				</CopyToClipboard>
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
					Invite your Facebook network
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
					Invite your Twitter followers
				</a> 
				{ /* <div>
					<div style={styles.network}>
						<FacebookShareButton
							url={shareUrl}
							title={'Join the Fifty Nifty challenge, mobilize your network, friends don’t let friends stay silent.'}
							text={'This is a social phone tree that I am joining.  Let’s call our congressmen and speak out.  If we reach 50 states, we win.'}>
							<FacebookIcon
								size={40}
								round />
						</FacebookShareButton>
					</div>
					<div style={styles.network}>
						<TwitterShareButton
							url={shareUrl}
							title={'Call your congresspeople! Join the FiftyNifty challenge, friends don’t let friends stay silent.'}>
							<TwitterIcon
								size={40}
								round />
						</TwitterShareButton>
					</div>

					<div style={styles.network}>
						<GooglePlusShareButton
							url={shareUrl}>
							<GooglePlusIcon
								size={40}
								round />
						</GooglePlusShareButton>
					</div>
				</div> */ }
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
		opacity:'1'
	},
	sectionBackground: {
		backgroundColor:"#003c58",
	},
	inviteSection: {
		textAlign: 'center',
		color:'white',
		opacity:'1',
		padding: '2em',
		fontWeight:'lighter',
		width:'80%',
		margin:'auto',
        '@media screen and (minResolution: 3dppx), screen and (maxWidth: 767px)': {
            padding: '2em 0em',
        },
	},
	inviteHeader: {
		color:"#fff",
		fontSize: '1.9em',
		textAlign:'center',
		letterSpacing:'0.1em',
		paddingBottom:'1em',
		fontWeight: '200',
	},
	inviteLink: {
		fontWeight:'bold',
		fontSize:'1.2em',
		WebkitUserSelect: 'text',  /* Chrome all / Safari all */
		MozUserSelect: 'text',     /* Firefox all */
		MsUserSelect: 'text',      /* IE 10+ */
		UserSelect: 'text'          /* Likely future */

	},
	copyButton: {
		color:"#d9d9d9",
	},
	button:{
		color:'#003d59',
		fontWeight: 'bold',
		letterSpacing:'0em',
        maxWidth: '250px',
	},
};
