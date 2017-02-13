import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
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
		};
	},

	toggleCallDialog: function() {
		this.setState({callDialogOpen: !this.state.callDialogOpen, clickedConnect: false });
	},

	callNumber: function() {
		// const number = this.refs.number.value;
        this.setState({clickedConnect: true });
		const repName = `${this.props.repData.first_name} ${this.props.repData.last_name}`;
		this.props.callFunction(this.props.repData.bioguide_id, repName);

	},

	render() {
		const repData = this.props.repData || {};
		console.log(repData);
		const connectButtonClass = this.state.clickedConnect? 'pt-button pt-active' : 'pt-button pt-intent-primary';
		return (
			<div style={styles.container}>
				<div style={styles.repName}>{repData.first_name} {repData.last_name}</div>
				<p style={styles.repText}>{repData.chamber === 'senate' ? 'Senator ' : 'Representative '} for {repData.chamber === 'senate' ? repData.state : `district ${repData.district} in ${repData.state}`}</p>
				<button role={'button'} style={styles.button} className={'pt-button  pt-minimal'} onClick={this.toggleCallDialog}>Call</button>
				<Dialog isOpen={this.state.callDialogOpen} onClose={this.toggleCallDialog} title={`Call your ${repData.chamber === 'senate' ? 'Senator' : 'Representative'}`} style={styles.dialogBox}>
					<div className="pt-dialog-body">
						<h4>

							{repData.first_name} {repData.last_name}
							<span style={{padding:'1em'}}> <button role={'button'} className={connectButtonClass} onClick={this.callNumber}>{this.state.clickedConnect?'Calling you now...': 'Click to Connect'}</button></span>
						</h4>
						<p>{repData.chamber === 'senate' ? 'Senator ' : 'Representative '} for {repData.chamber === 'senate' ? repData.state : `district ${repData.district} in ${repData.state}`}</p>
						<h6>What do I say?</h6>
						<p>Tell them your name and that you are a constituent,</p>
						<p>then your message.</p><p> You might ask to be told their position.</p>
						<p>It’s easy, they want to hear from you.</p>
						<div><b>We’ll call your Congressperson and call you back.  Answer the phone to be connected</b></div>


					</div>
				</Dialog>
			</div>
		);
	}

});

export default Radium(Representative);

styles = {
	container: {
		margin: '1em 1em 2em',

	},
	dialogBox: {
		maxWidth: '100%',
		top: '10%',
	},
    repName: {
        color:'white',
		fontSize:'1.3em',
		//letterSpacing:'0.1em',
	},
    repText: {
        letterSpacing:'0.02em',
	},
    button:{
        color:'white',
        fontWeight: 'lighter',
        backgroundColor: '#003d59',
        letterSpacing:'0.1em',
        boxShadow:'0 2px #001C2B',
    },
	
};
