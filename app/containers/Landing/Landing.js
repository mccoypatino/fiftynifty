import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
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
				
				<div>Landing Content</div>

				
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
		padding: '2em 1em',
		maxWidth: '1024px',
		margin: '0 auto',
	},
	
};
