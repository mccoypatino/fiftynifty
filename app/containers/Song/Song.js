import React from 'react';
import Radium from 'radium';
import YouTube from 'react-youtube';

let styles;

export const Song = React.createClass({
	getInitialState() {
		return {
			activeLoading: 3,
		};
	},

	renderNext: function() {
		this.setState({ activeLoading: this.state.activeLoading + 1 });
	},

	render() {
		const opts = { height: '337px', width: '100%'};
		const videos = ['b7jv7H4TGXc', 'Z2Gqe3doat0', 'sxr6NFimibY', 'Lju29keIRuc', '6XkTl4LFzCY'];
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					{videos.filter((video, index)=> {
						return index <= this.state.activeLoading;
					}).map((video, index)=> {
						return (
							<div style={styles.videoWrapper} key={`video-${index}`}>
								<YouTube videoId={video} opts={opts} onReady={this.renderNext} />
							</div>
						);
					})}
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
        minHeight: '100vh',
	},
	content: {
		padding: 'calc(175px + 2em) 0em 3em',
        maxWidth: '600px',
        margin: '0 auto',
	},
	videoWrapper: {
		marginBottom: '2em',
	},
};
