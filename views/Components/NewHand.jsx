import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import {Grid, Col, Row} from 'react-flexbox-grid/lib/index';

const newHandStyle = {
	width : '80%',
	maxWidth : 'none',
	maxHeight : 'none',
	height : '80%',
}

export default class NewHand extends React.Component{
	constructor(props){
		super(props)
		this.state = {open: false, heroPosition : 1, villainPosition : 1}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChangeHero = this.handleChangeHero.bind(this)
		this.handleChangeVillain = this.handleChangeVillain.bind(this)
	}

	handleOpen(){
		this.setState({open:true})
	}
	handleClose(){
		this.setState({open:false})
	}

	onSubmit(e){
		console.log('Submitted')
	}

	handleChangeHero(event, index, value){
		this.setState({heroPosition : value})
	}

	handleChangeVillain(event, index, value){
		this.setState({villainPosition : value})
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
			

			<div>
				<RaisedButton 
					label = "New Hand"
					onTouchTap = {this.handleOpen}
				/>
				<Dialog
					title = "New Hand Form"
					actions = {actions}
					contentStyle = {newHandStyle}
					autoScrollBodyContent={true}
					modal = {false}
					open = {this.state.open}
					onRequestClose = {this.handleClose}>
					<Grid>
						<Row>
							<b><h2>Table Information</h2></b>
							
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {4}>
										
										<TextField
											hintText = "Hero Stack Size"
										/>
										<TextField
											hintText = "Villain Stack Size"
										/>	
									</Col>

									<Col xs = {4}>
										<Slider 
											defaultValue = {0.5}
											description = "Hero Table Image"
										/>
										<Slider
											defaultValue = {0.5}
											description = "Villain Table Image"
										/>

									</Col>

									<Col xs = {2}>
										<h4>Hero Table Position</h4>
										<DropDownMenu value = {this.state.heroPosition} onChange = {this.handleChangeHero} >
											  	<MenuItem value = {1} primaryText = "UTG" />
												<MenuItem value = {2} primaryText = "UTG+1" />
												<MenuItem value = {3} primaryText = "MP" />
												<MenuItem value = {4} primaryText = "CO" /> 
												<MenuItem value = {5} primaryText = "BTN" />
												<MenuItem value = {6} primaryText = "SB" /> 
												<MenuItem value = {7} primaryText = "BB" />
										</DropDownMenu>
										
									</Col>

									<Col xs = {2}>
										<h4>Villain Table Position</h4>
										<DropDownMenu value = {this.state.villainPosition} onChange = {this.handleChangeVillain} >
												<MenuItem value = {1} primaryText = "UTG" />
												<MenuItem value = {2} primaryText = "UTG+1" />
												<MenuItem value = {3} primaryText = "MP" />
												<MenuItem value = {4} primaryText = "CO" /> 
												<MenuItem value = {5} primaryText = "BTN" />
												<MenuItem value = {6} primaryText = "SB" /> 
												<MenuItem value = {7} primaryText = "BB" />
										</DropDownMenu>

									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<b><h2>Preflop</h2></b>
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {6}>
										Placeholder for card selection
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter preflop betting comments"
										   multiLine={true}
										   fullWidth = {true}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<b><h2>Flop</h2></b>
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {6}>
										Placeholder for card selection
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter flop betting comments"
										   multiLine={true}
										   fullWidth = {true}
										/>
									</Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<b><h2>Turn</h2></b>
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {6}>
										Placeholder for  turn card selection
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter turn betting comments"
										   multiLine={true}
										   fullWidth = {true}
										/>
									</Col>
								</Row>
							</Col>
						</Row>

						<Row>
							<b><h2>River</h2></b>
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {6}>
										Placeholder for river card selection
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter river betting comments"
										   multiLine={true}
										   fullWidth = {true}
										/>
									</Col>
								</Row>
							</Col>
						</Row>


					</Grid>
		
				</Dialog>

			</div>

		);
	}
}