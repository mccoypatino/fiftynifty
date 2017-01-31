import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from '@blueprintjs/core';
import Radium from 'radium';

let styles;

export const Landing = React.createClass({
	propTypes: {
		accountData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	getInitialState() {
		return {
			name: '',
			phone: '',
			zip: '',
		};
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

						<form>
							<label htmlFor={'name-input'} style={styles.inputLabel}>
								Name
								<input id={'name-input'} className={'pt-input'} value={this.state.name} onChange={(evt)=> this.setState({ name: evt.target.value })}/>
							</label>
							<label htmlFor={'phone-input'} style={styles.inputLabel}>
								Phone
								<input id={'phone-input'} className={'pt-input'} value={this.state.phone} onChange={(evt)=> this.setState({ phone: evt.target.value })}/>
							</label>
							<label htmlFor={'zip-input'} style={styles.inputLabel}>
								Zip
								<input id={'zip-input'} className={'pt-input'} value={this.state.zip} onChange={(evt)=> this.setState({ zip: evt.target.value })}/>
							</label>
							<Button style={styles.button} text={'Join'} className={'pt-intent-primary'} />

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
		// accountData: state.account.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Landing));

styles = {
	container: {
		// padding: '2em 1em',
		// maxWidth: '1024px',
		// margin: '0 auto',
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
		backgroundColor: 'rgba(19, 24, 187, 0.7)',
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

		padding: '2em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	inputLabel: {
		fontSize: '1rem',
		display: 'inline-block',
		padding: '0em 0.5em',
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
