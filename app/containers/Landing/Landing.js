import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, Dialog } from '@blueprintjs/core';
import Radium from 'radium';
import Phone from 'react-phone-number-input';
import Scrollchor from 'react-scrollchor';
import MediaQuery from 'react-responsive';

import { postUser, postUserAuthentication, getReferralDetails, getCallWithVerificationCode } from './actions';
import HowToPlay from './HowToPlay';
import Invite from '../User/Invite';
import { getScore } from '../../Utilities/UserUtils';

let styles;

export const Landing = React.createClass({
	propTypes: {
		landingData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			name: '',
			phone: '',
			zipcode: '',
			error: undefined,
			signupCode: '',
			showAuthenticationPanel: false,
		};
	},

	componentWillMount() {
		this.loadData(this.props.location.query.ref);
	},

	componentWillReceiveProps(nextProps) {
		// Step 1: Show the auth panel after signup API request is completed
		const lastLoading = this.props.landingData.signupLoading;
		const nextLoading = nextProps.landingData.signupLoading;
		const nextError = nextProps.landingData.signupError;
		// If the phone number is already in use
		if (lastLoading && !nextLoading && !nextError) {
			this.setState({ showAuthenticationPanel: true });
		}

		// Step 2: Move on to user screen after auth API request is completed
		const lastAuthLoading = this.props.landingData.authenticationLoading;
		const nextAuthLoading = nextProps.landingData.authenticationLoading;
		const nextAuthError = nextProps.landingData.authenticationError;
		const nextAuthResult = nextProps.landingData.authenticationResult;
		if (lastAuthLoading && !nextAuthLoading && !nextAuthError && nextAuthResult.id) {
			this.setState({ showAuthenticationPanel: false });
			localStorage.setItem('userData', JSON.stringify(nextAuthResult));
			browserHistory.push(`/${nextAuthResult.id}`);
		}
	},
	
	updateZipcode: function(evt) { 
		this.setState({ zipcode: evt.target.value.substring(0, 5) }); 
	},

	signupSubmit: function(evt) {
		evt.preventDefault();
		if (!this.state.name) 					{ return this.setState({ error: 'Name required' }); }
		if (!this.state.zipcode) 				{ return this.setState({ error: 'Zipcode required' }); }
		if (this.state.zipcode.length !== 5) 	{ return this.setState({ error: 'Zipcode must be 5 digits' }); }
		if (!this.state.phone) 					{ return this.setState({ error: 'Phone Number required' }); }

		this.setState({ error: undefined });
		const refUser = this.props.landingData.referralDetails || {};
		const referral = refUser.id || this.props.location.query.ref;
		return this.props.dispatch(postUser(this.state.name, this.state.phone, this.state.zipcode, referral, window.variant));
	},

	authenticationSubmit: function(evt) {
		evt.preventDefault();
		if (!this.state.signupCode) 			{ return this.setState({ error: 'Signup Code required' }); }
		
		this.setState({ error: undefined });
		return this.props.dispatch(postUserAuthentication(this.state.phone, this.state.signupCode));
	},

	callWithVerificationCode: function(evt) {
		evt.preventDefault();
		return this.props.dispatch(getCallWithVerificationCode(this.state.phone));
	},

	closeAuthenticationPanel: function() {
		this.setState({ showAuthenticationPanel: false });
	},

	loadData: function(userId) {
		if (userId) { this.props.dispatch(getReferralDetails(userId)); }
	},

	logout: function() {
		localStorage.removeItem('userData');
		window.location = '/';
	},

	render() {
		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		// const localUserScore = localUser ? getScore(localUser) : 0;

		const inviteForm = (
			<div style={styles.joinForm}>
				<div style={styles.headerCall} className={'pt-card pt-elevation-3'}>
					<div style={{ paddingBottom: '1em' }}>
						<Link to={`/${localUser.id}`} >
							<Button 
									style={styles.button}
									text={'Call Your Representatives'}
									className={'pt-intent-danger pt-fill pt-large'} />
						</Link>
					</div>
					<Invite url={`https://fiftynifty.org/?ref=${localUser.id}`} />
				</div>
			</div>
		);

		const logoutForm = (
			<div style={styles.centered}>
				<button type="button" className={'pt-button pt-minimal pt-icon-log-out pt-intent-danger'} onClick={this.logout}>Logout</button>
			</div>
		);
		
		const refUser = this.props.landingData.referralDetails;
		const refText = refUser && <div style={{ textAlign: 'center' }}>
										<div style={styles.headerText}>{refUser.name} invited You</div>
									</div>;

		const error = this.state.error || this.props.landingData.signupError;
		const authError = this.state.error || this.props.landingData.authenticationError;
		const joinForm = (
			<div style={styles.joinForm}>
				<div id="join" style={styles.headerCall} className={'pt-card pt-elevation-3'}>
						{ refText }
					<div style={styles.inputHeader}> Join The Challenge	</div>
					<form onSubmit={this.signupSubmit} style={styles.form}>
						<label htmlFor={'name-input'} style={styles.inputLabel}>
							Name
							<input	
								id={'name-input'} 						className={'pt-input pt-large pt-fill'}
								placeholder={'Nicknames are okay'} 		value={this.state.name}
								onChange={(evt) => this.setState({ name: evt.target.value })} />
						</label>
						<label htmlFor={'zip-input'} style={styles.inputLabel}>
							Zipcode (where you vote)
							<input
								id={'zip-input'} type={'number'} 			className={'pt-input pt-large pt-fill'}
								placeholder={'Where are you registered?'} 	value={this.state.zipcode}
								onChange={this.updateZipcode} />
						</label>
						<label htmlFor={'phone-input'} style={styles.inputLabel}>
							Phone number (to connect you to your reps)
							<Phone
								country={'US'} 								className={'pt-input pt-large pt-fill'}
								placeholder={'Enter your phone number'} 	value={this.state.phone}
								onChange={phone => this.setState({ phone: phone })} />
							<div style={styles.inputSubtext}>
								<div 
									style={{ float: 'left', position: 'relative', top: '2px', fontSize: '0.85em', width: '10px', height: '20px', opacity: 0.7, marginRight: '7px', }} 
									className={'pt-icon-standard pt-icon-lock'} /> 
								Encrypted. We never sell or share your number. View our <Link style={styles.linkWithUnderline} to={'/about#legal'}>privacy policy</Link>.
							</div>
						</label>
						<Button
							loading={this.props.landingData.signupLoading}
							type={'submit'} style={styles.button}
							text={'Join the Challenge'}
							className={'pt-intent-primary pt-fill pt-large'}
							onClick={this.signupSubmit} />
						<div style={styles.error}>{error}</div>
					</form>
				</div>
			</div>
		);
		const joinNowButton = (
			<div style={{ width: '100%', textAlign: 'center' }}>
				<div >
					<Scrollchor to="#join">
						<Button
							role={'button'}
							text={'Join now'}
							className={'pt-fill pt-button pt-intent-primary'} />
					</Scrollchor>
				</div>
			</div>
		);
		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<div style={styles.headerImage} />
					<div style={styles.headerSplash} />
					<div style={styles.headerPresentation}>
						<div style={styles.headerTextBlock}>

							<div style={styles.section}>
								<div style={styles.headerStep}>
									<div style={styles.headerh1}>	Call your rep now</div>
									<div style={styles.headerh2}>	Real calls really matter.</div>
								</div>
								<div style={styles.headerStep}>
									<div style={styles.headerh1}>	Amplify your voice</div>
									<div style={styles.headerh2}>	Build your network, spread the word.</div>
								</div>
								<div style={styles.headerStep}>
									<div style={styles.headerh1}>	Cover the country</div>
									<div style={styles.headerh2}>	Track your progress.</div>
								</div>
							</div>

							<p style={styles.headerTextBody}>
								{variant <= 50 ?
									"It doesn't matter if you are D, or R, or other, Russian involvement in our government needs to be investigated.  We’ll speed dial for you. We’ll help you prime your network.  Three clicks, three calls, and you’re done." :
									'Join the Challenge:  Build a network that reaches all 50 states.  Call and enlist your friends to join. We’ll speed dial for you. We’ll help you prime your network.  Three clicks, three calls, and you’re done.'
								}
							</p>
							{localUser.id && 
								<Link to={`/${localUser.id}`}> 
									<div style={styles.welcomeLine}> Welcome {localUser.name}, Click here to see your progress </div>
								</Link>}
						</div>

						{!!localUser.id && inviteForm}
						{!!localUser.id && logoutForm}
						{!localUser.id && joinForm}

					</div>
				</div>

				<Dialog isOpen={this.state.showAuthenticationPanel} onClose={this.closeAuthenticationPanel} title={'Authenticate your Phone number'} style={styles.dialogBox}>
					<div className="pt-dialog-body">
						<p>We've just sent you a text message with an authentication code. Please enter the numeric code here.</p>
						<form onSubmit={this.authenticationSubmit} style={styles.form}>
							<label htmlFor={'code-input'} style={styles.inputLabel}>
								<input
									id={'code-input'} type={'number'}	className={'pt-input pt-large pt-fill'}
									placeholder={'Authentication Code'}	value={this.state.signupCode}
									onChange={(evt) => this.setState({ signupCode: evt.target.value })} />
							</label>
							<Button
								loading={this.props.landingData.authenticationLoading}
								type={'submit'} style={styles.button}
								text={'Submit Authentication Code'}
								className={'pt-intent-primary pt-fill pt-large'}
								onClick={this.authenticationSubmit} />
							<div style={styles.error}>{authError}</div>
							<Button
								loading={this.props.landingData.authenticationLoading}
								type={'submit'} style={styles.button}
								text={'Landline? Click for a call with your code'}
								className={'pt-intent-primary pt-fill pt-large'}
								onClick={this.callWithVerificationCode} />
						</form>
					</div>
				</Dialog>

				<HowToPlay localUser={localUser} />


			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		landingData: state.landing.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Landing));

styles = {
	container: {
		maxWidth: '100vw',
	},
	header: {
		position: 'relative',		
	},
	headerImage: {
		backgroundImage: 'url("/static/hands.jpg")',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		position: 'absolute',
		width: '100%',
		height: '100%',
		zIndex: 1,
		top: 0,
		left: 0,
	},
	headerSplash: {
		position: 'absolute',
		// backgroundColor: 'rgba(19, 24, 187, 0.7)',
		// backgroundImage: 'url("/static/denim.png")',
		backgroundColor: '#003D59',
		opacity: 0.8,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	headerPresentation: {
		position: 'relative',
		// backgroundColor: '#cb0027',
		zIndex: 2,
		padding: 'calc(115px + 0.2em) 1em 0.2em',
		maxWidth: '1024px',
		margin: '0 auto',
		width: '100%',
		display: 'table',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
		},
	},
	headerTextBlock: {
		color: 'white',
		display: 'table-cell',
		paddingRight: '2em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
			width: '100%',
			padding: '0.5em',
		},
	},
	headerText: {
		maxWidth: '500px',
		// color: '#cb0027',
		color: '#da0f18',
		fontSize: '1.8em',
		fontFamily: 'mrs-eaves-roman-small-caps, sans-serif',
		fontWeight: 'bold',

		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			textAlign: 'center',
			maxWidth: '100%',
		},
	},
	headerTextBody: {
		maxWidth: '500px',
		padding: '0.3em 0em',
		fontSize: '1.15em',
		lineHeight: '1.5',
		textAlign: 'justify',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			maxWidth: '100%',
			fontSize: '1em',
		},
		fontWeight: '200',
		color: 'white',
	},
	headerCall: {
		display: 'table-cell',
		backgroundColor: 'white',
		position: 'relative',
		zIndex: 2,
		fontWeight: '200',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			display: 'block',
			width: '100%',
			padding: '1em',
		},

		// padding: '2rem 1rem',
		// maxWidth: '1024px',
		// margin: '0 auto',
		// float: 'right',
	},
	inputHeader: {
		fontSize: '1.4em',
		display: 'block',
		marginBottom: '1em',
		textAlign: 'center',
	},
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
	},
	inputSubtext: {
		fontSize: '0.85em',
		opacity: 0.7,
		paddingTop: '0.25em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 437px)': {
			fontSize: '0.75em',
		},
	},
	button: {
		verticalAlign: 'bottom',
	},
	learnMoreButton: {
		width: '40%',
		display: 'table-cell',
		textDecoration: 'none',
		textAlign: 'center',
		padding: '0.5em 1em',
	},
	section: {
		padding: '2em 0em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	form: {
		padding: 0,
		margin: 0,
	},
	joinForm: {
		padding: '1.6em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			padding: '0.5em',
		},
	},
	sectionHeader: {
		fontSize: '2em',
		fontWeight: '600',
		marginBottom: '1.5em',
		textAlign: 'center',
		//color: 'white'
	},
	smallInformation: {
		fontSize: '0.75em',
		width: '100%',
		marginTop: '0.5em',
		padding: '0.3em 0.3em',
		clear: 'both',
	},
	smallInformationText: {
		float: 'right',
		width: '90%',
	},
	lockImage: {
		height: '1em',
		position: 'relative',
		top: '0.2em',
	},
	iconsTable: {
		display: 'table',
		width: '100%',
		textAlign: 'center'
	},
	howToPlaySection: {
		display: 'table-cell',
		width: '40%,',
		textAlign: 'center',
		padding: '1em',
	},
	error: { 
		color: 'rgb(203, 0, 39)',
		fontSize: '1.25em',
		paddingTop: '.5em',
	},
	joinMobileBackground: {
		backgroundRepeat: 'no-repeat',
		backgroundColor: 'rgb(0, 61, 89)',
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		maxWidth: '100%',
		boxShadow: 'inset 0 0 0 100vw rgba(0,61,89,.6)',
		padding: '1em',
		'@media screen and (max-width: 400px)': {
			padding: '0em',
		},
	},
	dialogBox: {
		maxWidth: '100%',
		top: '10%',
	},
	welcomeLine: {
		textAlign: 'center',
		padding: '1em',
		fontWeight: 'bold',
		color: '#da0f18',
		background: 'rgba( 255, 255, 255, 0.6)',
		borderRadius: '5px',
		letterSpacing: '0.05em',
	},
	headerStep: {
		textAlign: 'left',
		marginBottom: '20px',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			textAlign: 'center',
		},
	},
	headerh1: {
		fontWeight: 'bold',
		fontSize: '2em',
		color: '#da0f18',
	},
	headerh2: {
		fontSize: '1.25em',
		// visibility: 'hidden',
	},
	centered: {
		textAlign: 'center',
	},
	linkWithUnderline: {
		textDecoration: 'underline',
	}
};
