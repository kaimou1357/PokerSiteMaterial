import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
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
				open: false, snackbarOpen : false, title : '', heroStack : '', villainStack: '', heroTableImage: 50, villainTableImage: 50,
				heroPosition : 0, villainPosition : 0, 
				preflopOne: 52, preflopTwo: 52, preflopBetting : '',
				flopOne: 52, flopTwo: 52, flopThree: 52, flopBetting : '',
				turnCard : 52, turnBetting : '',
				riverCard : 52, riverBetting: '' 
			}
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChangeHero = this.handleChangeHero.bind(this)
		this.handleChangeVillain = this.handleChangeVillain.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.handleHeroSlider = this.handleHeroSlider.bind(this)
		this.handleVillainSlider = this.handleVillainSlider.bind(this)
	}

	shouldComponentUpdate(nextProps, nextState){
		if((nextState.heroTableImage != this.state.heroTableImage) || nextState.villainTableImage != this.state.villainTableImage){
			return false
		}
		return true
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

	handleSnackBarOpen(){
		this.setState({snackbarOpen : true})
	}

	handleSnackBarClose(){
		this.setState({snackbarOpen : false})
	}

	handleHeroSlider(e, value){
		this.setState({heroTableImage : value})
	}

	handleVillainSlider(e, value){
		this.setState({villainTableImage : value})
	}

	onSubmit(e){
		var preflop = {
			"one" : this.state.preflopOne,
			"two" : this.state.preflopTwo,
			"betting" : this.state.preflopBetting
		}		

		var flop = {
			"one" : this.state.flopOne,
			"two" : this.state.flopTwo,
			"three" : this.state.flopThree,
			"betting"  : this.state.flopBetting
		}

		var turn = {
			"card" : this.state.turnCard,
			"betting" : this.state.turnBetting
		}

		var river = {
			"card" : this.state.riverCard,
			"betting" : this.state.riverBetting
		}
		

		var players = [
			{
				"name" : "Hero",
				"position" : this.state.heroPosition,
				"stack_size" : this.state.heroStack,
				"image" : this.state.heroTableImage
			},

			{
				"name" : "Villain",
				"position" : this.state.villainPosition,
				"stack_size" : this.state.villainStack,
				"image" : this.state.villainTableImage 
			}
		]

		var handjson = {
			"author" : "Test user",
			"title" : this.state.title,
			"players" : players,
			"preflop" : preflop,
			"flop" : flop,
			"turn" : turn,
			"river" : river
		}

		this.props.onHandSubmit(handjson)
		this.setState({open:false, snackbarOpen : true})
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
				<Snackbar
		          open={this.state.snackbarOpen}
		          message="Hand Posted!"
		          autoHideDuration={4000}
		          onRequestClose={this.handleSnackBarClose}
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
							<TextField
								hintText = "Title of Post"
								fullWidth = {true}
								onChange = {this.handleFormChange('title')}
							/>
						</Row>
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
											min = {0}
											max = {100}
											step = {1}
											defaultValue = {50}
											description = "Hero Table Image"
											onChange = {this.handleHeroSlider}
										/>
										
										<Slider
											min = {0}
											max = {100}
											step = {1}
											defaultValue = {50}
											description = "Villain Table Image"
											onChange = {this.handleVillainSlider}
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