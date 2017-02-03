import * as d3 from 'd3';
import React ,  { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom'

let d3Tree = {};
d3Tree.create = function(el, div,  props, state) {
    d3.select(el).attr("transform", "translate(" + (props.width / 2 ) + "," + (props.height / 2 ) + ")");
    this.update(el, div, state);
};

d3Tree.update = function(el, div ,state) {
    this._drawTree(el, div, state.data);
};

d3Tree._drawTree = function(el, div, data) {

    let svg = d3.select(el);
    let width = div.clientWidth;
    let height = div.clientHeight;
    let tree = d3.tree()
        .size([width/3,height/2])
        .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
    let root = tree(data);

    let p = svg.selectAll('path.link');
    let link = p.data(root.descendants().slice(1));
    link.enter().append("path")
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + project(d.x, d.y)
                + "C" + project(d.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, d.parent.y);
        });

    link.exit().remove();


    let nodes = root.descendants();
    let g = svg.selectAll('.node');
    let node = g.data(nodes);
    node.enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

    node.append("circle")
        .attr("r", function(d){return 12/Math.pow(2,d.depth);});

    node.append("text")
        .attr("dy", ".31em")
        .attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
        .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
        .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
        .text(function(d) { return d.data.name; });
    node.exit().remove();

};

function project(x, y) {
    var angle = (x - 90) / 180 * Math.PI, radius = y;
    return [radius * Math.cos(angle), radius * Math.sin(angle)];
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
                .node circle {
                    fill: #999;
                }

                    .node text {
                    font: 10px sans-serif;
                }

                    .node--internal circle {
                    fill: #555;
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

        const nodes = d3.hierarchy(this.props.data);
        return(
            <div>
                <style>
                    {css}
                </style>
            <TreeChart data={nodes} />
            </div>
        );
    }
});

export default Radium (TreeGraph);
