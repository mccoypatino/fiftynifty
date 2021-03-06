import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getLeaderboard } from '../Leaderboard/actions';
import { connect } from 'react-redux';
import { flattenLeaders } from '../../Utilities/UserUtils';
import { ProgressMap, TreeGraph } from 'components';

let styles;

export const Stats = React.createClass({
	propTypes: {
		leaderboardData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		this.props.dispatch(getLeaderboard());
	},

	secondsToHoursMinutsSeconds: function(time) {
		const hrs = ~~(time / 3600);
		const mins = ~~((time % 3600) / 60);
		const secs = time % 60;

// Output like "1:01" or "4:03:59" or "123:03:59"
		let ret = '';

		if (hrs > 0) {
			ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
		}

		ret += '' + mins + ':' + (secs < 10 ? '0' : '');
		ret += '' + secs;
		return ret;
	},

	getAllUsers() {
		const leaders = this.props.leaderboardData.leaders || [];
		const allUsers = flattenLeaders(leaders);
		return allUsers;
	},

	getActivePlayerCount(users) {
		return users.length;
	},

	getCalls(users) {
		const CALL_THRESHOLD = 15;
		const allCalls = users.map((user)=> {
			return user.user.calls.filter((call)=>call.duration >= CALL_THRESHOLD);
		});
		const flatCalls = [].concat(...allCalls);
		return flatCalls;
	},

	getCallCount(calls) {
		return calls.length;
	},

	getTotalCallLength(calls) {
		const totalCallLength = calls.reduce((pre, cur) => { return pre + cur.duration; }, 0);
		return totalCallLength;
	},

	render() {
		// const leaders = this.props.leaderboardData.leaders || [];
		const allUsers = this.getAllUsers();
		const playerCount = this.getActivePlayerCount(allUsers);
		const calls = this.getCalls(allUsers);
		const callCount = this.getCallCount(calls);
		const totalCallLength = this.getTotalCallLength(calls);
		const totalLengthStr = this.secondsToHoursMinutsSeconds(totalCallLength);
		return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.title}>Game Stats</div>
                    <div style={styles.numbersWrapper}>
                        <div style={styles.numberHeader}>Active Players:</div>
                        <div style={styles.number}>{playerCount}</div>

                        <div style={styles.numberHeader}>Calls made:</div>
                        <div style={styles.number}>{callCount}</div>

						<div style={styles.numberHeader}>Total Calls Length:</div>
						<div style={styles.number}>{totalLengthStr}</div>

                    </div>

                    <div>
                        <div style={styles.title}>Global Game Map</div>
                        <ProgressMap callsData={calls} isGlobal={true} />
                    </div>
					<div>
						<div style={styles.title}>Entire Network</div>
						{allUsers.map((user)=> { return user.user; }).map((user)=> {
							const currStyle = user.children && user.children.length > 1 ? styles.fullWidth : styles.smallTree;
							return (
								<div key={`user-${user.id}`} style={ currStyle }>
									<TreeGraph data={user} isGlobal={true} />
								</div>
							);
						})}
					</div>
                </div>
            </div>
		);
	}
});

function mapStateToProps(state) {
	return {
		leaderboardData: state.leaderboard.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Stats));


styles = {
	container: {
		backgroundColor: '#003d59',
		color: 'white',
		zIndex: 2,
		position: 'relative',
	},
	content: {
		padding: '175px 0em 3em',
		maxWidth: '1100px',
		margin: '0 auto',
	},
	title: {
		fontSize: '2em',
		fontWeight: 'lighter',
		textAlign: 'center',
		padding: '1em 0em',
		color: 'white',
		letterSpacing: '0.1em',
		position: 'relative',
	},
	numbersWrapper: {
		textAlign: 'center',

	},
	number: {
		fontSize: '4em',
		fontWeight: 'bold',
	},
	numberHeader: {
		padding: '0.5em'
	},
	fullWidth: {
		width: '100%',
	},
	smallTree: {
		display: 'inline-block',
		width: '10%',
	}
};
