import * as d3 from 'd3';
import React ,  { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom'

export const TreeGraph = React.createClass({

	diagonal : function(d) {
        return "M" + d.source.x + "," + d.source.y
            + "C" + (d.source.x + d.target.x) / 2 + "," + d.source.y
            + " " + (d.source.x + d.target.x) / 2 + "," + d.target.y
            + " " + d.target.x + "," + d.target.y;
    },

	nameToInitials: function(name) {
        return name? name.split(' ').map((word)=>{return word[0]}).join('. '): '';
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
		/* get the pedigree tree data */
        const { data } = this.props;
        const containerWidth = 600;
        const containerHeight = 600;

		/* still use d3.js to calculate the tree layout and position of nodes, links */
        const treeData = d3.hierarchy(data);
        const treeLayout = d3.tree()
            .size([containerWidth, containerHeight]);
        const root = treeLayout(treeData);
        const nodesList = root.descendants();//treeLayout.nodes(root).reverse();
        const linksList = root.links();

		/* render the nodes */
        const nodes = nodesList.map(node => {
            return (
                node.data.id &&
				<g key={node.data.id} className="node"
				   transform={`translate(${node.x}, ${node.y})`}>
					<circle r="15" style={{fill:'pink'}} />
					<text textAnchor="middle">{this.nameToInitials(node.data.name)}</text>
				</g>
            );
        });

		/* render the links */
        const links = linksList.map(link => {
            return (
				<path key={`${link.source.data.id}-${link.target.data.id}`} className="link"
					  d={this.diagonal(link)} />
            );
        });

        return (
			<div className="tree-container">
				<style>
                    {css}
				</style>

				<svg height="1000" width={containerWidth}>
					<g>
                        {links}
                        {nodes}
					</g>
				</svg>
			</div>
        );
    }

});

export default Radium (TreeGraph);
