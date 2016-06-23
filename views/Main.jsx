import React, {Component} from 'react';
import LoginDialogComponent from './Components/LoginDialog.jsx';
import SignUpDialogComponent from './Components/SignUpDialog.jsx';
import PostList from './Components/PostList.jsx'
import {lightBlue600} from 'material-ui/styles/colors';
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
      
        <div style={styles.container}>
        	<Grid>
        		<Row>
        			<Col xs={12}>
        				<Row start = "xs">
        					<Col xs = {8}>
        						<LoginDialogComponent />

        					</Col>
        					<Col xs = {2}>
        						<SignUpDialogComponent />
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
				      	<PostList hands = {this.props.route.hands}/>

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