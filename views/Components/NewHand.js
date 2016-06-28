import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';


export default class NewHand extends React.Component{
	constructor(props){
		super(props)
		this.state({open :false})
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


		);
	}
}