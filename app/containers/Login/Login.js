import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Radium from 'radium';
import { createVerificationCode, checkVerificationCode } from './actions';
import Phone from 'react-phone-number-input';
import { Button } from '@blueprintjs/core';

let styles;

export const Login = React.createClass({
	propTypes: {
		loginData: PropTypes.object,
		params: PropTypes.object,
		location: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			phone: '',
			code: '',
		};
	},
 
	// componentWillMount() {
	// 	console.log(this.props.location.query);
	// },

	componentWillReceiveProps(nextProps) {
		const lastLoading = this.props.loginData.verificationLoading;
		const nextLoading = nextProps.loginData.verificationLoading;
		const nextError = nextProps.loginData.verificationError;
		const nextResult = nextProps.loginData.verificationResult;
		// If the phone number is already in use
		if (lastLoading && !nextLoading && !nextError && nextResult.id) {
			localStorage.setItem('userData', JSON.stringify(nextResult));
			if (window.location.hostname !== 'localhost') {
				Raven.setUserContext({ username: nextResult.name, userId: nextResult.id });
			}
			browserHistory.push(`/${nextResult.id}`);
		}
	},

	updateCode: function(evt) {
		this.setState({ code: evt.target.value });
	},

	createVerificationCodeByPhone: function(evt) {
		evt.preventDefault();
		this.props.dispatch(createVerificationCode(this.state.phone, 'call'));
	},

	formSubmit: function (evt) {
		evt.preventDefault();
		if (!this.props.loginData.codeCreationSuccess) {
			this.props.dispatch(createVerificationCode(this.state.phone, 'text'));
		} else {
			this.props.dispatch(checkVerificationCode(this.state.phone, this.state.code));
		}
	},

	render() {
		const codeCreationError = this.props.loginData.codeCreationError;
		const codeCreationSuccess = this.props.loginData.codeCreationSuccess;
		const verificationError = this.props.loginData.verificationError;
		return (
			<div style={styles.login}>
			<div style={styles.container}>
				<div style={styles.title}>Login</div>
				<form onSubmit={this.formSubmit} style={styles.form}>
					{
						codeCreationSuccess &&
						<label htmlFor={'code-input'} style={styles.inputLabel}>
							Code for { this.state.phone }? { verificationError && 
								<div className={'pt-tag pt-minimal pt-intent-danger'}>An error occured: { verificationError }</div>
							}
							<input id={'code-input'} type={'number'} className={'pt-input pt-large pt-fill'} placeholder={'6-digit code e.g. 568082'} value={this.state.code} onChange={this.updateCode} autoFocus={codeCreationSuccess} />
							<Button 
								type={'submit'} style={styles.button} 
								text={'Verify the code'}
								className={'pt-intent-primary pt-fill pt-large'} 
								onClick={this.formSubmit} 
								loading={this.props.loginData.verificationLoading} />
						</label>

					}
					
					<label htmlFor={'phone-input'} style={styles.inputLabel}>
						{ codeCreationSuccess &&
							<div className={'label-phone-input'}>Send another verification code</div>  
						}
						{ codeCreationError && 
							<div className={'pt-tag pt-minimal pt-intent-danger'}>An error occured: { codeCreationError }</div>
						}
						<Phone country={'US'} className={'pt-input pt-large pt-fill'} placeholder={'Enter your phone number'} value={this.state.phone} onChange={phone => this.setState({ phone: phone })} autoFocus={!codeCreationSuccess} />
					</label>

					<div className={'verificationButtons pt-button-group pt-fill pt-large'}>
						<Button 
							type={'submit'} style={styles.button} 
							className={'pt-intent-primary'} 
							onClick={this.formSubmit} 
							loading={this.props.loginData.codeCreationLoading}>
								<span 
									style={{ verticalAlign: 'middle', fontSize: '0.85em', opacity: 1 }} 
									className={'pt-icon-standard pt-icon-comment'} /> 
								Text a code 
							</Button>
						<Button 
							style={styles.button} 
							className={'pt-intent-primary'} 
							onClick={this.createVerificationCodeByPhone} 
							loading={this.props.loginData.codeCreationLoading}>
								<span 
									style={{ verticalAlign: 'middle', fontSize: '0.85em', opacity: 1 }} 
									className={'pt-icon-standard pt-icon-phone'} /> 
								Call with a code 
							</Button>

					</div>	
				</form>

				<div style={styles.section}>
					<div style={styles.title}>Not Registered Yet?</div>
					<Link to={'/'}>
							<Button 	
								style={styles.button}
								className={'pt-button pt-intent-primary pt-fill pt-large'}
								text={'Click Here to Join The Game'} />
					</Link>
				</div>
			</div>
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		loginData: state.login.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Login));

styles = {
	login: {
		backgroundColor: '#003d59',
		color: 'white',
		fontWeight: 'lighter',
		minHeight: '95vh',
	},
	container: {
		padding: 'calc(115px + 3em) 1em 3em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	content: {
		padding: '2em 0em',
	},
	title: {
		fontSize: '2.5em',
		fontWeight: '200',
	},
	section: {
		padding: '2em 0em',
	},
	sectionTitle: {
		fontSize: '2em',
	},
	form: {
		padding: 0,
		margin: 0,
	},
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
	},
	button: {
		verticalAlign: 'bottom',
	},

};
