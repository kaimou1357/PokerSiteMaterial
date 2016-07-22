import React from 'react';
import CommentList from './CommentList.jsx'
import CommentReply from './CommentReply.jsx'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class PostDetail extends React.Component{
	constructor(props){
		//need title, author, content and CommentList.
		super(props)
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
		this.getCurrentUser = this.getCurrentUser.bind(this)
		this.state = {postid : props.params.postid, title : '', content : '', author : '', comments : [], currentUser : ''}

	}

	loadHandFromServer(){
		$.ajax({
	   	    url: "/api/hands?handid=" + this.props.params.postid,
		    success: function(response) {
		        this.setState({title: response.title, author: response.author})
		    }.bind(this),
		    error: function(xhr) {
		        console.log("GET request to retrieve hand failed.")
		    }.bind(this)
		});
	}

	getCurrentUser(){
		$.ajax({
	     	url: "/username",
	        type: "GET",
	        contentType : "application/json",
	        success: function(response){
	          this.setState({currentUser : response.username})


	        }.bind(this), 
	        error:function(xhr){
	          console.log("GET request to retrieve username failed")
	        }.bind(this)
    	});
	}

	loadCommentsFromServer(){
		$.ajax({
	   	    url: "/api/comments?postid=" + this.state.postid,
		    success: function(response) {
				this.setState({comments: response})
			}.bind(this),
		    error: function(xhr) {
		        console.log("GET request to retrieve comments for hand failed.")
		    }.bind(this)
		});
	}

	handleCommentSubmit(comment){
		//Makes a post request to submit a comment and then updates the commentlist.
		$.ajax({
			url: "/api/comments",
		    type: "POST",
		    dataType : 'json',
		    contentType : "application/json",
		    data: JSON.stringify(comment),
		    success: function(response){
		  	  this.setState({comments : response})
		    }.bind(this), 
		    error:function(xhr){
		    	console.log("POST request to add comment failed")
		    }.bind(this)
		});
	}

	componentDidMount(){
		this.getCurrentUser()
		this.loadHandFromServer()
		this.loadCommentsFromServer()
		this.intervalFunction = setInterval(this.loadCommentsFromServer, 5000)
	}


	componentWillUnmount(){
		//unsubscribe from the interval so it doesn't call setstate on unrendered components.
		clearInterval(this.intervalFunction)
	}

	render(){
		let replyButton
		if(this.state.currentUser){
			replyButton = <CommentReply onCommentSubmit = {this.handleCommentSubmit} postid = {this.state.postid} currentUser = {this.state.currentUser} />
		}
		
		return(
			<div>
				<Grid>
					<Row start = "xs">
						<Col xs = {12}>
							<Card>
							    <CardHeader
							      title={this.state.title}
							      subtitle={this.state.author}
							      showExpandableButton={false}
							    />
							    <CardText>
							      {this.state.content}
							    </CardText>
						    
							</Card>
						</Col>
						
					</Row>
					
					<CommentList 
						postid = {this.state.postid}
						comments = {this.state.comments}
					/>
					
					{replyButton}

				</Grid>
				
			</div>

		);
			
			

			

		
		}
}

