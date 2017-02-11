import React from 'react';
import Radium from 'radium';


let styles;

export const Song = React.createClass({
	
	loadVideo: function(video) {
		this.setState({ [video]: true });
	},

	render() {
		const videos = ['b7jv7H4TGXc', 'Z2Gqe3doat0', 'sxr6NFimibY', 'Lju29keIRuc', '6XkTl4LFzCY'];
		return (
			<div style={styles.container}>
				<div style={styles.content}>
					{videos.map((video, index)=> {
						return (
							<div style={styles.videoWrapper} key={`video-${index}`}>
								<img style={styles.thumbnail} alt={video} src={`https://img.youtube.com/vi/${video}/sddefault.jpg`} onClick={this.loadVideo.bind(this, video)} />

								<div style={styles.playButton}>
									PLAY
								</div>

								{this.state[video] &&
									<iframe style={styles.iframe} src={`https://www.youtube.com/embed/${video}?autoplay=1`} frameBorder="0" allowFullScreen />
								}
								
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
		width: '100%',
		height: '337px',
		position: 'relative',
	},
	thumbnail: {
		width: '100%',
		height: '100%',
		zIndex: 2,
		position: 'relative',
		cursor: 'pointer',
	},
	playButton: {
		position: 'auto',
		height: '48px',
		width: '68px',
		position: 'absolute',
		lineHeight: '48px',
		textAlign: 'center',
		top: '148px',
		left: 'calc(50% - 35px)',
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		borderRadius: '3px',
		zIndex: 3,
		pointerEvents: 'none',
	},
	iframe: {
		position: 'absolute',
		top: 0,
		left: 0,
		zIndex: 5,
		width: '100%',
		height: '100%',
	},
};
