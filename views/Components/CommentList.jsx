import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CommentReply from './CommentReply.jsx';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class CommentList extends React.Component{
	constructor(props){
		super(props)
		this.state = {comments : []}
	}
	
	componentDidMount(){
		$.ajax({
	   	    url: "/api/comments",
		    success: function(response) {
		        this.setState({comments: response})
		    }.bind(this),
		    error: function(xhr) {
		        console.log("GET request to retrieve hand failed.")
		    }.bind(this)
		});
	}
	
	handleCommentSubmit(comment){
		//make the POST request here.
		//handle the comment submit here and refresh the list of comments.
	}

	render(){
		var commentList = [];
		this.state.comments.map(function(comment){
			commentList.push(
				<ListItem 
					disabled = {true} 
					primaryText = {comment.author} 
					secondaryText = {comment.content} 
					key = {comment.commentId} />
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
				<Row start = 'xs'>
					<CommentReply onCommentSubmit = {this.handleCommentSubmit} />
				</Row>
			</Grid>

		);

	}
}