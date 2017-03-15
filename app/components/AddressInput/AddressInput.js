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
			<form onSubmit={this.requestAddress} style={styles.form}>
				<label>
					Your zipcode happens to overlap districts. Please enter your address so we can identify your representatives.
					<input style={styles.input} id={'address-input'} type={'text'} className={'pt-input pt-large pt-fill'} placeholder={'Powered by Google Maps'} onChange={this.updateAddress} />
				</label>
				<Button type={'submit'} loading={this.props.isLoading} className={'pt-button pt-intent-primary pt-fill'} text={'Submit'} />
			</form>
		);
	}
});

export default Radium(AddressInput);

styles = {
<<<<<<< HEAD
	inputLabel: {
		fontSize: '1.25em',
		display: 'block',
		marginBottom: '1em',
=======
	input: {
		margin: '0.5em 0em',
	},
	form: {
		margin: '0.5em 0em',
>>>>>>> f1e3eb78d74d13630d9f4a27e4b70ee100872596
	},
};
