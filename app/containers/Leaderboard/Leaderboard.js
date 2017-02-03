import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import { getLeaderboard } from './actions';

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

    getStates: function(flatCalls) {
        const states = [];
        flatCalls.forEach((call)=>{
            if (states.indexOf(call.state)==-1){
                states.push(call.state);
            }
        })
        return states;
    },

	flattenLeaders: function(users) {
		const result = [];
		users.forEach((user)=>{
			let flatCalls = this.returnCalls(user, 0);
			let userStates = this.getStates(flatCalls)
            result.push({'user':user, 'states':userStates, 'statesCount': userStates.length, 'score':this.getScore(flatCalls) });
            if (user.children) {
                result.concat(this.flattenLeaders(user.children));
            }
		})
		return result;
	},
	
	render() {
        const leaders = this.props.leaderboardData.leaders || [];
        const flatLeaders = this.flattenLeaders(leaders).sort(function (a, b) {
            return cmp(a.statesCount, b.statesCount) || cmp(a.score, b.score)
        }).reverse().slice(0, 20);
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<div style={styles.title}>Leaders</div>
				</div>

				{this.props.leaderboardData.loading &&
					<Spinner />
				}
				{flatLeaders.map((user)=>{
				    return(
					<Leader key={user.user.id} leader={user}/>)
				})}
			</div>
		);
	}
});

export const Leader = React.createClass({
    propTypes: {
        leader: PropTypes.object,

    },
    render() {
        const user = this.props.leader;
        const percent = (user.statesCount/50.0)*100;
        return(
            <div style={styles.leader}>
                <Link to={`/${user.user.id}`}>{user.user.name}</Link>
                <div style={styles.statesBar}>
                    <div style={{width:'60%', height:'20px', background:'#dddddd',  display: 'inline-block'}}>
                        <div style={{width:percent+'%', height:'100%', background:'#2b4e60'}}></div>
                    </div>
                    <div style={styles.statesCount}>{user.statesCount} States</div>
                </div>
                <div style={{display: 'block'}}>{user.score} Points</div>
            </div>
        )
    }
});

function cmp(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
}

function mapStateToProps(state) {
	return {
		leaderboardData: state.leaderboard.toJS(),
	};
}

export default connect(mapStateToProps)(Radium(Leaderboard));

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
    statesBar: {
	    width: '100%',
        padding: '0.5em'
    },
    statesCount: {
        // float:'left',
        marginLeft: '2em',
        display: 'inline-block',
        verticalAlign: 'top'
    },
    leader: {
	    padding:'1em'
    }
		
};
