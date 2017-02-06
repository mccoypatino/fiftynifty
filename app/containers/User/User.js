import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';
import Radium from 'radium';
// import fetch from 'isomorphic-fetch';
import { Representative, AddressInput, ProgressMap, NetworkGraph, TreeGraph } from 'components';
import { getUser, requestCall, requestLatLong } from './actions';
import { Invite } from './Invite';
import { UserNode } from './UserNode';

let styles;

// Shamelessly stolen from the call-congress code
// const CONGRESS_API_URL = `https://congress.api.sunlightfoundation.com/legislators/locate?apikey=${process.env.SUNLIGHT_FOUNDATION_KEY}`;

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
		this.loadData(this.props.params.userId);
	},

	componentWillReceiveProps(nextProps) {
		if (this.props.params.userId !== nextProps.params.userId) {
			this.loadData(nextProps.params.userId);
		}
	},

	loadData(userId) {
		this.props.dispatch(getUser(userId));
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
        	score += start / (Math.pow(2, call.distance));
		});
        return score;
    },

	countStates: function(flatCalls) {
		const states = [];
		flatCalls.forEach((call)=>{
			if (states.indexOf(call.state) === -1) {
				states.push(call.state);
			}
		});
		return states.length;
	},

	callFunction: function(number) {
		this.props.dispatch(requestCall(number, this.props.params.userId));
	},

	geolocateFunction: function(address, zipcode) {
		this.props.dispatch(requestLatLong(address, zipcode, this.props.params.userId));
	},

	render() {
		const user = this.props.userData.user || {};
		const reps = user.reps || [];
		const children = user.children || [];
		const flatCalls = this.returnCalls(user, 0);
		const score = this.getScore(flatCalls);
		const shareUrl = "http://fiftynifty.org/?ref="+user.id;//When we get nicer urls, adda "getUrl" function

		return (
			<div style={styles.container}>
				{this.props.userData.loading &&
					<Spinner />
				}
				<div style={styles.content}>
					<div style={styles.title}>{user.name} · {user.zipcode}</div>

					{true && true &&
						<AddressInput zipcode={user.zipcode} geolocateFunction={this.geolocateFunction} isLoading={this.props.userData.latLonLoading} />
					}

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Representatives</div>
                        {reps.length === 0 &&
						<Spinner />
                        }

                        {reps.map((rep, index)=> {
                            return (
								<Representative key={`rep-${index}`} repData={rep} callFunction={this.callFunction} />
                            );
                        })}

						<p>Call: (508) 659-9127</p>
					</div>

					<div style={styles.section}>
						<Invite url={shareUrl}/>
					</div>
					
					
					<div style={styles.section}>
						<div style={styles.sectionTitle}>Progress</div>
						<p>Map and progress of your network displayed here</p>
					</div>
					<div style={styles.section}>
						<ProgressMap callsData={flatCalls} user={user} />
						<p> Your Score: {score}</p>
						<p> You have covered {this.countStates(flatCalls)} out of the 50 states</p>
					</div>

					<div style={styles.section}>
						<div style={styles.sectionTitle}>Your Fifty Nifty Family</div>
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
		padding: 'calc(115px + 3em) 1em 3em',
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
