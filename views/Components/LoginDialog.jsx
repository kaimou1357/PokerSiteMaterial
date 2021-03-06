import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const loginCustomStyle = {
	width : '20%'
}

export default class LoginDialogComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {username : '', password : '', userErrorText : '', passwordErrorText : ''};
		this.handleOpenClose = this.handleOpenClose.bind(this)
	}

	handleOpenClose(){
		this.props.onTouch()
	}

	handleUserText(e){
		this.setState({username : e.target.value, userErrorText : ''})
	}

	handlePasswordText(e){
		this.setState({password: e.target.value, passwordErrorText : ''})
	}

	onSubmit(e){
		var user = this.state.username.trim()
		var password = this.state.password.trim()

		if(!user){
			this.setState({userErrorText : 'How do you login without a username?'})
		}
		if(!password){
			this.setState({passwordErrorText : 'How do you login without a password?'})
		}
		else{
			this.setState({passwordErrorText: '', userErrorText : ''})
			//Testing sending requests to/from server.
			this.props.onLogin({"username" : user, "password" : password})
			
		}
		
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
	      	onTouchTap = {this.handleOpenClose}
	      />
	    ];
		return (
			<div>
				<FlatButton
					label = "Login" 
					onTouchTap = {this.handleOpenClose} 
					/>
				<Dialog
					title = "Login Form"
					actions = {actions}
					modal = {false}
					contentStyle = {loginCustomStyle}
					open = {this.props.isOpen}
					onRequestClose = {this.handleOpenClose}>
					<TextField
				      hintText="Username"
				      errorText = {this.state.userErrorText}
				      fullWidth = {true}
				      onChange = {this.handleUserText.bind(this)}
				    /><br />
					<TextField
				      hintText="Password Field"
				      floatingLabelText="Password"
				      fullWidth = {true}
				      errorText = {this.state.passwordErrorText}
				      onChange = {this.handlePasswordText.bind(this)}
				      type="password"
				    /><br />
				</Dialog>
			</div>


		);
	}
}
