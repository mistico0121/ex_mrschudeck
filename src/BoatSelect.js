import React, {Component} from 'react';

class BoatSelect extends Component{
	//ALL INFO ON APP, AND HOW IT CHANGES OVER TIME :DDD
	state = {
		boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
		currentBoatSelect: '',
		matriz: [],
		readyBoats:[]
	};

	setBoat = (boat) => {
		this.setState((prevState)=>({
			currentBoatSelect: boat,
			readyBoats: [...prevState.readyBoats, boat]
		
		}),()=>{
			//current value is updated here
			if (this.state.readyboats.length ==2){
				
			}
		});
	}
	
	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){

		return (
			<div>
				<h1>Bote a poner {this.state.currentBoatSelect}</h1>
				<h1>Botes puestos {this.state.readyBoats}</h1>
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
		);

	}

}

export default BoatSelect;