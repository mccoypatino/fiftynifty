import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button } from '@blueprintjs/core';
import Radium from 'radium';
import Phone from 'react-phone-number-input';
import { postUser } from './actions';

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
		};
	},

	componentWillReceiveProps(nextProps) {
		const lastLoading = this.props.landingData.signupLoading;
		const nextLoading = nextProps.landingData.signupLoading;
		const nextError = nextProps.landingData.signupLoading;
		const nextResult = nextProps.landingData.signupResult;
		if (lastLoading && !nextLoading && !nextError && nextResult.id) {
			localStorage.setItem('userData', JSON.stringify(nextResult));
			browserHistory.push(`/${nextResult.id}`);
		}
	},
	
	updateZipcode: function(evt) {
		this.setState({
			zipcode: evt.target.value.substring(0, 5)
		});
	},

	formSubmit: function(evt) {
		evt.preventDefault();
		const referral = this.props.location.query.ref;
		console.log('referral is ', referral);
		this.props.dispatch(postUser(this.state.name, this.state.phone, this.state.zipcode, referral));
	},

	render() {

/* 
	Still to do: 
	* Form verification
	* Re-insert 
	  <div style={styles.headerImage} />
	  <div style={styles.headerSplash} /> ?
*/
		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<div style={styles.headerImage} />
					<div style={styles.headerSplash} />
					<div style={styles.headerPresentation}>
						<div style={styles.headerTextBlock}>
							<div style={styles.headerText}>Call your Reps!</div>
							<div style={styles.headerText}>Collect 50 States!</div>
							<div style={styles.headerText}>Play for a better Democracy!</div>
							<p style={styles.headerTextBody}>Constituent calls matter to congresspeople. Tell them who you are and that you are a voter. Tell them why you are calling and ask to be informed of their response by phone, web or email. Keep in mind that the staffer you are talking to is the congressman’s window into public - better than their polls and as good as a cash contribution.</p>
						</div>
						<div style={styles.headerCall} className={'pt-card pt-elevation-3'}>
							
							<form onSubmit={this.formSubmit} style={styles.form}>
								<label htmlFor={'name-input'} style={styles.inputLabel}>
									Name
									<input id={'name-input'} className={'pt-input pt-large pt-fill'} placeholder={'Nicknames are okay'} value={this.state.name} onChange={(evt)=> this.setState({ name: evt.target.value })} />
								</label>
								<label htmlFor={'zip-input'} style={styles.inputLabel}>
									Zipcode (where you vote)
									<input id={'zip-input'} type={'number'} className={'pt-input pt-large pt-fill'} placeholder={'Where are you registered?'} value={this.state.zipcode} onChange={this.updateZipcode} />
								</label>
								<label htmlFor={'phone-input'} style={styles.inputLabel}>
									Phone number (to connect you to your reps)
									<Phone country={'US'} className={'pt-input pt-large pt-fill'} placeholder={'781-975-5555'} value={this.state.phone} onChange={phone => this.setState({ phone: phone })} />
									{/*<div style={styles.smallInformation}> 
										<img alt="lock" src={'/static/lock.png'} style={styles.lockImage} />
										<div style={styles.smallInformationText}> We will never, ever, share it with anyone; and no human will be able to read it. </div>
									</div>
									<div style={styles.smallInformation}> 
										<img alt="lock" src={'/static/notification.png'} style={styles.lockImage} />
										<div style={styles.smallInformationText}> We may send you notifications about your progress. No spam, ever. </div>
									</div>*/}
								</label>
								<Button 
									loading={this.props.landingData.signupLoading} 
									type={'submit'} style={styles.button} 
									text={'Join the Challenge'} 
									className={'pt-intent-primary pt-fill pt-large'} 
									onClick={this.formSubmit} />

							</form>
						</div>
					</div>
				</div>
				<div style={styles.section}>
					<div style={styles.sectionHeader}>How to Play</div>
					<p>Constituent calls matter to congresspeople (click here to learn more).  Tell them who you are and that you are a voter.  Tell them why you are calling (sample below, or hover for a popup of samples) and ask to be informed of their response by phone, web or email.  Keep in mind that the staffer you are talking to is the congressman’s window into public — better than their polls and as good as a cash contribution.</p>

					<p>Teachable moment [or perhaps civics lesson]:  If you ever thought that your vote didn’t matter because you knew your choice won or lost anyway, here’s why you still should vote:  it forces them to take you seriously now.  No one ignores a voter not matter who they voted for. They didn’t teach this in civics class, but it’s yet another reason to cast a ballot.</p>
				</div>

				<div style={styles.section}>
					<div style={styles.sectionHeader}>Sites for Inspiration</div>
					<div><a href={'https://democracy.io/#/'}>https://democracy.io/#/</a></div>
					<div><a href="https://vote.gov/">https://vote.gov/</a></div>
					<div><a href="https://votinginfoproject.org/">https://votinginfoproject.org/</a></div>
					<div><a href="https://dribbble.com/shots/713806-Political-Site">https://dribbble.com/shots/713806-Political-Site</a></div>
					<div><a href="https://dribbble.com/shots/2227088-Home">https://dribbble.com/shots/2227088-Home</a></div>
					<div><a href="https://dribbble.com/shots/1121048-Democracy-Great-for-politics-bad-for-design">https://dribbble.com/shots/1121048-Democracy-Great-for-politics-bad-for-design</a></div>
					<div><a href="https://www.data.gov/impact/">https://www.data.gov/impact/</a></div>

				</div>
				
				
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

	},
	header: {
		position: 'relative',		
	},
	headerImage: {
		backgroundImage: 'url("/static/header.jpg")',
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
		backgroundColor: '#1c435a',
		opacity: 0.9,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	headerPresentation: {
		// backgroundColor: 'red',
		position: 'relative',
		zIndex: 2,
		padding: 'calc(115px + 3em) 1em 3em',
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
			padding: '1em',
		},
	},
	headerText: {
		maxWidth: '500px',
		fontWeight: 'bold',
		color: '#EB4040',
		fontSize: '2em',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			textAlign: 'center',
			maxWidth: '100%',
		},
	},
	headerTextBody: {
		maxWidth: '500px',
		padding: '1em 0em',
		fontSize: '1.25em',
		lineHeight: '1.5',
		'@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
			maxWidth: '100%',
		},
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
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
	},
	button: {
		verticalAlign: 'bottom',
	},
	section: {
		padding: '2em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	form: {
		padding: 0,
		margin: 0,
	},
	sectionHeader: {
		fontSize: '2em',
		fontWeight: '600',
		marginBottom: '1.5em',
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
};
