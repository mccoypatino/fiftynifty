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
				<div width={'100%'}>
				{flatLeaders.map((user)=>{
				    return(
					<Leader key={user.user.id} leader={user}/>)
				})}
                </div>

			</div>
		);
	}
});

export const Leader = React.createClass({
    propTypes: {
        leader: PropTypes.object,

    },
    getInitialState () {
        return {
            didRender : false
        };
    },
    componentDidMount() {
        setTimeout(()=>this.setState({
            didRender:true
        }),0);
    },

    render() {
        const user = this.props.leader;
        const percent = this.state.didRender? (user.statesCount/50.0)*100: 0;
        return(
            <div style={styles.leaderRow}>
                <div style={styles.section}>
                <Link style={styles.leaderName} to={`/${user.user.id}`}>{user.user.name}</Link>
                </div>
                <div style={styles.statesBar}>
                    <div style={styles.outerBar}>
                        <div style={styles.progressbar(percent)}></div>
                        <table width={'100%'} height={'100%'}>
                            <tbody>
                            <tr style={{textAlign:'center'}}>
                        {[...Array(10).keys()].map((i)=>
                            <td key={i}>< span style={styles.star} className={'pt-icon-standard pt-icon-star'} /></td>)
                        }
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={styles.statesCount}>{user.statesCount} / 50</div>
                </div>
                <div style={styles.section}>
                <div style={styles.score}>Score: {Math.floor(user.score)}</div>
                </div>
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
    progressbar: function(percent) {
        return {
            width: (100-percent)+'%',
            height:'2em',
            background: '#922332',//'#EDEDED',
            opacity:'0.95',
            position: 'absolute',
            right: '0px',
            transition:'width 2s'

        };
    },
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
    statesBar: {
	    width: '100%',
        maxWidth:'100%',
        padding: '0.5em'
    },
    statesCount: {
        // float:'left',
        marginLeft: '0.2em',
        display: 'inline-block',
        color:'#EDEDED',//'#BF0A30',
        fontSize:'1em',
        fontWeight: '600'
    },
    leaderRow: {
        background: '#922332',//'#EDEDED',
        borderBottom: '3px solid #FEFEFE',
    },
    outerBar: {
	    width:'80%',
        height:'2em', //'#dddddd',
        display: 'inline-block',
        textAlign:'center',
        background:'#002868',
        position: 'relative',
        verticalAlign: 'middle'
	},
    star: {
        textAlign: 'center',
        color:'white'
    },
    starsTable: {
        width: '100%',
        height: '100%',
        position: 'relative',
        left: '50%',
        top: '50%',
    },
    leaderName: {
        fontWeight: 'bold',
        fontSize:'1.3em',
        color:'white'
    },
    score:{
        display: 'block',
        fontSize:'1.1em',
        fontWeight:'bold',
        color:'white'
    },
    section: {
        padding: '0.75em',
    },

		
};
