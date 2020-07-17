import React, {Component} from 'react';
import Tablero from './ex web'
import TableComponent from './tableComponent'

const nombreCurrentUser = {0: "[Usuario]", 1:"[Computador]"}
const nombreAccion = {0: "Insertando", 1:"Mover", 2:"Disparar"}
let dictAccion = {1:'MOVE', 2:'FIRE'}


//Hardcodeado por mientras. Obtenido con postman
const apiUrl = "https://battleship.iic2513.phobos.cl";
const email = 'mrschudeck@uc.cl'
const numeroAlumno = '16638530'


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
			accessToken:undefined,
			tablero: this.props.tablero,
			//ACÁ GUARDAREMOS LOS LOGS QUE GENERE EL PROGRAMA DURANTE EJECUCION
			//logs: ['aeeeeeeee','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr']
			logs:[],
			testing:0,
			currentActivePlayer:0,
			events:[],
			WINNER:0
		};
	}

	//Setea el gameId y el authToken. Es muy feo, pero funciona, promesa ;)
	componentDidMount(){
		fetch("https://battleship.iic2513.phobos.cl/auth",{
				method:'PUT',
				body:JSON.stringify({"email":email, "studentNumber":numeroAlumno}),
				headers:{
					"Content-Type": "application/json"
				}
			}).then((responsee) => responsee.json()).then((data2)=>this.setState({accessToken:data2.token}))
				.then(whatever => fetch("https://battleship.iic2513.phobos.cl/games",{
				method:'POST',
				body:JSON.stringify({}),
				headers:{
					"Authorization": `Bearer ${this.state.accessToken}`,
					"Content-Type": "application/json"
				}
			})).then((response) => response.json())
				.then(data=>this.setState({gameId:data.gameId}));
					//}).then(gameId => this.setState({gameId:gameId.json()}));
	}

	getInitialState() {
		return {'tablero': this.props.tablero};
		}

	simularWINNER() {
		this.setState((prevState)=>({
				WINNER: 1
			})
		);
		}

	cellGetsShot = (enemyBoat, posX, posY)=>{
		//SE ASUME QUE INFO RECIBIDA DESDE API NO SERÁ ERRÓNEA
		let stringsToShow= [`${nombreCurrentUser[this.state.currentActivePlayer]}: Disparo - ${enemyBoat} - ${String.fromCharCode(65+posY)}${posX}`]
		let optionalstring = " ";

		if (this.props.tablero.enemyShootsToCell(posX,posY)){
			optionalstring = `${nombreCurrentUser[this.state.currentActivePlayer]}: Hunde - ${this.props.tablero.lastDead} - ${String.fromCharCode(64+posY)}${posX}`
		}
		if (optionalstring != " "){
			let evento1 = {"type":"HIT_SHIP", "ship":`${this.props.tablero.lastDead}`}
			let evento2 = {"type":"SHIP_DESTROYED", "ship":`${this.props.tablero.lastDead}`}
			this.setState((prevState)=>({
					tablero:this.props.tablero,
					currentBoatSelect: '-',
					currentMove:'-',
					logs: [...prevState.logs,stringsToShow, optionalstring],
					currentActivePlayer:0,
					events: [...prevState.events,evento1, evento2]

				}));
		} else {
			this.setState((prevState)=>({
					tablero:this.props.tablero,
					currentBoatSelect: '-',
					currentMove:'-',
					logs: [...prevState.logs,stringsToShow],
					currentActivePlayer:0

				}));

		}

	}

	dataHandler= (data) =>{
		console.log("data es",data);
		if (data.events.length>0){
			for (let kp = 0; kp<data.events.length;kp++){
				if (data.events[kp].type=='HIT_SHIP'){
					this.setState((prevState)=>({
						logs:[...prevState.logs,`[Usuario] Impacto Barco ${data.events[kp].ship}`]
					}))
				} else if (data.events[kp].type=='ALL_SHIPS_DESTROYED'){
					this.setState((prevState)=>({
						WINNER:1
					}))
				}
			}
		}
		if (data.action.type == 'FIRE'){
			this.cellGetsShot(data.action.ship, data.action.row, data.action.column);
		} else if (data.action.type == 'MOVE'){
			let stringToShow= `${nombreCurrentUser[this.state.currentActivePlayer]}: ${data.action.type} - ${data.action.ship} - ${data.action.direction} - ${data.action.quantity}`
			this.setState((prevState)=>({
				tablero:this.props.tablero,
				currentBoatSelect: '-',
				currentMove:'-',
				logs: [...prevState.logs,stringToShow],
				currentActivePlayer:0
				

			}))
		}
	} 


	async onBoardUpdate(code,botecito, action ,row, col) {
		//EL SETEO DE BOTES NO SE MARCA EN LOG, PUES VIENEN CON EL CÓDIGO QUE HACE QUE SE SALTE ESOS MENSAJES
		//ACÁ SE DEBIERA HACER LA MAGIA CON EL SERVER

		let data = {};
		let stringToShow;

		if (code==1){
			//MOVER, ARMAMOS STRING BITACORA Y DATA
	 		stringToShow= `${nombreCurrentUser[this.state.currentActivePlayer]}: ${action} - ${botecito} - ${this.props.tablero.direction} - ${this.props.tablero.dif1}`

			data = {
				"action":{
					"type": dictAccion[this.state.currentMove],
					"ship": botecito,
					"direction": this.props.tablero.direction,
					"quantity": this.props.tablero.dif1

				}
			}
		}else if (code==2){
			//DISPARO, ARMAMOS STRING BITACORA Y DATA
	 		stringToShow= `${nombreCurrentUser[this.state.currentActivePlayer]}: ${action} - ${botecito} - ${String.fromCharCode(64+col)}${row}`

			data = {
				"action":{
					"type": dictAccion[this.state.currentMove],
					"ship": botecito,
					"row": row-1,
					"column": col-1

				}
			}

		}

		if (this.state.events.length>0){
			data["events"] = []
			for (let ko = 0; ko< this.state.events.length; ko++){
				data["events"].push(this.state.events[ko])
			}
		}

		//SOLO ACTUALIZA LOG SI CODE ES 666
		if (code =='666'){
			this.setState((prevState)=>({
				tablero:this.props.tablero,
				currentBoatSelect: '-',
				currentMove:0
			}));
		} else {
			this.setState((prevState)=>({
				tablero:this.props.tablero,
				currentBoatSelect: '-',
				currentMove:'-',
				logs: [...prevState.logs,stringToShow],
				currentActivePlayer:1,
				events: []
			}),()=> fetch(`https://battleship.iic2513.phobos.cl/games/${this.state.gameId}/action`,{
					method:'POST',
					body:JSON.stringify(data),
					headers:{
						"Authorization": `Bearer ${this.props.accessToken}`,
						"Content-Type": "application/json"
					}
				}).then((response) => response.json())
					.then((dataa)=> this.dataHandler(dataa)));

		}

		console.log(data)
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
	
	
	//CREA NUEVO JUEGO CON EL SERVIDOR, LUEGO REINICIA TABLERO
	async newGame()  {
		fetch("https://battleship.iic2513.phobos.cl/games",{
				method:'POST',
				body:JSON.stringify({}),
				headers:{
					"Authorization": `Bearer ${this.state.accessToken}`,
					"Content-Type": "application/json"
				}
			}).then((response) => response.json())
				.then(data=>this.setState({gameId:data.gameId})).then(whatever =>this.resetSetup());
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

	//REINICIA EL TABLERO, mantiene el gameID y el accessToken previos
	resetSetup = () =>{
		this.props.tablero.resetMatrix();
		let tablero6 = new Tablero();

		this.setState((prevState)=>({
			boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
			currentBoatSelect: '',
			matriz: [],
			readyBoats:[],
			readyToStart:0,
			rendirse: 0,
			gameStarted:0,
			currentMove: 0,
			gameId:prevState.gameId,
			accessToken:prevState.accessToken,
			tablero: tablero6,
			//ACÁ GUARDAREMOS LOS LOGS QUE GENERE EL PROGRAMA DURANTE EJECUCION
			//logs: ['aeeeeeeee','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr']
			logs:[],
			testing:0,
			currentActivePlayer:0,
			events:[],
			WINNER:0
		}))
	}
 	

	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){
		

		return (
			<div id = 'table'>
				{
					!this.state.WINNER ?

					<React.Fragment>

					{	
					!this.state.rendirse ?

					<React.Fragment>



						<h2>el usuario activo es {nombreCurrentUser[this.state.currentActivePlayer]}</h2> 


						<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentActivePlayer()}>Simular cambio de turno</button>

						{
							!this.state.gameStarted?
							<React.Fragment>
								<h2>Haga click en un ícono para seleccionar un bote, luego haga click en una casilla para insertarlo</h2> 
								<h3>Si no está conforme con su elección, reinicie el tablero</h3> 

							</React.Fragment>:
							<React.Fragment>

							</React.Fragment>

						}

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
								<h2>Accion seleccionada: {nombreAccion[this.state.currentMove]}</h2>
										
									{
										this.state.gameStarted ?

										<React.Fragment>
											{ (this.state.currentActivePlayer==0)?

												<React.Fragment>
													<h3>Es tu turno</h3>
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
													<h3>Esperando acciones del servidor <img 
		
																className = 'smallImg' 
																src ={`./botes/loading.gif`} /></h3>
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
						<div className = 'column'>
							<h1>USTED SE HA RENDIDO</h1>
							<div>
								<button className = 'btn btn-primary' onClick = {()=>this.newGame()}>Nueva partida</button>
							</div>
							<img 
								src ={`./botes/loser.png`} />
						</div>
					</React.Fragment>
					}

				</React.Fragment>:
				<React.Fragment>
					<div className = 'column'>
						<h1>USTED HA GANADO LA PARTIDA</h1>
						<div>
							<button className = 'btn btn-primary' onClick = {()=>this.newGame()}>Nueva partida</button>
						</div>
						<img 
							src ={`./botes/winner.jpg`} />
					</div>
				</React.Fragment>
			}
			</div>				


		);

	}

}

export default BattleShip;