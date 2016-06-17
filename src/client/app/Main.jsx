import React, {Component} from 'react';
import LoginDialogComponent from './Components/LoginDialog.jsx';
import SignUpDialogComponent from './Components/SignUpDialog.jsx';
import {lightBlue600} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';


const styles = {
  container: {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-around'
  },
  loginButton : {
  	alignSelf: 'auto',
  	order : 1, 
  	flexGrow : 2
  }, 
  signUpButton : {
  	alignSelf : 'auto',
  	order : 3, 
  	flexGrow : 1
  }
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: lightBlue600,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
        	<div style = {styles.loginButton}>
        		<LoginDialogComponent style = {styles.loginButton}/>
          		
        	</div>
        	<div style = {styles.signUpButton}>
        		<SignUpDialogComponent />
          		
        	</div>
        	

        	
    		
        	
	          
	    </div>
        
      </MuiThemeProvider>
    );
  }
}

export default Main;