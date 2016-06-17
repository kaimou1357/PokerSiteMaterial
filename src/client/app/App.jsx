import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main.jsx'; // Our custom react component

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render

let POSTS = [
	{id : 0, title : "What to do with QQ preflop?", author : "Kai Mou", content : "Got wrecked by AA", comments : [{author: "Lei Chen", content : "You should have folded this hand a long time ago pre"}]},
	{id : 1, title : "KK Cracked by AA", author : "Leeroy Mou", content : "I hate dogs.", comments : [{author: "Lei Chen", content : "You should have folded this hand a long time ago pre"}]},



]
render(<Main hands = {POSTS}/>, document.getElementById('app'));