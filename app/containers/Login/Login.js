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
			browserHistory.push(`/${nextResult.id}`);
		}
	},

	updateCode: function(evt) {
		this.setState({ code: evt.target.value });
	},

	formSubmit: function (evt) {
		evt.preventDefault();
		if (!this.props.loginData.codeCreationSuccess) {
			this.props.dispatch(createVerificationCode(this.state.phone));
		} else {
			this.props.dispatch(checkVerificationCode(this.state.phone, this.state.code))
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
						!codeCreationSuccess &&
						<label htmlFor={'phone-input'} style={styles.inputLabel}>
							Phone number? { codeCreationError && 
								<div className={'pt-tag pt-minimal pt-intent-danger'}>An error occured: { codeCreationError }</div>
							}
							<Phone country={'US'} className={'pt-input pt-large pt-fill'} placeholder={'781-975-5555'} value={this.state.phone} onChange={phone => this.setState({ phone: phone })} />
						</label>
					}

					{
						codeCreationSuccess &&
						<label htmlFor={'code-input'} style={styles.inputLabel}>
							Code for { this.state.phone }? { verificationError && 
								<div className={'pt-tag pt-minimal pt-intent-danger'}>An error occured: { verificationError }</div>
							}
							<input id={'code-input'} type={'number'} className={'pt-input pt-large pt-fill'} placeholder={'6-digit code e.g. 568082'} value={this.state.code} onChange={this.updateCode} />
						</label>

					}
					<Button 
						type={'submit'} style={styles.button} 
						text={codeCreationSuccess ? 'Verify the code' : 'Generate login code'}
						className={'pt-intent-primary pt-fill pt-large'} 
						onClick={this.formSubmit} 
						loading={this.props.loginData.codeCreationLoading || this.props.loginData.verificationLoading} />
				</form>
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
    title: {
        fontSize: '2em',
        fontWeight: 'lighter',
        textAlign: 'center',
        paddingBottom:'1em',
        color:'white',
        letterSpacing:'0.1em',
    },
	login: {
        backgroundColor: '#003d59',
        color:'white',
		fontWeight:'lighter',
		minHeight:'95vh',
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
