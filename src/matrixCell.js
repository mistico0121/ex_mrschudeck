import React, {Component} from 'react';


//Basado en componente de
//https://www.codementor.io/@codementorteam/react-beginner-tutorial-building-a-board-game-from-scratch-ajjkqr62x
class MatrixCell extends Component{

	//Si current action es X, hace algo, si es Y, hace otra cosa

	handleClick = () => {

	let botecito = this.props.currentBoat;
	let boatlist = ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'];

	if (botecito == '-'|| botecito == ''){
		if (this.props.tablero.matriz[this.props.row, this.props.col]){
			this.props.setBoatFromTable(this.props.tablero.matriz[this.props.row][this.props.col])
		}

	}else{

		if (this.props.currentMove == 1){
		  	if (this.props.tablero.moveBoat(botecito,this.props.row, this.props.col)){
	        	this.props.onPlay();
		  	}
		} else if (this.props.currentMove == 2){
	  	if (this.props.tablero.shootArrow(botecito,this.props.row, this.props.col)){
	        	this.props.onPlay();
	  		}
	  	} else if (this.props.currentMove == 0){
		  		if (this.props.tablero.setUpBoat(botecito,this.props.row, this.props.col)){
		  			this.props.onPlay();
	  			}

	  	}

	 }
  }

	render(){
		return (
			
				<div className = 'btn btn-primary' onClick={this.handleClick}>
						{this.props.tablero.matriz[this.props.row][this.props.col]}
				</div>
			
		)
	}

}

export default MatrixCell