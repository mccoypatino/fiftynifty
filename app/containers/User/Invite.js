import React, { PropTypes } from 'react';
import {
    ShareButtons,
    generateShareIcon,
} from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
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
    getInitialState() {
        return {copied: false};
    },

    render() {
        const shareUrl = this.props.url;
        const title = "Join the Fifty Nifty Game!";

        return (
            <div style={styles.sectionBackground}>
            <div style={styles.inviteSection}>
                <div style={styles.inviteHeader}>Invite</div>
                <p>Invite people to join your network by joining Fifty Nifty with this link:</p>
                <p style={styles.inviteLink}><a href={shareUrl}>{shareUrl}</a></p>
                <CopyToClipboard style={styles.copyButton} text={shareUrl}
                                 onCopy={() => this.setState({copied: true})}>
                    <a role="button" className="pt-button pt-minimal"><span className="pt-icon-clipboard"/> Copy to clipboard</a>
                </CopyToClipboard>
                <div>
                <div style={styles.network}>
                    <FacebookShareButton
                        url={shareUrl}
                        title={title}>
                        <FacebookIcon
                            size={56}
                            round />
                    </FacebookShareButton>
                </div>
                <div style={styles.network}>
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}>
                        <TwitterIcon
                            size={56}
                            round />
                    </TwitterShareButton>
                </div>

                <div style={styles.network}>
                    <GooglePlusShareButton
                        url={shareUrl}>
                        <GooglePlusIcon
                            size={56}
                            round />
                    </GooglePlusShareButton>
                </div>
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
        margin: '1em 1em',
        opacity:'1'
    },
    sectionBackground: {
        backgroundColor:'#003c58',
        opacity: '0.8',
    },
    inviteSection: {
        textAlign: 'center',
        color:'white',
        opacity:'1'
    },
    inviteHeader: {
        fontSize:'2em',
        paddingBottom:'0.5em',
        fontWeight:'bold',
        color:"#ffc15e"
    },
    inviteLink: {
        fontWeight:'bold',
        fontSize:'1.2em',

    },
    copyButton: {
        color:"#d9d9d9",
    }
};
