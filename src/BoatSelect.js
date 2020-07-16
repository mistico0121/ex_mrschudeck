import React, {Component} from 'react';
import Tablero from './ex web'


class BoatSelect extends Component{
	//ALL INFO ON APP, AND HOW IT CHANGES OVER TIME :DDD
	state = {
		boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
		currentBoatSelect: '',
		matriz: [],
		readyBoats:[],
		readyToStart:0,
		rendirse: 0,
		gameStarted:0,
		currentMove: 0,
		//ACÁ GUARDAREMOS LOS LOGS QUE GENERE EL PROGRAMA DURANTE EJECUCION
		logs: ['aeeeeeeee','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr','eeerrrr']
	};

	getInitialState() {
		return {'tablero': this.state.tablero};
		}
	
	changeCurrentMove(nambah) {
		this.setState((prevState)=>({
				currentMove: nambah
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
				gameStarted: 1
			})
		);
	}

	onBoardUpdate() {
		this.setState({"tablero": this.state.tablero});
		}

	newGame(){
		let tablero6 = new Tablero();
		tablero6.tableReady();
		this.setState({tablero: tablero6});
	}

	setBoat = (boat) => {
		var index = this.state.boats.indexOf(boat);
		var boat2 = this.state.boats.splice(index,1)
		this.setState((prevState)=>({
			currentBoatSelect: boat2,
			readyBoats: [...prevState.readyBoats, boat2],
		
		}),()=>{
			//current value is updated here
			if (this.state.readyBoats.length == 10){
				//QUE APAREZCAN BOTONES MOVE Y SHOOT
				this.setState({readyToStart: 1})
			}
		});
	}

	resetSetup = () =>{
		this.setState((prevState)=>({
			boats:[...prevState.readyBoats,...prevState.boats],
			readyBoats: [],
			readyToStart:0,
			currentBoatSelect: '',
			rendirse: 0,
			gameStarted: 0,
			readyToStart: 0
		}))
	}
 	
	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){

		return (
			<div id = 'table'>

			{
				!this.state.rendirse ?

				<React.Fragment>

					
						<div id = 'consola'>
							<h2>Bote seleccionado {this.state.currentBoatSelect}</h2>
							<h2>ready to start es{this.state.readyToStart}</h2>
							<h2>Botes puestos {this.state.readyBoats}</h2>
							<h2>gameStarted es{this.state.gameStarted}</h2>
							<h2>current move es{this.state.currentMove}</h2>

						</div>

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
								<div className = 'grid'>
								aaaa
								</div>
							</div>
							<div id='panel-and-scroll'>
								<div id='panel-control'>
								
									
									{
										this.state.gameStarted ?

										<React.Fragment>
											<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(1)}>Move</button>
											<button className = 'btn btn-primary' onClick = {()=>this.changeCurrentMove(2)}>Shoot</button>
											<button className = 'btn btn-primary' onClick = {()=>this.surrenderGame()}>Rendirse</button>

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
				<button className = 'btn btn-primary' onClick = {()=>this.resetSetup()}>Nueva partida</button>

				</React.Fragment>
			}
			</div>				


		);

	}

}

export default BoatSelect;