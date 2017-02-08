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
		};
	},

	toggleCallDialog: function() {
		this.setState({ callDialogOpen: !this.state.callDialogOpen });
	},

	callNumber: function() {
		// const number = this.refs.number.value;
		const repName = `${repData.first_name} ${repData.last_name}`;
		this.props.callFunction(this.props.repData.phone, repName);
	},

	render() {
		const repData = this.props.repData || {};
		return (
			<div style={styles.container}>
				<div style={styles.repName}>{repData.first_name} {repData.last_name}</div>
				<p style={styles.repText}>{repData.chamber === 'senate' ? 'Senator ' : 'Representative '} for {repData.chamber === 'senate' ? repData.state : `district ${repData.district} in ${repData.state}`}</p>
				<button role={'button'} className={'pt-button'} onClick={this.toggleCallDialog}>Call</button>
				<Dialog isOpen={this.state.callDialogOpen} onClose={this.toggleCallDialog} title={`Call your ${repData.chamber === 'senate' ? 'Senator' : 'Representative'}`} style={styles.dialogBox}>
					<div className="pt-dialog-body">
						<h4>

							{repData.first_name} {repData.last_name}
							<span style={{padding:'1em'}}> <button role={'button'} className={'pt-button pt-intent-primary'} onClick={this.callNumber}>Click to Connect</button></span>
						</h4>
						<p>{repData.chamber === 'senate' ? 'Senator ' : 'Representative '} for {repData.chamber === 'senate' ? repData.state : `district ${repData.district} in ${repData.state}`}</p>

						<h6>What do I say?</h6>
						<p>Descriptions and content here</p>


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
	
};
