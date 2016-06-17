import React from 'react';
import Dialog from 'material-ui/Dialog';
import CommentReply from './CommentReply.jsx'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import CommentList from './CommentList.jsx'
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

export default class Post extends React.Component{
	constructor(props){
		super(props);

	}


	render(){
		var title = this.props.title
		var content = this.props.content
		var author = this.props.author

			
		return (
			<div>
			<Card>
				
					
				<CardHeader
				title = {title}
				subtitle = {author}
				actAsExpander  = {true}
				showExpandableButton = {true}/>
			
			
				<CardText expandable = {true}>
					<Grid>
						<Row>
							{content}
						</Row>
						<Row>
							<Row start = 'xs'>
								<CommentList comments = {this.props.comments} />
							</Row>
						</Row>

					</Grid>
					
					
				</CardText>

				<CardActions expandable={true}>
			    </CardActions>

			    <Divider />
			</Card>
			</div>




		);
	}
}