import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import Helmet from 'react-helmet';
import { AppNav, AppFooter } from 'components';
import { login, logout } from './actions';

require('../../../static/blueprint.scss');
require('../../../static/style.css');

export const App = React.createClass({
	propTypes: {
		appData: PropTypes.object,
		accountData: PropTypes.object,
		location: PropTypes.object,
		params: PropTypes.object,
		children: PropTypes.object,
		dispatch: PropTypes.func,
	},

	componentWillMount() {
		const FocusStyleManager = require('@blueprintjs/core').FocusStyleManager;
		FocusStyleManager.onlyShowFocusOnTabs();
		this.props.dispatch(login());
	},

	logoutHandler: function() {
		this.props.dispatch(logout());
	},

	render() {
		return (
			<StyleRoot>
				<Helmet 
					title="Fifty Nifty"  
					meta={[
						{ name: 'description', content: 'A simple tool testing' },
						{ property: 'og:title', content: 'Fifty Nifty Test' },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:description', content: 'A simple tool testing Fifty Nifty v3' },
						{ property: 'og:url', content: 'https://www.listoflinks.co/' },
						{ property: 'og:image', content: 'https://www.listoflinks.co/static/logo_large.png' },
						{ property: 'og:image:url', content: 'https://www.listoflinks.co/static/logo_large.png' },
						{ property: 'og:image:width', content: '500' },
						{ name: 'twitter:card', content: 'summary' },
						{ name: 'twitter:site', content: '@listoflinks' },
						{ name: 'twitter:title', content: 'List of Links' },
						{ name: 'twitter:description', content: 'A simple tool testing Fifty Nifty v3' },
						{ name: 'twitter:image', content: 'https://www.listoflinks.co/static/logo_large.png' },
						{ name: 'twitter:image:alt', content: 'Logo for List of Links' }
					]} 
				/> 
				<AppNav accountData={this.props.accountData} location={this.props.location} params={this.props.params} logoutHandler={this.logoutHandler} />
				<div style={{ minHeight: '600px' }}>{this.props.children}</div>
				<AppFooter />
			</StyleRoot>
		);
	},

});

function mapStateToProps(state) {
	return {
		appData: state.app.toJS(),
	};
}

export default connect(mapStateToProps)(App);

