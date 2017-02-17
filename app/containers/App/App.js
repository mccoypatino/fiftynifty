import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import Helmet from 'react-helmet';
import { AppNav, AppFooter } from 'components';

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
		window.variant = Math.ceil(Math.random() * 100);

		const localUserData = localStorage.getItem('userData');
		const localUser = localUserData && localUserData.length > 1 ? JSON.parse(localUserData) : {};
		if (window.location.hostname !== 'localhost' && localUser.id) {
			Raven.setUserContext({ userId: localUser.id });
		}
	},

	isProduction: function() {
		const hostname = window.location.hostname;
		if (hostname === 'www.fiftynifty.org') { return true; }
		return false;
	},

	render() {
		const devBannerStyle = {
			color: '#000',
			backgroundColor: '#ffd400',
			textAlign: 'center',
			fontSize: '1.5em',
			padding: '.5em 0em',
		};

		return (
			<StyleRoot>
				<Helmet 
					title="Fifty Nifty"  
					meta={[
						{ name: 'ROBOTS', content: this.isProduction() ? 'INDEX, FOLLOW' : 'NOINDEX, NOFOLLOW' },
						{ name: 'description', content: 'Play for a better Democracy' },
						{ property: 'og:title', content: 'Fifty Nifty' },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:description', content: 'Play for a better Democracy' },
						{ property: 'og:url', content: 'https://www.fiftynifty.org/' },
						{ property: 'og:image', content: 'https://www.fiftynifty.org/static/share-img.jpg' },
						{ property: 'og:image:url', content: 'https://www.fiftynifty.org/static/share-img.jpg' },
						{ property: 'og:image:width', content: '500' },
						{ property: 'fb:app_id', content: '375710412814285' },
						{ name: 'twitter:card', content: 'summary' },
						{ name: 'twitter:site', content: '@isTravis' },
						{ name: 'twitter:title', content: 'Fifty Nifty' },
						{ name: 'twitter:description', content: 'Play for a better Democracy' },
						{ name: 'twitter:image', content: 'https://www.fiftynifty.org/static/share-img.jpg' },
						{ name: 'twitter:image:alt', content: 'Fifty Nifty' },
					]} 
				/> 
				{!this.isProduction() &&
					<div style={devBannerStyle}>Development Mode</div>
				}
				<AppNav location={this.props.location} params={this.props.params} />
				<div style={{ minHeight: '600px' }}>{this.props.children}</div>
				<AppFooter />
			</StyleRoot>
		);
	},

});

export default App;
