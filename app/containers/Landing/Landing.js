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
		this.props.dispatch(postUser(this.state.name, this.state.phone, this.state.zipcode, referral));
	},
	render() {

		return (
			<div style={styles.container}>
				<div style={styles.header}>
					<div style={styles.headerImage} />
					<div style={styles.headerSplash} />
					<div style={styles.headerCall}>
						<div>Call your Reps</div>
						<div>Collect all 50</div>
						<div>Play for Freedom</div>

						<form onSubmit={this.formSubmit} >
							<label htmlFor={'name-input'} style={styles.inputLabel}>
								Name
								<input id={'name-input'} className={'pt-input'} value={this.state.name} onChange={(evt)=> this.setState({ name: evt.target.value })} />
							</label>
							<label htmlFor={'phone-input'} style={styles.inputLabel}>
								Phone
								<Phone country={'US'} value={this.state.phone} onChange={phone => this.setState({ phone: phone })} />
							</label>
							<label htmlFor={'zip-input'} style={styles.inputLabel}>
								Zip
								<input id={'zip-input'} type={'number'} className={'pt-input'} value={this.state.zipcode} onChange={this.updateZipcode} />
							</label>
							<Button loading={this.props.landingData.signupLoading} style={styles.button} text={'Join'} className={'pt-intent-primary'} onClick={this.formSubmit} />

						</form>
					</div>
				</div>
				<div style={styles.section}>
					<div style={styles.sectionHeader}>How to Play</div>
					<p>Describe the project and how to join here. Explain the game.</p>
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
		backgroundImage: 'url("/static/denim.png")',
		opacity: 0.85,
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 1,
	},
	headerCall: {
		color: 'white',
		position: 'relative',
		fontSize: '4em',
		lineHeight: '1.5',
		zIndex: 2,
		fontWeight: '200',

		padding: '4rem 1rem',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	inputLabel: {
		fontSize: '1rem',
		display: 'inline-block',
		padding: '0em 0.5em',
		verticalAlign: 'bottom',
	},
	button: {
		verticalAlign: 'bottom',
	},
	section: {
		padding: '2em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	sectionHeader: {
		fontSize: '1.5em',
		marginBottom: '1.5em',
	},
	
	
};
