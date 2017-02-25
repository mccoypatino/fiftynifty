// Taken from https://github.com/caspg/simple-data-table-map

import * as d3 from 'd3';
import Datamap from 'datamaps/dist/datamaps.usa.min';
import React, { PropTypes } from 'react';
import statesDefaults from './states-defaults';
import objectAssign from 'object-assign';
import Radium from 'radium';
import {getStatesArcs} from '../../Utilities/UserUtils';
import chroma from 'chroma-js';

const map = function (val, in_min, in_max, out_min, out_max) {
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};

export const ShowButton  = React.createClass({
    propTypes: {
        show: PropTypes.bool,
        text:PropTypes.string,
		onClick:PropTypes.func,
    },

    render() {
        const buttonText = this.props.show? "Hide": "Show";
        const className = this.props.show? "pt-button pt-minimal pt-icon-remove pt-intent-warning" :
            "pt-button pt-minimal pt-icon-add pt-intent-warning";
        const button = (<div style={{textAlign:'center'}}>
			<button type={"button"} className={className} onClick={this.props.onClick}>{buttonText} {this.props.text}</button></div>);
        return button
	}

});


export const ProgressMap  = React.createClass({
	propTypes: {
		callsData: PropTypes.array,
		user:PropTypes.object,
		isGlobal: PropTypes.bool,
	},

    getInitialState() {
        return {
        	showCallsFlow: false,
            showCallsCount: false,
        };
    },

	toggleCallsFlow:function() {
        this.setState({showCallsFlow:!this.state.showCallsFlow});
	},

    toggleCallsCount:function() {
        this.setState({showCallsCount:!this.state.showCallsCount});
    },

	reducedData: function(){
		let statesCount = {};
		let maxVal = 0
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
				maxVal = Math.max(maxVal, statesCount[call.state].value);
			});
			const colorScale = d3.scaleLinear().domain([0, maxVal]).range(["#bcbddc", "#3f007d"]);
			Object.keys(statesCount).forEach((state)=> {
				statesCount[state].fillColor = this.props.isGlobal? colorScale(statesCount[state].colorValue) : '#fdb81e';
			});

		}
		return objectAssign({}, statesDefaults, statesCount);
	},

	bubblesData: function() {
        let bubblesData = [];
        let statesCount = {};
        let maxVal = 1;
        if (this.props.callsData.length>0) {
            this.props.callsData.forEach((call)=>
            {
                if (statesCount[call.state]) {
                    statesCount[call.state].colorValue+=(1/Math.pow(2,call.distance));
                    statesCount[call.state].value+=1;
                    maxVal = Math.max(maxVal, statesCount[call.state].value);
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
            	const r = map(statesCount[state].value, 0, maxVal, 0, 40);
                bubblesData.push({centered: state,  radius:r, value:statesCount[state].value}); //this.linearPalleteScale(statesCount[state].colorValue);
            });

        }
        return bubblesData;
	},

	renderMap: function(){
		return new Datamap({
			element: this.refs.container,
			scope: 'usa',
			responsive: true,
			data: this.reducedData(),
            arcConfig: {
                strokeColor: '#898989',
                strokeWidth: 1,
                arcSharpness: 1,
                animationSpeed: 2000,
            },
            bubblesConfig: {
                fillOpacity: 0.3,
                borderColor: '#444',
                borderWidth: 0.5,
                popupOnHover: true,
                highlightOnHover: true,
                highlightFillColor: '#295a6d',
                highlightBorderColor: 'rgba(250, 15, 160, 0.2)',
                highlightBorderWidth: 2,
                highlightBorderOpacity: 1,
                highlightFillOpacity: 0.85,
                popupTemplate: function(geography, data) {
                    if (data && data.value) {
                        return '<div class="hoverinfo"><strong>' + geography.centered + ', ' + data.value + '</strong></div>';
                    }
                },
            },
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
		let arcsCount = 0;
		let bubblesCount = 0;
		if (!this.props.isGlobal) {
            arcsCount = getStatesArcs(this.props.user).length;
            bubblesCount = this.bubblesData().length;

            const arcs = this.state.showCallsFlow ? getStatesArcs(this.props.user) : [];
            const bubbles = this.state.showCallsCount ? this.bubblesData() : [];
            if (this.datamap) {
                this.datamap.arc(arcs);
                this.datamap.bubbles(bubbles);
            }
        }

		return (
			<div>
			<div ref="container" style={style}></div>
				{!this.props.isGlobal && arcsCount>0 && <ShowButton show={this.state.showCallsFlow} text="Invites Flow" onClick={this.toggleCallsFlow}/>}
				{!this.props.isGlobal && bubblesCount>0 && <ShowButton show={this.state.showCallsCount} text="Calls Count" onClick={this.toggleCallsCount}/>}
			</div>

		);
        }
});

export default Radium (ProgressMap);