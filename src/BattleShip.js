import React, {Component} from 'react';
import Tablero from './ex web'
import TableComponent from './tableComponent'

const nombreCurrentUser = {0: "[Usuario]", 1:"[Computador]"}

class BattleShip extends Component{
	//ALL INFO ON APP, AND HOW IT CHANGES OVER TIME :DDD
	constructor(props){
		super(props);
	
		this.state = {
			boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
			currentBoatSelect: '',
			matriz: [],
			readyBoats:[],
			readyToStart:0,
			rendirse: 0,
			gameStarted:0,
			currentMove: 0,
			gameId:undefined,
			tablero: this.props.tablero,
			//ACÁ GUARDAREMOS LOS LOGS QUE GENERE EL PROGRAMA DURANTE EJECUCION
			//logs: ['aeeeeeeee','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr']
			logs:[],
			testing:0,
			currentActivePlayer:0
		};
	}
	componentDidMount(){
		fetch("https://battleship.iic2513.phobos.cl/games",{
				method:'POST',
				body:JSON.stringify({}),
				headers:{
					"Authorization": `Bearer ${this.props.accessToken}`,
					"Content-Type": "application/json"
				}
			}).then((response) => response.json())
				.then(data=>this.setState({gameId:data.gameId}));
					//}).then(gameId => this.setState({gameId:gameId.json()}));


	}

	getInitialState() {
		return {'tablero': this.props.tablero};
		}

	cellGetsShot = (posX,posY)=>{
		//SE ASUME QUE INFO RECIBIDA DESDE API NO SERÁ ERRÓNEA


	}

	onBoardUpdate(stringReceived) {
		//EL SETEO DE BOTES NO SE MARCA EN LOG, PUES VIENEN CON EL CÓDIGO SATÁNICO
		if (stringReceived=='666'){
			this.setState((prevState)=>({
				tablero:this.props.tablero,
				currentBoatSelect: '-',
				currentMove:0
			}));
		} else {
			this.setState((prevState)=>({
				tablero:this.props.tablero,
				currentBoatSelect: '-',
				currentMove:0,
				logs: [...prevState.logs,stringReceived],

			}));

		}
	}

	changeCurrentActivePlayer() {
		let newActivePlayer = (this.state.currentActivePlayer+1)%2

		
		this.setState((prevState)=>({
			currentActivePlayer:newActivePlayer
	
		}));
	}
	
	changeCurrentMove(nambah) {
		this.setState((prevState)=>({
				currentMove: nambah
			})
		);
	}
	setBoatFromTable(boatID) {
		this.setState((prevState)=>({
				currentBoatSelect: boatID
			})
		);
	}

	surrenderGame() {
		this.setState((prevState)=>({
				rendirse: 1
			})
		);
	}

	startGame() {
		this.setState((prevState)=>({
				gameStarted: 1,
				currentMove: '-'
			})
		);
	}
	
	
	//TODO: CREATE NEW TABLERO OR REVERSE EVERYTHING TO THE INITIAL STATE
	newGame = ()=>{
		this.props.tablero.resetMatrix();
		let tablero6 = new Tablero();
		this.setState({
			tablero: tablero6,
			boats:['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
			readyBoats: [],
			readyToStart:0,
			currentBoatSelect: '',
			rendirse: 0,
			gameStarted: 0,
			readyToStart: 0,
			logs:[]
		});
		
	}

	setBoat = (boat) => {
		var index = this.state.boats.indexOf(boat);
		var boat2 = this.state.boats.splice(index,1)

		this.setState((prevState)=>({
			currentBoatSelect: boat2,
			readyBoats: [...prevState.readyBoats, boat2],
			currentMove: 0
		
		}),()=>{
			//current value is updated here
			if (this.props.tablero.placedBoats.length == 9){
				//QUE APAREZCAN BOTONES MOVE Y SHOOT
				this.setState((prevState)=>({readyToStart: 1}))
			}
		});
	}

	resetSetup = () =>{
		this.props.tablero.resetMatrix();
		this.setState((prevState)=>({
			boats:[...prevState.readyBoats,...prevState.boats],
			readyBoats: [],
			readyToStart:0,
			currentBoatSelect: '',
			rendirse: 0,
			gameStarted: 0,
			readyToStart: 0,
			logs:[]
		}))
	}
 	

	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){
		

		return (
			<div id = 'table'>

			{
				!this.state.rendirse ?

				<React.Fragment>
						<h2>el usuario activo es {nombreCurrentUser[this.state.currentActivePlayer]}</h2>
						<h2>el gameId es {this.state.gameId}</h2>

						<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentActivePlayer()}>Simular cambio de turno</button>
						<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentActivePlayer()}>Simular Disparo PC en casilla 4 4</button>


						<div id = 'botes-select'>

						{

							//RETORNA UN NUEVO ARRAY QUE LE PASA UNA FUNCION  A CADA ELEMENTO DEL ARRAY PREVIO
							this.state.boats.map(boat =>(
								
								<img 
									key = {boat} 
									onClick = {()=> this.setBoat(boat)
										}
									className = 'smallImg' 
									src ={`./botes/${boat[0]}.png`} />
								))
						}
						</div>
						{
							(!this.state.gameStarted && this.state.readyToStart)?
							<React.Fragment>
								<button className = 'btn btn-primary' onClick = {()=>this.startGame()}>Comenzar el juego</button>

							</React.Fragment>:
							<React.Fragment>
							</React.Fragment>
						}
						<div className = 'container'>
							
							<div className = 'grid-container'>
								{
								<TableComponent 
									tablero = {this.props.tablero} 
									onPlay = {this.onBoardUpdate.bind(this)}
									currentBoat = {this.state.currentBoatSelect}
									currentMove = {this.state.currentMove}
									setBoatFromTable ={this.setBoatFromTable.bind(this)} />
								}
							</div>
							<div id='panel-and-scroll'>
								<div id='panel-control'>
								<h2>Bote seleccionado: {this.state.currentBoatSelect}</h2>
								<h2>testing es {this.state.testing}</h2>
								<h2>current move es {this.state.currentMove}</h2>
										
									{
										this.state.gameStarted ?

										<React.Fragment>
											{ (this.state.currentActivePlayer==0)?

												<React.Fragment>

													{ (this.state.currentMove != 1 &&  this.state.currentMove != 2) ?
														<React.Fragment>

															<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(1)}>Move</button>
															<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(2)}>Shoot</button>
												
														</React.Fragment>:
														<React.Fragment>
															{ (this.state.currentMove == 1)?
																<React.Fragment>
																	<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(1)}>Move</button>
																	<button className = 'btn btn-deactivated'>Shoot</button>

																</React.Fragment>:
																<React.Fragment>
																	<button className = 'btn btn-deactivated'>Move</button>

																	<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(2)}>Shoot</button>

																</React.Fragment>
																
															}


														</React.Fragment>
													}
													<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove('-')}>Cancelar movimiento</button>
													<button className = 'btn btn-primary' onClick = {()=>this.setBoatFromTable('-')}>Des-seleccionar bote</button>

													<button className = 'btn btn-primary' onClick = {()=>this.surrenderGame()}>Rendirse</button>
												</React.Fragment>:
												//SI NO ES EL JUGADOR ACTIVO, TODOS LOS BOTONES QUEDAN DESACTIVADOS

												<React.Fragment>
													<button className = 'btn btn-deactivated'>Move</button>
													<button className = 'btn btn-deactivated'>Shoot</button>
													<button className = 'btn btn-deactivated'>Cancelar movimiento</button>
													<button className = 'btn btn-deactivated'>Des-seleccionar bote</button>
													<button className = 'btn btn-deactivated'>Rendirse</button>
												
												</React.Fragment>

												
											}
										</React.Fragment>:
										<React.Fragment>
											<button className='btn btn-primary' onClick = {()=>this.resetSetup()}>Reset Placement</button>
											<button className = 'btn btn-primary' onClick = {()=>this.surrenderGame()}>Rendirse</button>
										
										</React.Fragment>



									}
								</div>
								<div id = 'scroller'>
									{
										//RETORNA UN NUEVO ARRAY QUE LE PASA UNA FUNCION  A CADA ELEMENTO DEL ARRAY PREVIO
										this.state.logs.map(log =>(
											<React.Fragment>
												<p>{log}</p>
											</React.Fragment>
										))
									}
									
								</div>
							</div>
						</div>
					
				</React.Fragment>:
				<React.Fragment>
					<h1>USTED SE HA RENDIDO</h1>
					<button className = 'btn btn-primary' onClick = {()=>this.newGame()}>Nueva partida</button>

				</React.Fragment>
			}
			</div>				


		);

	}

}

export default BattleShip;