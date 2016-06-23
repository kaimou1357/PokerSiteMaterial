import React from 'react';
import CommentList from './Components/CommentList.jsx'
import CommentReply from './Components/CommentReply.jsx'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


export default class PostDetail extends React.Component{
	constructor(props){
		//need title, author, content and CommentList.
		super(props)
		this.state = {title : '', content : '', author : ''}

	}

	componentDidMount(){
		$.ajax({
	   	    url: "/api/hands",
		    
		    success: function(response) {
		        this.setState({title: response.title, content : response.content, author: response.author})
		    }.bind(this),
		    error: function(xhr) {
		        console.log("GET request to retrieve hand failed.")
		    }.bind(this)
		});
	}

	render(){
		//render a card view with the approrpriate title/author/content. 
		return(
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

		);
			
			

			

		
		}
}

