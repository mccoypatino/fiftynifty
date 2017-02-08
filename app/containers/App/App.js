import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import Helmet from 'react-helmet';
import { AppNav, AppFooter } from 'components';
import Typekit from 'react-typekit';

require('../../../static/blueprint.scss');
require('../../../static/style.css');

export const App = React.createClass({
	propTypes: {
		location: PropTypes.object,
		params: PropTypes.object,
		children: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		const FocusStyleManager = require('@blueprintjs/core').FocusStyleManager;
		FocusStyleManager.onlyShowFocusOnTabs();
	},

	render() {
		return (
			<StyleRoot>
				<Helmet 
					title="Fifty Nifty"  
					meta={[
						{ name: 'description', content: 'Play for a better Democracy' },
						{ property: 'og:title', content: 'Fifty Nifty' },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:description', content: 'Play for a better Democracy' },
						{ property: 'og:url', content: 'https://www.fiftynifty.org/' },
						{ property: 'og:image', content: 'https://www.fiftynifty.org/static/american-flag.jpg' },
						{ property: 'og:image:url', content: 'https://www.fiftynifty.org/static/american-flag.jpg' },
						{ property: 'og:image:width', content: '500' },
						{ name: 'twitter:card', content: 'summary' },
						{ name: 'twitter:site', content: '@isTravis' },
						{ name: 'twitter:title', content: 'Fifty Nifty' },
						{ name: 'twitter:description', content: 'Play for a better Democracy' },
						{ name: 'twitter:image', content: 'https://www.fiftynifty.org/static/american-flag.jpg' },
						{ name: 'twitter:image:alt', content: 'Fifty Nifty' },
					]} 
					script={[
						{ src: "https://use.typekit.net/pwe2pin.js", type: "text/javascript" },
						{ type: 'text/javascript', innerHTML: `try{Typekit.load({ async: true });}catch(e){}` }
					]}
				/> 
				<Typekit kitId="pwe2pin" />
				<AppNav location={this.props.location} params={this.props.params} />
				<div style={{ minHeight: '600px' }}>{this.props.children}</div>
				<AppFooter />
			</StyleRoot>
		);
	},

});

export default App;
