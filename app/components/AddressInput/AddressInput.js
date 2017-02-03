import React, { PropTypes } from 'react';
import Radium from 'radium';

let styles;

export const AddressInput = React.createClass({
	propTypes: {
		zipcode: PropTypes.string,
		geolocateFunction: PropTypes.func,
	},

	requestAddress: function(e) {
		e.preventDefault();
		this.props.geolocateFunction(this.state.address, this.props.zipcode);
	},

	updateAddress: function(evt) {
		this.setState({ address: evt.target.value });
	},

	render() {
		return (
			<form onSubmit={this.requestAddress}>
				<label>
					Please enter your address
					<input id={'address-input'} type={'text'} className={'pt-input pt-large pt-fill'} placeholder={'Powered by Google Maps'} onChange={this.updateAddress} />
				</label>
				<button role={'button'} className={'pt-button pt-intent-primary'} >Address</button>
			</form>
		);
	}
});

export default Radium(AddressInput);

styles = {
};
