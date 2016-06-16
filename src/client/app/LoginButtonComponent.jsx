import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class LoginButtonComponent extends React.Component{
	constructor(props){
		super(props)
	}

	handleClick(){
		alert("You Clicked me!");
	}

	render(){
		return (
			<RaisedButton
				label = "Login"
				secondary = {true}
				onTouchTap = {this.handleClick}
			/>

		);
	}
}

export default LoginButtonComponent;