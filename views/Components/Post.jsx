import React from 'react';
import Dialog from 'material-ui/Dialog';
import CommentReply from './CommentReply.jsx'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CommentList from './CommentList.jsx'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import {ListItem} from 'material-ui/List';
import { browserHistory } from 'react-router';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class Post extends React.Component{
	constructor(props){
		super(props);
		this.openPost = this.openPost.bind(this)

	}

	openPost(e){
		//render the component with the correct hand ID. 
		browserHistory.push('/hands/')
	}


	render(){
		var title = this.props.title
		var author = this.props.author

			
		return (
			<div>
				<ListItem
					primaryText = {title}
					onTouchTap = {this.openPost}
					secondaryText = {author} />
				<Divider inset = {true} />
			</div>
			

				
			




		);
	}
}