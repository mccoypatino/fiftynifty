import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import { getLeaderboard } from './actions';
import {getScore, getStates} from '../../Utilities/UserUtils';

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

	flattenLeaders: function(users) {
		const result = [];
		users.forEach((user)=>{
			let userStates = getStates(user);
            result.push({'user':user, 'states':userStates, 'statesCount': userStates.length, 'score':getScore(user) });
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
        }).reverse().slice(0, 5);
		return (
		    <div>
		    <div style={styles.flagImage}/>
                <div style={styles.flagSplash}/>
                    <div style={styles.container}>
                        <div style={styles.content}>
                            {this.props.leaderboardData.loading &&
                            <Spinner />
                            }
                            {flatLeaders.map((user)=>{
                                return(
                                    <Leader key={user.user.id} leader={user}/>)
                                })}
                        </div>
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
        this.loadTimeout = setTimeout(()=>this.setState({
            didRender:true
        }),0);
    },

    componentWillUnmount () {
        this.loadTimeout && clearInterval(this.loadTimeout);
        this.loadTimeout = false;
    },

    render() {
        const user = this.props.leader;
        const percent = this.state.didRender? (Math.min(user.statesCount, 50)/50.0 )*100: 0;
        return(
            <div style={styles.leaderRow}>
                <div style={styles.section}>
                    <Link style={styles.leaderName} to={`/${user.user.id}`}>{user.user.name}</Link>
                    <div style={styles.statesBar}>
                        <div style={styles.outerBar}>
                            <div style={styles.progressbar(percent)}></div>
                        </div>
                        <div style={styles.statesCount}>{Math.min(user.statesCount, 50)} / 50</div>
                    </div>
                    <div style={styles.score}>{Math.floor(user.score)} Points</div>
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
            height:'1em',
            background: '#f7f5f3',
            opacity:'1',
            position: 'absolute',
            right: '0px',
            transition:'width 2s'

        };
    },
	container: {
		padding: 'calc(115px + 2em) 2em 3em',
		maxWidth: '1024px',
		margin: '0 auto',
        zIndex: 2,
        position: 'relative',
        display:'block'
	},
	content: {
		padding: '0.1em',
	},
    section: {
        padding:'1em',
        color:'#00296a',
        opacity:'1'
    },
	title: {
		fontSize: '2.5em',
		fontWeight: '200',
	},
    statesBar: {
	    width: '100%',
        maxWidth:'100%',
        paddingTop: '1em'
    },
    statesCount: {
        marginRight: '1em',
        display: 'inline-block',
        color:'#00296a',
        fontSize:'1em',
        fontWeight: '600',
        float:'right',
        '@media screen and (min-resolution: 3dppx), screen and (max-width: 767px)': {
            maxWidth: '100%',
        }

    },
    leaderRow: {
        background: '#dce4ef',
        borderBottom: '3px solid rgba(8, 48, 74, 0.5)',
        opacity:'0.8',
    },
    outerBar: {
	    width:'85%',
        height:'1em',
        display: 'inline-block',
        textAlign:'center',
        color:'#ff510f',
        background: 'linear-gradient(to right, #fdb81e, #ff510f)',
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
        fontWeight:'300',
        fontSize:'1em',
        fontWeight: 'bold',
    },
    score:{
        display: 'block',
        fontSize:'0.9em',
        fontWeight:'light',
        paddingTop: '1em'
    },
    flagImage: {
        backgroundImage: 'url("/static/american-flag.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
        top: 0,
        left: 0,
    },
    flagSplash: {
        position: 'absolute',
        backgroundColor: '#1c435a',
        opacity: 0.9,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
    },

};
