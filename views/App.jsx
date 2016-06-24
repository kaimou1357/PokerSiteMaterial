import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main.jsx'; // Our custom react component
import PostDetail from './Components/PostDetail.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Router, Route, Link, browserHistory } from 'react-router';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


// Needed for onTouchTap
injectTapEventPlugin();
// http://stackoverflow.com/a/34015469/988941


// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

let POSTS = [
			{id : 0, title : "What to do with QQ preflop?", author : "Kai Mou", content : "Got wrecked by AA", comments : [{author: "Lei Chen", content : "You should have folded this hand a long time ago pre"}]},
			{id : 1, title : "KK Cracked by AA", author : "Leeroy Mou", content : "I hate dogs.", comments : [{author: "Lei Chen", content : "You should have folded this hand a long time ago pre"}]},
		]

render(
	<div>
	<MuiThemeProvider 
		muiTheme = {getMuiTheme(lightBaseTheme)}>
		<Router history = {browserHistory}>
			<Route path = "/" component = {Main} hands = {POSTS} />
			<Route path = "/hands" component = {PostDetail} /> 
		</Router>
	</MuiThemeProvider>
	</div>
	
,document.getElementById('app'))
