import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { Spinner } from '@blueprintjs/core';
import Radium from 'radium';
// import fetch from 'isomorphic-fetch';
import { Representative, AddressInput, ProgressMap, NetworkGraph, TreeGraph } from 'components';
import { getUser, requestCall, requestLatLong } from './actions';
import { Invite } from './Invite';
import {getScore, countStates} from '../../Utilities/UserUtils'
import { UserNode } from './UserNode';
import {PieChart, Pie, Cell,Legend, Tooltip} from 'recharts';

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
		const score = getScore(user);
		const shareUrl = "http://fiftynifty.org/?ref="+user.id;//When we get nicer urls, adda "getUrl" function
        const statesCount = countStates(user);
        const chartData = [{name: 'SatesDone', value: statesCount}, {name: 'not Done', value: 50-statesCount}];
        const COLORS = ['#cb0027', 'rgba(0,0,0,0)'];
        const localUserData = localStorage.getItem('userData');
        const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
        const isLocalUser = localUser.id===user.id;
        const presentName = isLocalUser? 'Your' : user.name+"'s";

		return (
			<div>
				<div style={styles.repsBackground}>
					<div style={styles.repsBackgroundSplash}>
						<div style={styles.container}>
                            {this.props.userData.loading &&
							<div style={styles.centered}>
								<Spinner />
							</div>
                            }
							<div style={styles.content}>
								<div style={styles.title}>{user.name}, {user.state}</div>

                                {/*{true && true &&*/}
                                {/*<AddressInput zipcode={user.zipcode} geolocateFunction={this.geolocateFunction} isLoading={this.props.userData.latLonLoading} />*/}
                                {/*}*/}
								{isLocalUser &&
									<div>
								<div style={styles.repsWrapper}>

									<div style={styles.repsBox} className={"pt-elevation-3"}>
										<div style={styles.sectionTitle}>Your Representatives</div>
                                        {reps.length === 0 &&
										<div style={styles.centered}>
											<Spinner />
										</div>
                                        }

                                        {reps.map((rep, index) => {
                                            return (
												<Representative key={`rep-${index}`} repData={rep}
																callFunction={this.callFunction}/>
                                            );
                                        })}


									</div>
								</div>
								<p style={styles.orCall}>Or you can call (508) 659-9127 </p>
									</div>}
							</div>
						</div>
					</div>
				</div>

                {isLocalUser &&
				<Invite url={shareUrl}/>
                }

				<div style = {styles.repsBackground}>
					<div style = {styles.repsBackgroundSplash}>
						<div style={styles.progressSection}>
							<div style={styles.sectionTitle}>{presentName} Progress</div>
							<div style={styles.scoreStats}>
								<span style={{textAlign:'center', fontWeight:'lighter'}}> Score: <span style={styles.score}> {Math.floor(score)}</span></span>
								<div style={{display:'inline-block', verticalAlign: 'middle', paddingLeft:'2em', paddingTop:'1em'}}>
									<PieChart height={200} width={200}>
										<Pie data={chartData} innerRadius={70} outerRadius={100} fill="#82ca9d" stroke="none">
                                            {
                                                chartData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                                            }</Pie>
										<text x={100} y={100} textAnchor="middle" dominantBaseline="middle"
											  fill="white" fontWeight="lighter">
                                            {statesCount} / 50 states
										</text>
									</PieChart>
								</div>
							</div>
							<ProgressMap callsData={flatCalls} user={user} />
						</div>
					</div>
				</div>
				<div style={styles.graphBackground}>
					<div style={styles.section}>
						<div style={styles.familySection}>
							<div style={styles.sectionTitle}>{presentName} Fifty Nifty Family</div>
							<TreeGraph data={user}/>
						</div>
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
		padding: 'calc(115px + 0.2em) 0em 3em',
		//maxWidth: '1024px',
		margin: '0 auto',
		opacity:'1',
	},
	content: {
		padding: '1em 0em',
	},
	title: {
		fontSize: '2em',
		fontWeight: 'lighter',
		textAlign: 'center',
		paddingBottom:'1em',
		color:'white',
        letterSpacing:'0.1em',
	},
	section: {
		padding: '2em 0em',
	},
	sectionTitle: {
        fontSize: '1.8em',
        textAlign:'center',
        letterSpacing:'0.1em',
        padding:'0.8em 0',
        fontWeight: 'lighter',
		color:'white',
	},
	score:{
		fontSize:'3em',
		textAlign:'center',
		fontWeight:'bold',
		paddingLeft:'0.2em'
	},
	centered: {
		textAlign:'center',
	},
    repsSectionTitle: {
        fontSize: '1.9em',
		textAlign:'center',
        letterSpacing:'0.1em',
		paddingBottom:'1em',
    },
	progressBackground: {
        background:"linear-gradient(rgba(28, 67, 90, 0.8),rgba(28, 67, 90, 0.8)), url('static/crowd.jpg') no-repeat center center",
        backgroundSize:'cover',
	},
    graphBackground: {
        backgroundColor:"#003d59",
    },
    repsBackground: {
        backgroundImage: 'url("/static/protest.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
    },
	repsBackgroundSplash: {
        background: 'linear-gradient(rgba(0,60,88, 0.8),rgba(0,60,88, 0.8))',//'#1c435a',

	},
    repsWrapper: {
        margin: 'auto',
		width: '80%',
		maxWidth:'350px',
		backgroundColor:'#da022e',
		opacity:'0.95',
        fontWeight: 'lighter',
	},
	repsBox: {
		textAlign: 'left',
		color:'white',
		padding:'1em',
        //fontWeight: '200',
	},
	orCall: {
		textAlign:'center',
		color:'white',
		padding:'1em',
		fontWeight:'lighter',
	},
	familySection:{
		textAlign:'center',
		paddingTop:'1em',
	},
    progressSection:{
		padding:'2em 0',
		color:'white',
	},
	scoreStats:{
		textAlign:'center',
		paddingTop:'2em',
	}
};
