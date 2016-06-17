import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommentReply from './CommentReply.jsx';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class CommentList extends React.Component{
	constructor(props){
		super(props)

	}

	handleCommentSubmit(comment){
		//make the POST request here.
		//handle the comment submit here and refresh the list of comments.
	}

	render(){
		var commentList = [];
		

		this.props.comments.map(function(comment){
			commentList.push(<ListItem disabled = {true} primaryText = {comment.author} secondaryText = {comment.content} key = {comment.commentID} />)
		});



		return (
			<Grid>
				<Row start = 'xs'>
					<Subheader><b> Comments </b></Subheader>
				</Row>
				<Row start = "xs">
					{commentList}
				</Row>
				<Row start = 'xs'>
					
					<CommentReply onCommentSubmit = {this.handleCommentSubmit} />
					
					
				</Row>

			</Grid>

		);

	}
}