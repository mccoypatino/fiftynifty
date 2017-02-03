import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import { getLeaderboard } from './actions';
import { UserNode } from '../User/UserNode';

let styles;

export const Leaderboard = React.createClass({
	propTypes: {
		leaderboardData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		this.props.dispatch(getLeaderboard());
	},
	
	render() {
		const leaders = this.props.leaderboardData.leaders || [];
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<div style={styles.title}>Leaders</div>
				</div>

				{this.props.leaderboardData.loading &&
					<Spinner />
				}

				{leaders.map((node)=> {
					return <UserNode key={node.id} node={node} />;
				})}
				
			</div>
		);
	}
});

function mapStateToProps(state) {
	return {
		leaderboardData: state.leaderboard.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Leaderboard));

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
		
};
