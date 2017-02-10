import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
let styles;

export const HowToPlay  = React.createClass({

    propTypes: {
        localUser: PropTypes.object,
    },

    render() {
        return(
        <div style={styles.section}>
            <div style={styles.content}>
            <div style={styles.sectionHeader} id="howToPlay">How to Play</div>
            <div style={styles.iconsTable}>
                <div style={styles.howToPlaySection}>
                    {/*this should link to settings on the user page when we have settings*/}
                    {this.props.localUser.id && <Link to={`/${this.props.localUser.id}`}><img src={"static/Icon1.png"}/></Link>}
                    {!this.props.localUser.id &&  <Scrollchor to="#join"><img src={"static/Icon1.png"}/></Scrollchor>}
                    <div>
                        Join the challenge by
                        filling in your details. This
                        way we can tell you who
                        your local senators are.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    {this.props.localUser.id && <Link to={`/${this.props.localUser.id}`}><img src={"static/Icon2.png"}/></Link>}
                    {!this.props.localUser.id &&  <Scrollchor to="#join"><img src={"static/Icon2.png"}/></Scrollchor>}
                    <div>
                        Call your Representative or Senator and talk
                        to them about an issue you choose.
                    </div>
                </div>
            </div>
            <div style={styles.iconsTable}>
                <div style={styles.howToPlaySection}>
                    {this.props.localUser.id && <Scrollchor to="#invite"><img src={"static/Icon3.png"}/></Scrollchor>}
                    {!this.props.localUser.id && <Scrollchor to="#join"><img src={"static/Icon3.png"}/></Scrollchor>}
                    <div>
                        Share the link with your friends in other states, when someone in your network does the same, you get the points.
                    </div>
                </div>
                <div style={styles.howToPlaySection}>
                    <Link to={"/leaderboard"}><img src={"static/Icon4.png"}/></Link>
                    <div>
                        When you get someone from all 50 states to make a call, you win!
                    </div>
                </div>
            </div>
                <Link to={'/more'}>
            <p style={styles.learnMore}><button style={{color:'white'}} type="button" className="pt-button pt-minimal pt-icon-add" >Learn More</button></p>
                </Link>
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