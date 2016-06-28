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
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this)

    this.state = {
      open: false, hands : []
    };
  }

  handleSignUp(userinformation){
    $.ajax({
      url: "/signup",
        type: "POST",
        contentType : "application/json",
        data: JSON.stringify(userinformation),
        success: function(response){
          alert(JSON.stringify(response))
        }.bind(this), 
        error:function(xhr){
          console.log("POST request to signup failed")
        }.bind(this)
    });
  }

  componentDidMount(){
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
    	
      
        <div style={styles.container}>
        	<Grid>
        		<Row>
        			<Col xs={12}>
        				<Row start = "xs">
        					<Col xs = {6}>
        						<img src = 'http://localhost:3000/images/cardlogo.png' height = '75' width = '125'/>

        					</Col>
                  <Col xs = {2}>
                    <NewHand />
                  </Col>
        					<Col xs = {2}>
        						<SignUpDialogComponent onSignUp = {this.handleSignUp} />
        					</Col>
        					<Col xs = {2} >
        						<LoginDialogComponent label = "Brand" />
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