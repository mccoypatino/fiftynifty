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
        return name? name.split(' ').map((word)=>{return word[0]}).join(''): '';
	},

    showToolTip: function(evt){
	    if (this.tooltip) {
            this.tooltip.setAttributeNS(null, "x", evt.clientX - 8);
            this.tooltip.setAttributeNS(null, "y", evt.clientY - 5);
            this.tooltip.setAttributeNS(null, "visibility", "visible");
        }
    },
    hideToolTip: function() {
        if (this.tooltip) {
            this.tooltip.setAttribute(null, "visibility", "hidden")
        }

    },

    componentWillMount() {
        this.tooltip =ReactDOM.findDOMNode(this.refs.tooltip);
    },

    render() {
        const css = `
					.node text {
					font: 5pt sans-serif;
				}
					.node--internal text {
					text-shadow: 0 1px 0 #fff, 0 -1px 0 #fff, 1px 0 0 #fff, -1px 0 0 #fff;
				}
					.link {
					fill: none;
					stroke: #E0E0E0;
					stroke-opacity: 1;
					stroke-width: 1.5px;
				}
				`;
        const { data } = this.props;

        const treeData = d3.hierarchy(data);
        const containerWidth = 600;
        const containerHeight = treeData.height*50;
        const treeLayout = d3.tree()
            .size([containerWidth-50, containerHeight-50]);
        const root = treeLayout(treeData);
        const nodesList = this.nodesList = root.descendants();
        const linksList = this.linksList = root.links();

		/* render the nodes */
        const nodes = nodesList.map(node => {
            // get color by state
            const randColor = Math.random()*360;
            return (
                node.data.id &&
				<g key={node.data.id} className="node"
				   transform={`translate(${node.x}, ${node.y})`}>
					<circle r="6" style={{fill:`hsl(${randColor},50%, 80%)`, stroke:'grey', strokeWidth:'0.5px'}}
                        onMouseMove={this.showToolTip(event)} onMouseOut={this.hideToolTip()} />
                    <a href={`/${node.data.id}`}>
                        <text y="2pt" textAnchor="middle">{this.nameToInitials(node.data.name)}</text>
                    </a>
                    <title>{node.data.name} {node.data.state}</title>
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

				<svg height={containerHeight} width='100%'>
                <g transform={'translate(10,10)'}>
                        {links}
                        {nodes}
                </g>
                    {/*<text className="tooltip" id="tooltip"*/}
                          {/*x="0" y="0" visibility="hidden" ref="tooltip">Tooltip</text>*/}
				</svg>
			</div>
        );
    }

});

export default Radium (TreeGraph);
