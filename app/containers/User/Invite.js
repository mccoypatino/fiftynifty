import React, { PropTypes } from 'react';
import {
    ShareButtons,
    generateShareIcon,
} from 'react-share';
import Radium from 'radium';

let styles;

const {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');


export const Invite = React.createClass({
    propTypes: {
        shareUrl: PropTypes.string
    },

    render() {
        const shareUrl = this.props.url;
        const title = "Join the Fifty Nifty Game!";

        return (
            <div>
                <p>Invite people to join your network by joining Fifty Nifty with this link:</p>
                <p><a href={shareUrl}>{shareUrl}</a></p>
                <div>
                <div style={styles.network}>
                    <FacebookShareButton
                        url={shareUrl}
                        title={title}>
                        <FacebookIcon
                            size={32}
                            round />
                    </FacebookShareButton>
                </div>
                <div style={styles.network}>
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}>
                        <TwitterIcon
                            size={32}
                            round />
                    </TwitterShareButton>
                </div>

                <div style={styles.network}>
                    <GooglePlusShareButton
                        url={shareUrl}>
                        <GooglePlusIcon
                            size={32}
                            round />
                    </GooglePlusShareButton>
                </div>
                </div>
            </div>
        );
    },
});

export default Radium(Invite);

styles = {
    network: {
        display: 'inline-block',
        textAlign: 'center',
        marginRight: '2em',
    },
};
