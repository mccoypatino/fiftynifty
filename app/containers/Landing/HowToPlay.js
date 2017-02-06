import React, { PropTypes } from 'react';
import Radium from 'radium';

let styles;

export const HowToPlay  = React.createClass({
    render() {
        return(
        <div style={styles.section}>
            <div style={styles.sectionHeader} id="howToPlay">How to Play</div>
            <div style={styles.iconsTable}>
                <div style={styles.howToPlaySection}>
                    <span className="pt-icon-large pt-icon-manually-entered-data"></span>
                    <div>
                        Join the challange by
                        filling in your details. This
                        way we can tell you who
                        your local senators are.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    <span className="pt-icon-large pt-icon-phone"></span>
                    <div>
                        Call your local senator
                        and talk to them about
                        the political issues you
                        have.
                    </div>
                </div>
            </div>
            <div style={styles.iconsTable}>
                <div style={styles.howToPlaySection}>
                    <span className="pt-icon-large pt-icon-graph"></span>
                    <div>
                        Share the link with your friends in other states, when someone in you network does the same, you get the points.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    <span className="pt-icon-large pt-icon-globe"></span>
                    <div>
                        When you get someone from all 50 states make a call, you win!
                    </div>
                </div>
            </div>
        </div>)
    }
});

export default Radium(HowToPlay);


styles = {
    section: {
        padding: '2em 1em',
        maxWidth: '1024px',
        margin: '0 auto',
    },
    sectionHeader: {
        fontSize: '2em',
        fontWeight: '600',
        marginBottom: '1.5em',
        textAlign:'center',
        //color:'white'
    },
    iconsTable: {
        display:'table',
        width:'100%',
        textAlign:'center'
    },
    howToPlaySection: {
        display:'table-cell',
        width:'40%',
        textAlign:'center',
        padding: '1em'
    }
};