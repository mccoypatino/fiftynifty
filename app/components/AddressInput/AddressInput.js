import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Button } from '@blueprintjs/core';

let styles;

export const AddressInput = React.createClass({
	propTypes: {
		geolocateFunction: PropTypes.func,
		isLoading: PropTypes.bool,
	},

	requestAddress: function(evt) {
		evt.preventDefault();
		this.props.geolocateFunction(this.state.address);
	},

	updateAddress: function(evt) {
		this.setState({ address: evt.target.value });
	},

	render() {
		return (
			<form onSubmit={this.requestAddress}>
				<label htmlFor={'address-input'} style={styles.inputLabel}>
					Please enter your address:
					<input id={'address-input'} type={'text'} className={'pt-input pt-large pt-fill'} placeholder={'Powered by Google Maps'} onChange={this.updateAddress} />
				</label>
				<Button type={'submit'} loading={this.props.isLoading} className={'pt-button pt-intent-primary'} text={'Submit'} />
			</form>
		);
	}
});

export default Radium(AddressInput);

styles = {
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
	},
};
