import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Post from './Post.jsx';

export default class PostList extends React.Component{
	constructor(props){
		super(props)

	}

	render(){
		var posts = [];
		this.props.hands.map(function(hand){
			posts.push(
				<Post 
					title = {hand.title} 
					author = {hand.author} 
					key = {hand.postid} 
					id = {hand.postid} />
			)
		});
		return (
			<List>
		      {posts}
		    </List>

		);

	}


}
