import * as d3 from 'd3';
import React ,  { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom'


var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    //.force("center", d3.forceCenter(width / 2, height / 2));

// *****************************************************
// ** d3 functions to manipulate attributes
// *****************************************************

var enterNode = (selection) => {
    selection.classed('node', true);

    selection.append('circle')
        .attr("r", 5) //(d) => d.size) set circle size by node size
        //.attr("fill", (d)=>d.color)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    selection.append('text')
        .attr("x", (d) => d.size + 5)
        .attr("dy", ".35em")
        .text((d) => d.name);
};
function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}


var updateNode = (selection) => {
    // .attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    console.log(selection)

    //selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")");
};

var enterLink = (selection) => {
    selection.classed('link', true)
        .attr("stroke-width", (d) => d.size);
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

var flatten = (root) => {
    var nodes = [], i = 0;
    function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        if (!node.id) node.id = ++i;
        nodes.push(node);
    }

    recurse(root);
    return nodes
};

var ticked = function() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

var getLinks = (flatNodes) =>{
    var links = []
    flatNodes.forEach((node)=>{
        links.push({'source':node.parentId, 'target':node.id})
    })
    return links;
};

export const NetworkGraph  = React.createClass({
    propTypes: {
        rootNode: PropTypes.object,
    },
    componentDidMount() {
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
        simulation.on('tick', () => {
            // after force calculation starts, call updateGraph
            // which uses d3 to manipulate the attributes,
            // and React doesn't have to go through lifecycle on each tick
            this.d3Graph.call(updateGraph);
        });
    },

    shouldComponentUpdate(nextProps) {
        const nodes = flatten(nextProps.rootNode);
        const links = getLinks(nodes);
        this.d3Graph = d3.select(ReactDOM.findDOMNode(this.refs.graph));
        console.log(nodes);
        console.log(links);


        var d3Nodes = this.d3Graph.selectAll('.node')
            .data(nodes, (node) => node.id);
        d3Nodes.enter().append('g').call(enterNode);
        d3Nodes.exit().remove();
        d3Nodes.call(updateNode);

        var d3Links = this.d3Graph.selectAll('.link')
            .data(links, (link) => link.key);
        d3Links.enter().insert('line', '.node').call(enterLink);
        d3Links.exit().remove();
        d3Links.call(updateLink);

        simulation
            .nodes(d3Nodes)
            .on("tick", ticked);

        simulation.force("link")
            .links(d3Links);

        return false;
    },

    render() {
        return (
            <svg width={'100%'} height={'100%'}>
                <g ref='graph' />
            </svg>
        );
    }
});

export default Radium (NetworkGraph);
