import React from 'react';
import { Link, browserHistory } from 'react-router';

let styles;

export const LearnMore = React.createClass({

    render() {
        return (
            <div style={styles.more}>
                <div style={styles.container}>
                    <div>
                        <h3 style={styles.title}>How to Play and Win</h3>
                        <p>This is a challenge to get friends to participate in democracy by making calls to congresspeople in all 50 states.  <a  style={styles.link}  href="#calls">Live phone calls </a>are the best way to directly express your opinion on an issue to your elected officials. Your mission is to pass this along to friends who will make calls and also pass the message/link along to others who will do the same.  It's a social chain letter and a call to action for a better participatory democracy.  We'll help you make the call and express your message.
                        </p>
                        <p>
                            The winners are the first ten chains to reach 50 states and accumulate the most challenge points.  You get 250 points for making a call, 125 points for a call that your friend makes, 65 points for the call their friend makes, on and on.  Everyone on the chain earns points.
                        </p>
                        <p>Points count for your first call to each of your two senators and your representative. You also get points for every person in your chain who makes calls.  If 25 of your immediate friends in a state each make one call, you get 3150 points.  If they each make three, you get almost 10,000 points just from friends once-removed.  They also get points.  You get a bonus for a "grand slam" -- a network that reaches all 435 representatives and 100 senators.
                        </p>
                        <p>There is a leaderboard so you can track how you are doing.  We will send you a progress text each morning if you like.  You can also see how much of the country your chain is covering.
                        </p>
                        <p>This is an experiment started by the Viral Communications Group at the MIT Media Lab.  We are operating the challenge and posting the scores.  Our goal is to inspire as many people as possible to take an active role in government by mobilizing their social network.  The prize is bragging rights and a head start on the next challenge.  MIT and the Media Lab have no position on the issues we present or those you choose to express to your congresspeople.
                        </p>
                        <div>
                            <Link to={"/"}><button className={"pt-button pt-intent-primary pt-fill"}>Join The Game</button></Link>
                        </div>

                        <small><p> Hints and a guide</p>
                            <p>To play, sign up above, make calls, and pass the note to friends by sending the link in email, via facebook, or tweet it to your followers.  Check your profile to tell us whether you would like progress notifications.  We presented an issue that we hope you care about, but you are encouraged to say whatever you like.</p>
                            <p>
                                You sign up with a name that you'd like your friends to see, and a zip code and a phone number.  If we can't figure out who your rep is, we'll ask for an address.  Click the button and we'll make the call to connect you.  That's how we keep score. This is an MIT Media Lab research program being done by Andrew Lippman in the Viral Communications Group to understand the propagation of social activities through social networks.  Your participation is voluntary and there is no compensation for joining.  We will not use any personally identifiable information in our research.  Anything you enter will be encrypted before storage.  We ask that you use a name or nickname so that people you invite can see who it came from.  We also use your name so you can track the progress of your network on the map. You have the option of supressing that information.  We will never present results of our research in a way that allows you to be identified and we will destroy any personal information at the conclusion of the challenge.</p><em>
                                <p>We welcome your feedback: <a href={'mailto:fiftynifty@media.mit.edu'} style={styles.link}>Contact us at fiftynifty@media.mit.edu</a>
                                </p>
                            </em></small>

                    </div>

                    <div id="calls">
                        <h3 style={styles.title}>Calls Matter</h3>
                        <p>Democracy works because you elect people to act on your behalf. Congress knows what you want by your vote, by polling, and by your telling them directly. But they don't poll on every issue, and a poll is not as accurate as your personal expression. You can write, email, or phone. Of these, a live phone call from a constituent during business hours gets the most attention. Your call will be answered, most likely by a staffer whose job is to listen. When you talk directly to them, they report that to the congressman. As you talk to them, your point becomes clearer. If you leave a message, it is totaled and they get a summary.</p>
                        <p>Elected officials keep a record of elegible and active voters in their district or state. That's why you should give your name and address. Your call demonstrates your willingness to act on your opinions. Even if you didn't vote, you are heard because once you make the effort to call, you are more likely to make the effort to vote. Your call matters as much as a cash contribution.</p>
                        <p>When you call, you are making democracy work better, more responsibly, and more responsively. You may worry that money counts a lot, but in the end, it's the votes that actually put people in office. The goal of this challenge is to multiply your individual message by the power of your friends, and their friends. We want to show that a network can be more powerful than any other message they get. A network of citizens is what democracy is all about.</p>
                        <p>Calls work! And they're easy to do. We'll help make it even easier.</p>

                        <p>You may think that it's impossible to pass a message to someone in every state. It's far easier than you think. Some studies have shown that everyone is only an average of six people away from anyone else. A psychologist <a style={styles.link} target={"_blank"} href="https://en.wikipedia.org/wiki/Six_degrees_of_separation"> tested this in the 1960's by asking people to get a letter to someone they didn't know, by sending it to someone they did.</a> For a while there was a lot of buzz about your "Bacon Number". That number told how many people you were away from Kevin Bacon. It's also called "The Small World Problem". You can meet the challenge!</p>

                            {/*Add Red Balloon challenge note*/}

                        <p>Remember the challenge! 50 calls in 50 states. Multiplied by all of us.</p>
                    </div>
                    <div>
                        <Link to={"/"}><button className={"pt-button pt-intent-primary pt-fill"}>Join Now</button></Link>
                    </div>
                </div>
            </div>
        );
    }
});


export default LearnMore;

styles = {
    more: {
        backgroundColor: "#003d59",
        color: 'white',
        fontWeight: 'lighter',
    },
    container: {
        padding: 'calc(115px + 2em) 2em 3em',
        maxWidth: '1024px',
        margin: '0 auto',
        zIndex: 2,
        position: 'relative',
        display: 'block'
    },
    link: {
        color: '#ff6f70'
    },
    title: {
        fontSize: '2em',
        fontWeight: 'lighter',
        padding: '1em 0',
        color: 'white',
        letterSpacing: '0.1em',
    },
};