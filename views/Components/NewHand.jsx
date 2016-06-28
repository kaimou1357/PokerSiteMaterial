import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

const newHandStyle = {
	width : '80%',
	maxWidth : 'none',
	maxHeight : 'none',
	height : '80%',
}

export default class NewHand extends React.Component{
	constructor(props){
		super(props)
		this.state = {open: false}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen(){
		this.setState({open:true})
	}
	handleClose(){
		this.setState({open:false})
	}

	onSubmit(e){
		console.log('Submitted')
	}


	render(){	
		const actions = [
			 <FlatButton
		        label="Login"
		        primary={true}
		        keyboardFocused={true}
		        onTouchTap={this.onSubmit.bind(this)}
	      	 />,
		      <FlatButton
		      	label = "Cancel"
		      	primary = {true}
		      	keyboardFocused = {true}
		      	onTouchTap = {this.handleClose}
		      />	
		];

		return(
			<div>
				<RaisedButton 
					label = "New Hand"
					onTouchTap = {this.handleOpen}
				/>
				<Dialog
					title = "New Hand Form"
					actions = {actions}
					contentStyle = {newHandStyle}
					modal = {false}
					open = {this.state.open}
					onRequestClose = {this.handleClose}>
					<Grid>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {4}>
										<b>Table Information</b>
										<br></br>
										<TextField
											hintText = "Hero Stack Size"
										/>
										<TextField
											hintText = "Villain Stack Size"
										/>	
									</Col>

									<Col xs = {4}>
										<TextField
											hintText = "Hero Table Image"
										/>
										<TextField
											hintText = "Villain Table Image"
										/>
									</Col>

									<Col xs = {4}>
										<TextField
											hintText = "Hero Position"
										/>
										<TextField
											hintText = "Villain Position"
										/>
									</Col>
								</Row>
							</Col>
						</Row>
					</Grid>
		
				</Dialog>

			</div>

		);
	}
}