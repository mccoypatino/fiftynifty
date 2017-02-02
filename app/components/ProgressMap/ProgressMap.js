// Taken from https://github.com/caspg/simple-data-table-map

import * as d3 from 'd3';
import topojson from 'topojson';
import Datamap from 'datamaps/dist/datamaps.usa.min';
import React ,  { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import statesDefaults from './states-defaults';
import objectAssign from 'object-assign';
import Radium from 'radium';

export const ProgressMap  = React.createClass({
    propTypes: {
        datamap: PropTypes.object,
        regionData: PropTypes.object,
        callsData: React.PropTypes.array,//.isRequired
    },

    linearPalleteScale: function(value){
        const dataValues = this.props.callsData.map(function(data) { return data.value });
        const minVal = 0;
        const maxVal = 5; // Set maximum val for score
        return d3.scaleLinear().domain([minVal, maxVal]).range(["#EFEFFF","#02386F"])(value);
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
                    }
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
                highlightFillColor: '#ffc5bb',
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
        return (
            <div ref="container" style={style}></div>
        );
    }
});

export default Radium (ProgressMap);