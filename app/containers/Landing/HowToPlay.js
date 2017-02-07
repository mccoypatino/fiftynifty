import React, { PropTypes } from 'react';
import Radium from 'radium';

let styles;

export const HowToPlay  = React.createClass({
    render() {
        return(
        <div style={styles.section}>
            <div style={styles.content}>
            <div style={styles.sectionHeader} id="howToPlay">How to Play</div>
            <div style={styles.iconsTable}>
                <div style={styles.howToPlaySection}>
                    <img src={"static/Icon1.png"}/>
                    <div>
                        Join the challange by
                        filling in your details. This
                        way we can tell you who
                        your local senators are.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    <img src={"static/Icon2.png"}/>
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
                    <img src={"static/Icon3.png"}/>
                    <div>
                        Share the link with your friends in other states, when someone in you network does the same, you get the points.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    <img src={"static/Icon4.png"}/>
                    <div>
                        When you get someone from all 50 states make a call, you win!
                    </div>
                </div>
            </div>
            <p style={styles.learnMore}><button style={{color:'white'}} type="button" className="pt-button pt-minimal pt-icon-add" >Learn More</button></p>
            </div>
            </div>)
    }
});

export default Radium(HowToPlay);


styles = {
    section: {
        backgroundColor:"#003d59",
        padding: '2em 1em',
        margin: '0 auto',
        backgroundSize:'cover',
        fontWeight: 'lighter',
    },
    sectionHeader: {
        fontSize: '2em',
        fontWeight: 'lighter',
        marginBottom: '1.5em',
        textAlign:'center',
        color:'white',
        letterSpacing:'0.1em',
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
        padding: '1em',
        color:'white',
    },
    learnMore: {
        textAlign:'center',
        color:'white',
        padding:'1em',
    },
    content:{
        maxWidth:'800px',
        margin: '0 auto',
    },
};