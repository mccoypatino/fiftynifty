import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Button, Spinner } from '@blueprintjs/core';
import Radium from 'radium';
import { getLeaderboard } from './actions';
import { flattenLeaders } from '../../Utilities/UserUtils';

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

    getInitialState() {
		return {
			leaderSort: 'byStateCount',
		};
	},

    leadersByStateCount() {
        const leaders = this.props.leaderboardData.leaders || [];
        const flatLeaders = flattenLeaders(leaders).sort(function (a,b) {
            return cmp(a.statesCount, b.statesCount) || cmp(a.score, b.score);
        }).reverse();
        return flatLeaders;
    },

    leadersByScore() {
        const leaders = this.props.leaderboardData.leaders || [];
        const flatLeaders = flattenLeaders(leaders).sort(function (a,b) {
            return cmp(a.score, b.score);
        }).reverse();
        return flatLeaders;
    },

    leadersByNumChildren() {
        const leaders = this.props.leaderboardData.leaders || [];
        const flatLeaders = flattenLeaders(leaders).sort(function (a,b) {
            const aNum = a.user.children ? a.user.children.length : 0;
            const bNum = b.user.children ? b.user.children.length : 0;
            return cmp(aNum, bNum) || cmp(a.score, b.score);
        }).reverse();
        return flatLeaders;
    },

    toggleByStateCount: function() {
		this.setState({ leaderSort: 'byStateCount' });
	},

    toggleByScore: function() {
		this.setState({ leaderSort: 'byScore' });
	},

    toggleByNumChildren: function() {
		this.setState({ leaderSort: 'byNumChildren' });
	},

	render() {
        let leaders = [];
        const myId = JSON.parse(localStorage.getItem('userData'))["id"];
        if (this.state.leaderSort === 'byStateCount') {
            leaders = this.leadersByStateCount();
        }
        else if (this.state.leaderSort === 'byScore') {
            leaders = this.leadersByScore();
        }
        else if (this.state.leaderSort === 'byNumChildren') {
            leaders = this.leadersByNumChildren();
        }
        const myLeaderIndex = leaders.findIndex(function (leader) {
            return leader.user.id === myId;
        });
        const myLeader = leaders[myLeaderIndex];
		return (
		    <div style={styles.flagImage}>
                <div style={styles.flagSplash}>
                    <div style={styles.container}>
                        <div style={styles.content}>
                            {this.props.leaderboardData.loading &&
                            <div style={styles.centered}>
                                <Spinner />
                            </div>
                            }
                            <div style={styles.sortTitle}>Sort By:</div>
                            <button role={'button'} style={styles.sortButton} className={'pt-button count-sort'} onClick={this.toggleByStateCount}>State Count</button>
                            <button role={'button'} style={styles.sortButton} className={'pt-button score-sort'} onClick={this.toggleByScore}>Score</button>
                            <button role={'button'} style={styles.sortButton} className={'pt-button invites-sort'} onClick={this.toggleByNumChildren}>Invites</button>
                            {myLeader && 
                                <div style={styles.myLeader}><Leader key={myId} leader={myLeader} index={myLeaderIndex+1}/></div>
                            }
                            {leaders.slice(0,10).map((user, index)=>{
                                return(
                                    <Leader key={user.user.id} leader={user} index={index+1}/>)
                                })}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
});

export const Leader = React.createClass({
    propTypes: {
        leader: PropTypes.object,
        index: PropTypes.number,
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
                    <span style={styles.leaderIndex}>{this.props.index}</span><Link style={styles.leaderName} to={`/${user.user.id}`}>{user.user.name}</Link>
                    <div style={styles.statesBar}>
                        <div style={styles.outerBar}>
                            <div style={styles.progressbar(percent)}></div>
                        </div>
                        <div style={styles.statesCount}>{Math.min(user.statesCount, 50)} / 50</div>
                    </div>
                    <div style={styles.score}>{Math.floor(user.score)} Points</div>
                    <div style={styles.numInvites}>{user.user.children ? user.user.children.length : 0} Invites Sent</div>
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
        display:'block',
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
        width:'75px',
        textAlign: 'right',

    },
    leaderRow: {
        background: '#dce4ef',
        borderBottom: '3px solid rgba(8, 48, 74, 0.5)',
        opacity:'1',
    },
    outerBar: {
	    width:'calc(100% - 90px)',
        height:'1em',
        display: 'inline-block',
        textAlign:'center',
        background: 'linear-gradient(to right, #ff6f70, #cf1e34)',
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
    leaderIndex:{
        color: '#ff6f70',
        fontSize:'2em',
        fontWeight: 'bold',
        marginRight: '5px',
    },
    myLeader:{
        marginTop: '5px',
        marginBottom:'30px',
    },
    score:{
        display: 'inline-block',
        fontSize:'0.9em',
        fontWeight:'light',
        paddingTop: '1em',
        width: '50%',
        textAlign: 'center',
    },
    numInvites:{
        display: 'inline-block',
        fontSize:'0.9em',
        fontWeight:'light',
        paddingTop: '1em',
        width: '50%',
        textAlign: 'center',
    },
    flagImage: {
        backgroundImage: 'url("/static/american-flag.jpg")',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        minHeight:'100vh',
    },
    flagSplash: {
        backgroundColor: '#1c435a',
        opacity: 0.9,
        minHeight:'100vh',
    },
    centered: {
        textAlign:'center',
    },

    sortTitle: {
        display: 'inline-block',
        color: '#FFFFFF',
    },

    sortButton: {
        display: 'inline-block',
        marginLeft: '5px',
        marginBottom: '5px',
    },

};
