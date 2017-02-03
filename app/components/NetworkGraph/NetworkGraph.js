import * as d3 from 'd3';
import React ,  { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom'


var color = d3.scaleOrdinal(d3.schemeCategory20);

// var tree = d3.tree()
//     .size([360, 500])
//     .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var simulation = d3.forceSimulation()

    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", function(d) {
        return d._children ? -d.size / 100 : d.children ? -100 : -30;
    });
    //.force("center", d3.forceCenter(width / 2, height / 2));
// var width = 960;
// var height = 500;
// var force = d3.layout.force()
//     .charge(-300)
//     .linkDistance(50)
//     .size([width, height]);

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

var enterNode = (selection) => {
    selection.classed('node', true);

    selection.append("circle")
        .attr("r", 10) // change according to node score
        .attr("fill", function(d) { return color(d.state); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    selection.append('text')
        //.attr("x", (d) => d.size + 5)
        .attr("dy", ".35em")
        .text((d) => d.name);
};

var updateNode = (selection) => {
    selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
};

var enterLink = (selection) => {
    selection.classed('link', true)
        .attr("stroke-width", 1)
        .attr('stroke', 'black' );//(d) => d.size);
};

var updateLink = (selection) => {
    selection.attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
};

var updateGraph = (selection) => {
    selection.selectAll('.node')
        .call(updateNode);
    selection.selectAll('.link')
        .call(updateLink);
};

var dragstarted = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
};

var dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
};

var dragended = (d) => {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
};


// *****************************************************
// ** Graph and App components
// *****************************************************

var Graph = React.createClass({
    componentDidMount() {
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
        const svg = ReactDOM.findDOMNode(this.refs.svg);
        const width = svg.clientWidth;
        const height = svg.clientHeight;
        simulation.force("center", d3.forceCenter(width / 2, height / 2));
        simulation.on('tick', () => {
            this.d3Graph.call(updateGraph);
        });
    },

    shouldComponentUpdate(nextProps) {
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));

        var d3Nodes = this.d3Graph.selectAll('.node')
            .data(nextProps.nodes, (node) => node.id);
        d3Nodes.enter().append('g').call(enterNode);
        d3Nodes.exit().remove();
        d3Nodes.call(updateNode);

        var d3Links = this.d3Graph.selectAll('.link')
            .data(nextProps.links, (link) => link.index);
        d3Links.enter().insert('line', '.node').call(enterLink);
        d3Links.exit().remove();
        d3Links.call(updateLink);

        simulation.nodes(nextProps.nodes);
        simulation.force("link").links(nextProps.links);


        return false;
    },

    render() {
        return (
            <svg width={'100%'} ref='svg'>
                <g ref='graph' />
            </svg>
        );
    }
});



export const NetworkGraph  = React.createClass({
    propTypes: {
        rootNode: PropTypes.object,
    },
    flatten :function(root) {
        var nodes = [], i = 0;
        function recurse(node) {
            if (node.children) node.children.forEach(recurse);
            if (!node.id) node.id = ++i;
            nodes.push(node);
        }

        recurse(root);
        return {'nodes': nodes, 'links':this.getLinks(nodes)}
    },


    getLinks: function(flatNodes) {
    var links = []
    flatNodes.forEach((node)=>{
        if (node.parentId) {
            links.push({'source': node.parentId, 'target': node.id})
        }
    });
    return links;
    },

render() {
        const nodes = d3.hierarchy(this.props.rootNode);
        const links = nodes.links();
        console.log(nodes);
        console.log(links);
        const data = this.flatten(this.props.rootNode);
        console.log(data);
        return (
            <div width={'100%'} height={'70%'}>
                <Graph nodes={data.nodes} links={data.links} />
            </div>
        );
    }
});

export default Radium (NetworkGraph);
