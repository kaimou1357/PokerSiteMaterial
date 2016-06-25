import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommentReply from './CommentReply.jsx';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class CommentList extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		var commentList = [];
		this.props.comments.map(function(comment){
			commentList.push(
				<ListItem 
					disabled = {true} 
					primaryText = {comment.author} 
					secondaryText = {comment.content} 
					key = {comment.commentid} />
			)
		});



		return (
			<Grid>
				<Row start = 'xs'>
					<Subheader><b> Comments </b></Subheader>
				</Row>
				<Row start = "xs">
					<List>
						{commentList}
					</List>
				</Row>
			</Grid>

		);

	}
}