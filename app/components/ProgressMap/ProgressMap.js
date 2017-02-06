// Taken from https://github.com/caspg/simple-data-table-map

import * as d3 from 'd3';
import Datamap from 'datamaps/dist/datamaps.usa.min';
import React, { PropTypes } from 'react';
import statesDefaults from './states-defaults';
import objectAssign from 'object-assign';
import Radium from 'radium';
import {getStatesArcs} from '../../Utilities/UserUtils'

export const ProgressMap  = React.createClass({
	propTypes: {
		callsData: PropTypes.array,
		user:PropTypes.object,
	},

    getInitialState() {
        return {showCallsFlow: false};
    },

	toggleCallsFlow:function() {
        this.setState({showCallsFlow:!this.state.showCallsFlow});
	},

	linearPalleteScale: function(value){
		const dataValues = this.props.callsData.map(function(data) { return data.value });
		const minVal = 0;
		const maxVal =2; // Set maximum val for score
		return d3.scaleLinear().domain([minVal, maxVal]).range(["#EFEFFF", "#42006F"])(value);
	},

	reducedData: function(){
		let statesCount = {};
		if (this.props.callsData.length>0) {
			this.props.callsData.forEach((call)=>
			{
				if (statesCount[call.state]) {
					statesCount[call.state].colorValue+=(1/Math.pow(2,call.distance));
					statesCount[call.state].value+=1;
				}
				else {
					statesCount[call.state] = {
						'code': call.state,
						'colorValue': (1 / Math.pow(2, call.distance)),
						'value': 1
					};
				}
			});
			Object.keys(statesCount).forEach((state)=> {
				statesCount[state].fillColor = this.linearPalleteScale(statesCount[state].colorValue);
			});

		}
		return objectAssign({}, statesDefaults, statesCount);
	},

	renderMap: function(){
		return new Datamap({
			element: this.refs.container,
			scope: 'usa',
			responsive: true,
			data: this.reducedData(),
			geographyConfig: {
				borderWidth: 0.5,
				highlightFillColor: '#8b8b8b',
                highlightBorderColor: 'rgba(45, 45, 45, 0.3)',
				popupTemplate: function(geography, data) {
					if (data && data.value) {
						return '<div class="hoverinfo"><strong>' + geography.properties.name + ', ' + data.value + '</strong></div>';
					} else {
						return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
					}
				}
			}
		});
	},

	resizeMap: function() {
		this.datamap.resize();
	},

	clear: function() {
		const { container } = this.refs;

		for (const child of Array.from(container.childNodes)) {
			container.removeChild(child);
		}

		delete this.datamap;
	},

	componentDidMount: function(){
		this.datamap = this.renderMap();
		window.addEventListener('resize', this.resizeMap);
	},

	componentDidUpdate: function(){
		this.datamap.updateChoropleth(this.reducedData());
		const arcs = this.state.showCallsFlow? getStatesArcs(this.props.user).map((arc)=>{
                arc.options = {
                    strokeWidth: 0.5,
                    strokeColor: 'rgba(0, 0, 0, 0.4)',
                }
                return arc;
            }) : []
		this.datamap.arc(arcs);
	},

	componentWillUnmount: function(){
		this.clear();
		window.removeEventListener('resize', this.resizeMap);

	},
	render: function() {
		const style = {
			position: 'relative',
			width: '100%'
		};
		const buttonText = this.state.showCallsFlow? "Hide": "Show";
		const button = <button onClick={this.toggleCallsFlow}>{buttonText} Calls Flow</button>;
		return (
			<div>
			<div ref="container" style={style}></div>
				{button}
			</div>

		);
	}
});

export default Radium (ProgressMap);