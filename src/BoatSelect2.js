import React, {Component} from 'react';

class BoatSelect extends Component{
	//ALL INFO ON APP, AND HOW IT CHANGES OVER TIME :DDD
	state = {
		boats: ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'],
		currentBoatSelect: 'F',
		matriz: []
	}

	setBoat = (boat) => {
		this.setState(prevState)=>({
			currentBoatSelect: boat
		})

	}

	//WHAT SHOULD THE USER SEE WHEN THE STATE CHANGES WOW
	render(){

		for (let i = 0; i<10; i++){
			let row = [];
			for (let j = 0; j<10; j++){
				row.push(0);
			}
			this.state.matriz.push(row);
		}	

		return (
			<div>
				<h1>Bote a poner {this.state.currentBoatSelect}</h1>
				
				{
					//RETORNA UN NUEVO ARRAY QUE LE PASA UNA FUNCION  A CADA ELEMENTO DEL ARRAY PREVIO
					this.state.boats.map(boat =>(
						
						<img 
							key = {boat} 
							onClick = {()=> this.setBoat(boat)}
							className = 'smallImg' 
							src ={`./botes/${boat[0]}.png`} />
						))
				}
			</div>
		);

	}

}

export default BoatSelect;