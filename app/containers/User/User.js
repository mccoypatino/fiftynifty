import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import { getUser } from './actions';
import { UserNode } from './UserNode';

let styles;

// This key is publicly available, but in the future we may want to hide it with our own private thing
const SUNLIGHT_FOUNDATION_KEY='55a27bdc46b947c4b63b791b7cf6fa2f';

// Shamelessly stolen from the call-congress code
const CONGRESS_API_URL = `https://congress.api.sunlightfoundation.com/legislators/locate?apikey=${
    SUNLIGHT_FOUNDATION_KEY}`;

export const User = React.createClass({
	propTypes: {
		userData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		this.props.dispatch(getUser(this.props.params.userId));
	},
	
	render() {
		const user = this.props.userData.user || {};
		// Get the list of Congresspeople
		const url = `${CONGRESS_API_URL}&zip=${user.zipcode}`;
		console.log('Lookup', url);
		const nodes = user.children || [];
		return (
			<div style={styles.container}>
				{this.props.userData.loading &&
					<Spinner />
				}
				<div style={styles.content}>
					<div style={styles.title}>{user.name} · {user.zipcode}</div>

					{nodes.map((node)=> {
						return <UserNode key={node.id} node={node} />;
					})}
				</div>
				
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		userData: state.user.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(User));

styles = {
	container: {
		padding: '75px 1em',
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
		
};
