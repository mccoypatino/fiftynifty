import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import fetch from 'isomorphic-fetch';
import { Representative, AddressInput, ProgressMap, NetworkGraph, TreeGraph } from 'components';
import { getUser, requestCall, requestLatLong } from './actions';
import { UserNode } from './UserNode';

let styles;

// Shamelessly stolen from the call-congress code
const CONGRESS_API_URL = `https://congress.api.sunlightfoundation.com/legislators/locate?apikey=${
    process.env.SUNLIGHT_FOUNDATION_KEY}`;

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

	returnCalls: function(user, distance) {
		const children = user.children || [];
		const userCalls = user.calls || [];
		const callsWithDist = userCalls.map((call)=>{
			call.distance = distance;
			return call;
		});
		const childrensCalls = children.map((child)=> {
			return this.returnCalls(child, distance+1);
		});
		return callsWithDist.concat(...childrensCalls);
	},

    getScore: function(flatCalls) {
        let score = 0;
        const start = 256;
        flatCalls.forEach((call)=>{
        	score+=start/(Math.pow(2, call.distance))
			}
		);
        return score;
    },

	countStates: function(flatCalls) {
		let states = [];
		flatCalls.forEach((call)=>{
			if (states.indexOf(call.state)==-1){
				states.push(call.state);
			}
		})
		return states.length;
	},

	callFunction: function(number) {
		this.props.dispatch(requestCall(number, this.props.params.userId));
	},

	geolocateFunction: function(address, zipcode) {
		this.props.dispatch(requestLatLong(address, zipcode))
		.then((result) => {
			console.log('hello');
			console.log(result);
		})
		.catch((error) => {
			console.log(error);
		});
	},

	render() {
		const user = this.props.userData.user || {};
		const children = user.children || [];
		const flatCalls = this.returnCalls(user, 0);
		const score = this.getScore(flatCalls);

		return (
			<div style={styles.container}>
				{this.props.userData.loading &&
					<Spinner />
				}
				<div style={styles.content}>
					<div style={styles.title}>{user.name} · {user.zipcode}</div>
					<AddressInput zipcode={user.zipcode} geolocateFunction={this.geolocateFunction} />
					<div style={styles.section}>
						<div style={styles.sectionTitle}>Progress</div>
						<p>Map and progress of your network displayed here</p>
						<p>Call: (508) 659-9127</p>
						<h5>Calls made</h5>
						{flatCalls.map((call)=> {
							return (
								<div key={`call${call.id}`}>
									{call.state} · {call.callerId} · {call.zip} · {call.distance}
								</div>
							);
						})}
					</div>
					<div style={styles.section}>
						<ProgressMap callsData={flatCalls}/>
						<p> Your Score: {score}</p>
						<p> You have covered {this.countStates(flatCalls)} out of the 50 states</p>
					</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Representatives</div>
						{this.state.reps.length === 0 &&
							<Spinner />
						}

						{this.state.reps.map((rep, index)=> {
							return (
								<Representative key={`rep-${index}`} repData={rep} callFunction={this.callFunction} />
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
						<TreeGraph data={user}/>
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
