import React from 'react';
import { Link } from 'react-router';

let styles;

export const AppFooter = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<a href={'mailto:fiftynifty@media.mit.edu'} className={'link'} style={styles.item}>Contact us at fiftynifty@media.mit.edu</a>
			</div>
		);
	}

});

export default AppFooter;

styles = {
	container: {
		borderTop: '1px solid #888',
		marginBottom: '1em',
		paddingTop: '1em',
		textAlign: 'center',
	},
	item: {
		display: 'inline-block',
		padding: '0em 1em',
		color: '#888',
		fontSize: '0.9em',
	},
};
