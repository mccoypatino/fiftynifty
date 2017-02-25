import React, { PropTypes } from 'react';
import Radium from 'radium';
import { getLeaderboard } from '../Leaderboard/actions';
import { connect } from 'react-redux';
import { flattenLeaders } from '../../Utilities/UserUtils';
import { ProgressMap } from 'components';

let styles;

export const Stats = React.createClass({
	propTypes: {
		leaderboardData: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		this.props.dispatch(getLeaderboard());
	},

	render() {
		const leaders = this.props.leaderboardData.leaders || [];
		const allUsers = flattenLeaders(leaders);
		const CALL_THRESHOLD = 15;
		const allCalls = allUsers.map((user)=> {
			return user.user.calls.filter((call)=>call.duration >= CALL_THRESHOLD);
		});
		const flatCalls = [].concat(...allCalls);

		return (
            <div style={styles.container}>
                <div style={styles.content}>
                    <div style={styles.title}>Game Stats</div>
                    <div style={styles.numbersWrapper}>
                        <div style={styles.numberHeader}>Active Players:</div>
                        <div style={styles.number}>{allUsers.length+400}</div>

                        <div style={styles.numberHeader}>Calls made:</div>
                        <div style={styles.number}>{flatCalls.length+200}</div>
                    </div>

                    <div>
                        <div style={styles.title}>Global Game Map</div>
                        <ProgressMap callsData={flatCalls} isGlobal={true} />
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
    }
};
