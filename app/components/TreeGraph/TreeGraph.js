import * as d3 from 'd3';
import React, { PropTypes } from 'react';
import Radium from 'radium';
import ReactDOM from 'react-dom';
import statesDefaults from 'components/ProgressMap/states-defaults';
import chroma from 'chroma-js';

export const TreeGraph = React.createClass({

	diagonal: function(d) {
		return 'M' + d.source.x + ',' + d.source.y
            + 'C' + (d.source.x + d.target.x) / 2 + ',' + d.source.y
            + ' ' + (d.source.x + d.target.x) / 2 + ',' + d.target.y
            + ' ' + d.target.x + ',' + d.target.y;
	},

	nameToInitials: function(name) {
		return name ? name.split(' ').map((word)=>{ return word[0]; }).join('') : '';
	},

	componentDidMount() {
		const width = ReactDOM.findDOMNode(this.refs.treeContainer).clientWidth;
		this.setState({ treeWidth: width });
	},
	componentWillMount() {
		this.tooltip = ReactDOM.findDOMNode(this.refs.tooltip);
	},
	colorMap: chroma.scale('Spectral').colors(50),

	render() {
		const containerWidth = this.state.treeWidth ? this.state.treeWidth : 0;
		const css = `
					.link {
					fill: none;
					stroke: #E0E0E0;
					stroke-opacity: 1;
					stroke-width: 1.5px;
				}
				    .addFriendsText {
				    
				    color: white;
				    padding: 0.5em 2em;
				    
				    }
				    
				`;
		const { data, isGlobal } = this.props;

		const treeData = d3.hierarchy(data);
		const containerHeight = (treeData.height + 1) * 50;
		const treeLayout = d3.tree()
            .size([containerWidth - 50, containerHeight - 50]);
		const root = treeLayout(treeData);
		const nodesList = this.nodesList = root.descendants();
		const linksList = this.linksList = root.links();

		/* render the nodes */
		const nodes = nodesList.map(node => {
            // get color by state
			const fillColor = this.colorMap[Object.keys(statesDefaults).indexOf(node.data.state)] || '#d9ccc6';
			return (
                node.data.id &&
				<g
key={node.data.id} className="node"
				   transform={`translate(${node.x}, ${node.y})`}>
					<circle r="7" style={{ fill: `${fillColor}`, stroke: 'none' }} />
                    <a href={`/${node.data.id}`}>
                        <text y="2pt" fontSize="6pt" fontFamily="sans-serif" textAnchor="middle">{this.nameToInitials(node.data.name)}</text>
                    </a>
                    <title>{node.data.name} {node.data.state}</title>
				</g>
			);
		});

		/* render the links */
		const links = linksList.map(link => {
			return (
				<path
key={`${link.source.data.id}-${link.target.data.id}`} className="link"
					  d={this.diagonal(link)} fill="none" stroke="#E0E0E0" strokeOpacity="1" strokeWidth="1.5px" />
			);
		});
		return (
			<div ref="treeContainer" height={containerHeight} width={'100%'}>
				<style>
                    {css}
				</style>
                {!isGlobal &&
                <div className={'addFriendsText'}>
                    Add your friends by sending them invites! you get points for any call they make!
                </div>
                }

				<svg height={containerHeight} width="100%">
                <g transform={'translate(25,25)'}>
                        {links}
                        {nodes}
                </g>
				</svg>
			</div>
		);
	}

});

export default Radium(TreeGraph);
