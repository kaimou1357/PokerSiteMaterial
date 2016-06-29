import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const signUpFormStyle = {
	  width: '20%'
	};

export default class SignUpDialogComponent extends React.Component{


	constructor(props){
		super(props);
		this.state = {errorTextUser : '',errorTextPassword : '', errorTextEmail : '', username : '', password : '', email : ''};
		this.handleOpenClose = this.handleOpenClose.bind(this)
	}

	handleOpenClose(){
		this.props.onTouch()
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
		var username = this.state.username.trim()
		var password = this.state.password.trim()
		var email = this.state.email.trim()

		if(!username){
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
			this.props.onSignUp({'username' : username, 'password' : password, 'email' : email})

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
	      	onTouchTap = {this.handleOpenClose}
	      />
	    ];
		return (
			<div>
				<FlatButton
					label = "Sign Up" 
					onTouchTap = {this.handleOpenClose} />
				<Dialog
					title = "Sign Up"
					actions = {actions}
					modal = {false}
					open = {this.props.isOpen}
					contentStyle = {signUpFormStyle}
					onRequestClose = {this.handleOpenClose}>
					<TextField
				      hintText="Username"
				      floatingLabelText="Username"
				      fullWidth = {true}
				      errorText={this.state.errorTextUser}
				      onChange = {this.handleUserNameChange.bind(this)}
				    /><br />
					<TextField
				      hintText="Password Field"
				      floatingLabelText="Password"
				      fullWidth = {true}
				      errorText={this.state.errorTextPassword}
				      onChange = {this.handlePasswordChange.bind(this)}
				      type="password"
				    /><br />
				    <TextField
				      hintText="Email Address"
				      fullWidth = {true}
				      floatingLabelText="Email Address"
				      errorText={this.state.errorTextEmail}
				      onChange = {this.handleEmailChange.bind(this)}
				    /><br />
				</Dialog>
			</div>


		);
	}
}