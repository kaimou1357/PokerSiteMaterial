import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

export default class SignUpDialogComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = { open:false, errorTextUser : '',errorTextPassword : '', errorTextEmail : '', username : '', password : '', email : ''};
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleOpen(){
		this.setState({open:true})
	}

	handleClose(){
		this.setState({open:false})
	}

	handleUserNameChange(e){
		this.setState({username : e.target.value, errorTextUser : ''})
	}

	handleEmailChange(e){
		this.setState({email : e.target.value, errorTextEmail : ''})
	}

	handlePasswordChange(e){
		this.setState({password : e.target.value, errorTextPassword : ''})
	}

	onSubmit(e){
		e.preventDefault();
		var user = this.state.username.trim()
		var password = this.state.password.trim()
		var email = this.state.email.trim()

		if(!user){
			this.setState({errorTextUser : "You must have a username!"})
		}
		if(!password){
			this.setState({errorTextPassword : "You must have a password!"})
		}
		if(!email){
			this.setState({errorTextEmail : "You must provide an email address!"})
		}
		else{
			this.setState({errorTextUser : '', errorTextEmail : '', errorTextPassword : ''})
			alert("Signing up!")

		}
		
	}

	render(){
		const actions = [
	      <FlatButton
	        label="Sign Up"
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
		return (
			<div>
				<RaisedButton label = "Sign Up" onTouchTap = {this.handleOpen} />
				<Dialog
					title = "Login Form"
					actions = {actions}
					modal = {false}
					open = {this.state.open}
					onRequestClose = {this.handleClose}>
					<TextField
				      hintText="Username"
				      floatingLabelText="Username"
				      errorText={this.state.errorTextUser}
				      onChange = {this.handleUserNameChange.bind(this)}
				    /><br />
					<TextField
				      hintText="Password Field"
				      floatingLabelText="Password"
				      errorText={this.state.errorTextPassword}
				      onChange = {this.handlePasswordChange.bind(this)}
				      type="password"
				    /><br />
				    <TextField
				      hintText="Email Address"
				      floatingLabelText="Email Address"
				      errorText={this.state.errorTextEmail}
				      onChange = {this.handleEmailChange.bind(this)}
				    /><br />
				</Dialog>
			</div>


		);
	}
}