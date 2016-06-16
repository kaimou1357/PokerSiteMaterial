/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */
import React, {Component} from 'react';
import LoginDialogComponent from './Components/LoginDialog.jsx';
import SignUpDialogComponent from './Components/SignUpDialog.jsx';
import {lightBlue600} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  loginButton : {
  	
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
          <LoginDialogComponent style = {styles.loginButton}/>
          <br></br>
          <SignUpDialogComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;