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
		this.state = 
			{	
				open: false, heroStack : '', villainStack: '', heroTableImage: '', villainTableImage: '',
				heroPosition : 0, villainPosition : 0, preflopOne: 52, preflopTwo: 52, 
				flopOne: 52, flopTwo: 52, flopThree: 52, flopBetting : '',
				turnCard : 52, turnBetting : '',
				riverCard : 52, riverBetting: '' 
			}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChangeHero = this.handleChangeHero.bind(this)
		this.handleChangeVillain = this.handleChangeVillain.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
	}


	handleOpen(){
		this.setState({open:true})
	}
	handleClose(){
		this.setState({open:false})
	}

	handleFormChange(key){
		return function(e){
			var state = {}
			state[key] = e.target.value
			this.setState(state)
		}.bind(this)
		

	}

	onSubmit(e){
		console.log(this.state.heroStack)
		this.props.onHandSubmit()
	}

	handleChangeHero(event, index, value){
		this.setState({heroPosition : value})
	}

	handleChangeVillain(event, index, value){
		this.setState({villainPosition : value})
	}

	handleCardChange(street){
		return function(event, index, value){
			var state = {}
			state[street] = value
			this.setState(state)
		}.bind(this)
	}


	render(){	
		const actions = [
			 <FlatButton
		        label="Post Hand"
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
		]
		const positionText = [
			"UTG", "UTG + 1", "MP", "CO", "BTN", "SB", "BB"
		]
		const cardText = [
			"As", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "Ts", "Js", "Qs", "Ks",
			"Ac", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "Tc", "Jc", "Qc", "Kc",
			"Ah", "2h", "3h", "4h", "5h", "6h", "7h", "8h", "9h", "Th", "Jh", "Qh", "Kh",
			"Ad", "2d", "3d", "4d", "5d", "6d", "7d", "8d", "9d", "Td", "Jd", "Qd", "Kd",
			"N/A"
		]
		const positions = []
		const cards = []

		for(var i = 0; i<positionText.length; i++){
			positions.push(<MenuItem value = {i} primaryText = {positionText[i]} key = {i}/>)
		}

		for(var i = 0; i<cardText.length; i++){
			cards.push(<MenuItem value = {i} primaryText = {cardText[i]} key = {i} />)
		}

		
		
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
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {4}>
										<b><h2>Table Information</h2></b>
									</Col>
									<Col xs = {2}>
										<h4>Hero Position</h4>
									</Col>
									<Col xs = {2}>
										<h4>Villain Position</h4>
									</Col>
									
								</Row>
							</Col>
							
							
						</Row>
						<Row>
							<Col xs = {12}>
								<Row start = "xs">
									<Col xs = {4}>
										
										<TextField
											hintText = "Hero Stack Size"
											onChange = {this.handleFormChange('heroStack')}
										/>
										<TextField
											hintText = "Villain Stack Size"
											onChange = {this.handleFormChange('villainStack')}
										/>	
									</Col>
									<Col xs = {2}>
										
										<DropDownMenu value = {this.state.heroPosition} onChange = {this.handleChangeHero} children = {positions}>
										</DropDownMenu>
										
									</Col>

									<Col xs = {2}>
										
										<DropDownMenu value = {this.state.villainPosition} onChange = {this.handleChangeVillain} children = {positions} >
										</DropDownMenu>

									</Col>
									<Col xs = {1}>
										<h5>Rock</h5>
									</Col>
									<Col xs = {2}>
										
										<Slider 
											defaultValue = {0.5}
											description = "Hero Table Image"
											onDragStop = {this.handleFormChange('heroTableImage')}
										/>
										
										<Slider
											defaultValue = {0.5}
											description = "Villain Table Image"
											onDragStop = {this.handleFormChange('villainTableImage')}
										/>

									</Col>
									<Col xs = {1}>
										<h5>Maniac</h5>
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
										<DropDownMenu value = {this.state.preflopOne} maxHeight = {300} name = "preflopOne" onChange = {this.handleCardChange('preflopOne')} children = {cards} >
										</DropDownMenu>
										<DropDownMenu value = {this.state.preflopTwo} maxHeight = {300} onChange = {this.handleCardChange('preflopTwo')} children = {cards} >
										</DropDownMenu>
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter preflop betting comments"
										   multiLine={true}
										   onChange = {this.handleFormChange('preflopBetting')}
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
										<DropDownMenu value = {this.state.flopOne} maxHeight = {300} onChange = {this.handleCardChange('flopOne')} children = {cards} >
										</DropDownMenu>
										<DropDownMenu value = {this.state.flopTwo} maxHeight = {300} onChange = {this.handleCardChange('flopTwo')} children = {cards} >
										</DropDownMenu>
										<DropDownMenu value = {this.state.flopThree} maxHeight = {300} onChange = {this.handleCardChange('flopThree')} children = {cards} >
										</DropDownMenu>
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter flop betting comments"
										   multiLine={true}
										   fullWidth = {true}
										   onChange = {this.handleFormChange('flopBetting')}
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
										<DropDownMenu value = {this.state.turnCard} maxHeight = {300} onChange = {this.handleCardChange('turnCard')} children = {cards} >
										</DropDownMenu>
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter turn betting comments"
										   multiLine={true}
										   fullWidth = {true}
										   onChange = {this.handleFormChange('turnBetting')}
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
										<DropDownMenu value = {this.state.riverCard} maxHeight = {300} onChange = {this.handleCardChange('riverCard')} children = {cards} >
										</DropDownMenu>
		
									</Col>
									<Col xs = {6}>
										<TextField
									       hintText="Enter river betting comments"
										   multiLine={true}
										   onChange = {this.handleFormChange('riverBetting')}
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