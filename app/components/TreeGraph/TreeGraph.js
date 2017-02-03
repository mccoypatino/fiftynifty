import * as d3 from 'd3';
import React ,  { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom'

let d3Tree = {};
let color = d3.scaleOrdinal(d3.schemeCategory10)
d3Tree.create = function(el, div,  props, state) {
	let svg = d3.select(el).attr("transform", "translate(" + (props.width *0.1 ) + "," + (props.height *0.1) + ")");
	this.update(el, div, state);
};

d3Tree.update = function(el, div ,state) {
	this._drawTree(el, div, state.data);
};

d3Tree._drawTree = function(el, div, data) {

	let svg = d3.select(el);
	let width = div.clientWidth*0.8;
	let height = div.clientHeight*0.8;
    let treeData = d3.hierarchy(data);
	let tree = d3.tree()
		.size([height, width])
		.separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
	let root = tree(treeData);
    root.x = height / 2;
    root.y = 0;
    root.data = data;

	let p = svg.selectAll('path.link');
	let link = p.data(root.descendants().slice(1));
	link.enter().append("path")
		.attr("class", "link")
		.attr("d", function(d) {return diagonal(d, d.parent);
		});
	link.exit().remove();


	let nodes = root.descendants();
	let g = svg.selectAll('.node');
	let node = g.data(nodes);
    let nodeEl = node.enter().append("g")
		.attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
		.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });
	nodeEl.append("circle")
		.attr("r", function(d){return 30/Math.pow(2,d.depth);}) // set circle size by user stroke
		.attr("fill", function(d) {
			return(d.data.zipcode? color(parseInt(d.data.zipcode.substring(0,1))): "#888888")})
		.attr("stroke", function(d){return !d.data.id? "black": "none"})
    	.attr("stroke-width", function(d){return !d.data.id? 2: 0})
    nodeEl.append("a")
		.attr("dy", ".31em")
        .attr("xlink:href", function(d) {return d.data.id? '/'+d.data.id: '#'})
		.append("text")
		.text(function(d) { return d.data.name; })
		.append("svg:title")
        .text(function(d) { return 'name:'+d.data.name+', zipcode:'+d.data.zipcode;});
	node.exit().remove();


};

function diagonal(s, d) {

    let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
}

class TreeChart extends React.Component {

	componentDidMount() {
		var el = ReactDOM.findDOMNode(this.refs.chart);
		var div = ReactDOM.findDOMNode(this);
		d3Tree.create(el, div, {
			width: div.clientWidth,
			height: div.clientHeight,
		}, this.getChartState());
	}

	componentDidUpdate() {
		var el = ReactDOM.findDOMNode(this.refs.chart);
		var div = ReactDOM.findDOMNode(this)
		d3Tree.update(el,div, this.getChartState());
	}

	getChartState() {
		return {
			data: this.props.data
		};
	}

	render() {
		return (
			<div className="TreeChart">
				<svg width="100%" height="60%">
					<g ref="chart"></g>
				</svg>
			</div>
		);
	}
}

export const  TreeGraph = React.createClass({
	propTypes: {
		data: PropTypes.object
	},

	render() {
		const css = `

					.node text {
					font: 10px sans-serif;
				}


					.node--internal text {
					text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
				}

					.link {
					fill: none;
					stroke: #555;
					stroke-opacity: 0.4;
					stroke-width: 1.5px;
				}
				`;
		return(
			<div>
				<style>
					{css}
				</style>
			<TreeChart data={this.props.data} />
			</div>
		);
	}
});

export default Radium (TreeGraph);
