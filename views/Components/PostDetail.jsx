import React from 'react';
import CommentList from './CommentList.jsx'
import CommentReply from './CommentReply.jsx'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class PostDetail extends React.Component{
	constructor(props){
		//need title, author, content and CommentList.
		super(props)
		this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
		this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this)
		this.state = {postid : props.params.postid, title : '', content : '', author : '', comments : []}

	}

	loadHandFromServer(){
		$.ajax({
	   	    url: "/api/hands?handid=" + this.props.params.postid,
		    success: function(response) {
		        this.setState({title: response.title, content : response.content, author: response.author})
		    }.bind(this),
		    error: function(xhr) {
		        console.log("GET request to retrieve hand failed.")
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
		        console.log("GET request to retrieve hand failed.")
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
		this.loadHandFromServer()
		this.loadCommentsFromServer()
		this.intervalFunction = setInterval(this.loadCommentsFromServer, 5000)
	}

	componentWillUnmount(){
		//unsubscribe from the interval so it doesn't call setstate on unrendered components.
		clearInterval(this.intervalFunction)
	}

	render(){
		return(
			<div>
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
				<CommentList 
					postid = {this.state.postid}
					comments = {this.state.comments}
					onCommentSubmit = {this.handleCommentSubmit}
					/>
				<CommentReply 
					onCommentSubmit = {this.handleCommentSubmit}
					postid = {this.state.postid}

				 />
			</div>

		);
			
			

			

		
		}
}

