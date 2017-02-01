import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Radium from 'radium';

let styles;

export const UserNode = React.createClass({
	propTypes: {
		node: PropTypes.object,
	},

	render() {
		const node = this.props.node || {};
		const children = node.children || [];
		return (
			<div style={styles.container}>
				<Link to={`/${node.id}`}>{node.name}</Link>

				{children.map((child)=> {
					return <WrappedUserNode key={child.id} node={child} />;
				})}				
			</div>
		);
	}
});

const WrappedUserNode = Radium(UserNode);
export default Radium(UserNode);

styles = {
	container: {
		paddingLeft: '1em',
	},
		
};
