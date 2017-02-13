import React from 'react';
import Radium from 'radium';

let styles;

export const Song = React.createClass({
	
	render() {
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					<iframe style={styles.video} src="https://www.youtube.com/embed/b7jv7H4TGXc" frameBorder="0" allowFullScreen />
					<iframe style={styles.video} src="https://www.youtube.com/embed/Z2Gqe3doat0" frameBorder="0" allowFullScreen />
					<iframe style={styles.video} src="https://www.youtube.com/embed/6XkTl4LFzCY" frameBorder="0" allowFullScreen />
					<iframe style={styles.video} src="https://www.youtube.com/embed/sxr6NFimibY" frameBorder="0" allowFullScreen />
					<iframe style={styles.video} src="https://www.youtube.com/embed/Lju29keIRuc" frameBorder="0" allowFullScreen />
				</div>
				
			</div>
		);
	}
});

export default Radium(Song);

styles = {
	container: {
		backgroundColor: "#003d59",
        color: 'white',
        zIndex: 2,
        position: 'relative',
	},
	content: {
		padding: 'calc(175px + 2em) 0em 3em',
        maxWidth: '600px',
        margin: '0 auto',
	},
	video: {
		width: '100%',
		height: '337px',
		marginBottom: '2em',
	}
};
