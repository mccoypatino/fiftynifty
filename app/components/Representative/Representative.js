import React, { PropTypes } from 'react';
import Radium from 'radium';
// import { Link } from 'react-router';
import { Dialog } from '@blueprintjs/core';

let styles;

export const Representative = React.createClass({
	propTypes: {
		repData: PropTypes.object,
		callFunction: PropTypes.func,
	},

	getInitialState() {
		return {
			callDialogOpen: false,
			clickedConnect: false,
			cardOpen: false,
		};
	},

	toggleCallDialog: function() {
		this.setState({ callDialogOpen: !this.state.callDialogOpen, clickedConnect: false });
	},

	toggleCard: function() {
		this.setState({ cardOpen: !this.state.cardOpen });
	},

	callNumber: function() {
		// const number = this.refs.number.value;
		this.setState({ clickedConnect: true });
		const repName = `${this.props.repData.first_name} ${this.props.repData.last_name}`;
		this.props.callFunction(this.props.repData.bioguide_id, repName);

	},

	render() {
		const repData = this.props.repData || {};
		const connectButtonClass = this.state.clickedConnect ? 'pt-button pt-active' : 'pt-button pt-intent-primary';
		return (
			<div style={this.state.cardOpen ? styles.containerSelected : styles.container} className={'pt-card pt-interactive pt-elevation-2'} onClick={this.toggleCallDialog}>
				<div style={styles.repInfoContainer}>
					<img 
						style={styles.repImage}
						className={'pt-elevation-2'}
						alt={repData.last_name} 
						src={`https://theunitedstates.io/images/congress/225x275/${repData.bioguide_id}.jpg`} />
					<div style={styles.repName}>{repData.first_name} <br /> {repData.last_name}</div>
					<p style={styles.repText}>
						{`(${repData.party}) `}
						{repData.chamber === 'senate' ? 'Senator' : 'Representative'}</p>
				</div>
				<div style={styles.repCallContainer}>
					<td style={styles.callText}>How to call</td>
				</div>		
				<Dialog isOpen={this.state.callDialogOpen} onClose={this.toggleCallDialog} title={`Call your ${repData.chamber === 'senate' ? 'Senator' : 'Representative'}`} style={styles.dialogBox}>
					<div className="pt-dialog-body">
						<h4>
							{repData.first_name} {repData.last_name}
							<span style={{ textAlign: 'center', marginLeft: '1em', width: '100%', }}> 
								<button role={'button'} className={connectButtonClass} onClick={this.callNumber}>
									<span className={'pt-icon-standard pt-icon-phone'} />
									{this.state.clickedConnect ? 'Calling you now...' : 'Click to Connect'}</button></span>
						</h4>
						<p>{repData.chamber === 'senate' ? 'Senator ' : 'Representative '} for {repData.chamber === 'senate' ? repData.state : `district ${repData.district} in ${repData.state}`}</p>
						<h6>What do I say?</h6>
						<p>						
							You'll reach a staffer. Tell them your name and that you are a constituent. <br /><br />
							Then your message: "I'd like so-and-so to take a strong position demanding a hearing on Russian Influence on our elections and government. I want to know whether there is more involved." <br /><br />
							You might ask to be told their position. <br /><br /> 
							It's easy, they want to hear from you.
						</p>						<div><b>We’ll call your Congressperson and call you back.  Answer the phone to be connected.</b>
					</div>


					</div>
				</Dialog>
			</div>
		);
	}

});

export default Radium(Representative);

styles = {
	container: {
		margin: '1em 0em',
		padding: '0em',
		backgroundColor: 'white',
		color: '#003d59',
		position: 'relative',
		height: '148px',
	},
	containerSelected: {
		margin: '1em 0em',
		padding: '0em',
		backgroundColor: '#F2F0E6',
		color: '#003d59',
		position: 'relative',
		width: '748px',
		right: '200px',
	},
	repImage: {
		float: 'left',
		height: '100%',
		marginRight: '12px',
	},
	dialogBox: {
		maxWidth: '100%',
		top: '10%',
	},
	repName: {
		marginTop: '0px',
		color: '#003d59',
		fontWeight: 'bold',
		fontSize: '1.5em',
		//letterSpacing:'0.1em',
	},
	repText: {
		marginTop: '5px',
	},
	repInfoContainer: {
		padding: '1em 1em 1em 1em',
		height: '75%',
		lineHeight: '1.5em',
	},
	repCallContainer: {
		padding: '0em 1em 0em 1em',
		borderTop: '0.5px solid rgba(30, 30, 30, .2)',
		textAlign: 'center',
		display: 'table',
		verticalAlign: 'middle',
		height: '25%',
		width: 'calc(100% + 1px)',
		borderBottomLeftRadius: '3px',
		borderBottomRightRadius: '3px',
		backgroundColor: '#003d59',
		color: '#F2F0E6',
	},
	callText: {
		height: '100%',
		color: 'white',
	},
	button: {
		color: 'white',
		fontWeight: 'lighter',
		backgroundColor: '#003d59',
		letterSpacing: '0.1em',
		boxShadow: '0 2px #001C2B',
	},
	
};
