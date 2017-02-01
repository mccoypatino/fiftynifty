import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import fetch from 'isomorphic-fetch';
import { Representative } from 'components';
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

	getInitialState() {
		return {
			reps: [],
		};
	},

	componentWillMount() {
		this.props.dispatch(getUser(this.props.params.userId))
		.then((result)=> {
			const zipcode = this.props.userData.user.zipcode;
			if (zipcode) {
				return fetch(`${CONGRESS_API_URL}&zip=${zipcode}`)
				.then((response)=> {
					if (!response.ok) { 
						return response.json().then(err => { throw err; });
					}
					return response.json();
				})
				.then((repResults)=> {
					this.setState({ reps: repResults.results });
				});
			}
		});
	},
	
	returnCalls: function(user) {
		const children = user.children || [];
		const userCalls = user.calls || [];
		const childrensCalls = children.map((child)=> {
			return this.returnCalls(child);
		});
		return userCalls.concat(...childrensCalls);
	},

	render() {
		const user = this.props.userData.user || {};
		const children = user.children || [];
		const allCalls = this.returnCalls(user);
		
		return (
			<div style={styles.container}>
				{this.props.userData.loading &&
					<Spinner />
				}
				<div style={styles.content}>
					<div style={styles.title}>{user.name} · {user.zipcode}</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Progress</div>
						<p>Map and progress of your network displayed here</p>
						<p>Call: (508) 659-9127</p>
						<h5>Calls made</h5>
						{allCalls.map((call)=> {
							return (
								<div key={`call${call.id}`}>
									{call.state} · {call.callerId} · {call.zip}
								</div>
							);
						})}
					</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Representatives</div>
						{this.state.reps.length === 0 &&
							<Spinner />
						}

						{this.state.reps.map((rep, index)=> {
							return (
								<Representative key={`rep-${index}`} repData={rep}/>
							);
						})}
					</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Invite</div>
						<p>Invite people to join your network by joining Fifty Nifty with this link: <Link to={`/?ref=${user.id}`}>fiftynifty.org/?ref={user.id}</Link></p>
					</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Your Fifty Nifty Family</div>
						<p>Child nodes listed and displayed here</p>
						{children.map((node)=> {
							return <UserNode key={node.id} node={node} />;
						})}
					</div>
					
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
	section: {
		padding: '2em 0em',
	},
	sectionTitle: {
		fontSize: '2em',
	},
		
};
