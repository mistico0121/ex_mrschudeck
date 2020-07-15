import React, {Component} from 'react';
import Tablero from './ex web'


class BoatSelect extends Component{
	//ALL INFO ON APP, AND HOW IT CHANGES OVER TIME :DDD
	state = {
		boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
		currentBoatSelect: '',
		matriz: [],
		readyBoats:[],
		readyToStart:0
	};

	getInitialState() {
		return {'tablero': this.state.tablero};
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
			currentBoatSelect: ''
		}))
	}
 	
	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){

		return (
			<div>
				<h1>Bote a poner {this.state.currentBoatSelect}</h1>
				<h1>Botes puestos {this.state.readyBoats}</h1>
				<h2>ready to start es{this.state.readyToStart}</h2>



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

				<div className='panel-control'>
					<button className='btn btn-primary' onClick = {()=>this.resetSetup()}>Reset</button>
				</div>
					
					{
						this.state.readyToStart ?

						<React.Fragment>
							<button className = 'btn btn-primary' onClick = {()=>this.resetSetup()}>Move</button>

						</React.Fragment>:
						<React.Fragment>
						</React.Fragment>



					}	
			</div>
		);

	}

}

export default BoatSelect;