import React, {Component} from 'react';
import LoginDialogComponent from './Components/LoginDialog.jsx';
import SignUpDialogComponent from './Components/SignUpDialog.jsx';
import NewHand from './Components/NewHand.jsx'
import PostList from './Components/PostList.jsx'
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';


const styles = {
  container: {
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-around'
  }
};



class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)

    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleSignUpOpen = this.handleSignUpOpen.bind(this)
    this.postNewHand = this.postNewHand.bind(this)

    this.state = {
      signUpOpen: false, loginOpen : false,  hands : [], user : ''
    };
  }

  handleSignUp(userinformation){
    $.ajax({
      url: "/signup",
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(userinformation),
        success: function(response){
          //handle the response from signup here.
          this.setState({user : response, signUpOpen : false})

        }.bind(this), 
        error:function(xhr){
          console.log("POST request to signup failed")
        }.bind(this)
    });
  }

  checkUserLoggedIn(){
    $.ajax({
      url: "/username",
        type: "GET",
        contentType : "application/json",
        success: function(response){
          //handle the response from signup here.
          this.setState({user : response})

        }.bind(this), 
        error:function(xhr){
          console.log("POST request to signup failed")
        }.bind(this)
    });
  }

  handleLogin(userinformation){
    $.ajax({
      url: "/login",
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(userinformation),
        success: function(response){
          this.setState({user : response, loginOpen : false})
        }.bind(this), 
        error:function(xhr){
          console.log("POST request to login failed")
        }.bind(this)
    });
  }

  handleLogout(){
    $.ajax({
      url: "/logout",
        type: "GET",
        contentType : "application/json",
        success: function(response){
          this.setState({user : ''})
        }.bind(this), 
        error:function(xhr){
          console.log("POST request to login failed")
        }.bind(this)
    });
  }

  postNewHand(hand){
    $.ajax({
      url: "/api/hands",
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(hand),
        success: function(response){
          var newArray = this.state.hands.slice()
          newArray.push(response)
          this.setState({hands : newArray})

          console.log(response)
        }.bind(this), 
        error:function(xhr){
          console.log("POST request to signup failed")
        }.bind(this)
    });
  }

  componentDidMount(){
    this.checkUserLoggedIn()
    this.refreshHands()
  }

  refreshHands(){
    $.ajax({
        url: "/api/hands",
      success: function(response) {
        this.setState({hands : response})
      }.bind(this),
      error: function(xhr) {
        console.log("GET request to retrieve hand failed.")
      }.bind(this)
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleLoginOpen() {
    if(this.state.loginOpen){
      this.setState({loginOpen : false})
    }
    else{
      this.setState({loginOpen : true})
    }

  }

  handleSignUpOpen(){
    if(this.state.signUpOpen){
      this.setState({signUpOpen : false})
    }
    else{
      this.setState({signUpOpen : true})
    }
  }

  render() {
    let navBar = []
    if(!this.state.user){
      //If user is not logged in , display signup/login boxes. Otherwise, just allow them to post a new hand.
      navBar.push(<SignUpDialogComponent onSignUp = {this.handleSignUp} onTouch = {this.handleSignUpOpen} isOpen = {this.state.signUpOpen} />)
      navBar.push(<LoginDialogComponent onTouch = {this.handleLoginOpen} onLogin = {this.handleLogin} isOpen = {this.state.loginOpen} />)
    }
    else{
      navBar[0] = <NewHand onHandSubmit = {this.postNewHand} />
      navBar[1] = <FlatButton label = "Logout" onTouchTap = {this.handleLogout} />
    }
    return (
    	
      
        <div style={styles.container}>
        	<Grid>
        		<Row>
        			<Col xs={12}>
        				<Row start = "xs">
        					<Col xs = {6}>
        						<img src = 'http://localhost:3000/images/cardlogo.png' height = '75' width = '125'/>

        					</Col>
                  <Col xs = {2}>
                    
                  </Col>
                  <Col xs = {2}>
                    {navBar[0]}
                  </Col>
                  <Col xs = {2}>
                    {navBar[1]}
                  </Col>
        				</Row>
  
        			</Col>
        		</Row>
        		<br></br>
        		<Row>	
				  <Col xs={12}>
				    <Row center="xs">
				      <Col xs={12} >
				      	<PostList hands = {this.state.hands}/>

				      </Col>
				    </Row>
				  </Col>
				</Row>
        	</Grid>
        	
        </div>
        

    );
  }
}

export default Main;