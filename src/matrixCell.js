import React, {Component} from 'react';


//Basado en componente de
//https://www.codementor.io/@codementorteam/react-beginner-tutorial-building-a-board-game-from-scratch-ajjkqr62x
class MatrixCell extends Component{

	//Si current action es X, hace algo, si es Y, hace otra cosa

	handleClick = () => {

	let botecito = this.props.tablero.player1.boatList[this.props.tablero.player1.boatIndex[this.props.currentBoat]]

	if (this.props.currentMove == 1){
	  	if (this.props.tablero.moveBoat(botecito,this.props.row, this.props.col))
        this.props.onPlay();
	  } else if (this.props.currentMove == 2){
	  	if (this.props.tablero.shootArrow(botecito,this.props.row, this.props.col))
        this.props.onPlay();
	  } else if (this.props.currentMove == 0){
	  	if (this.props.tablero.setUpBoat(botecito,this.props.row, this.props.col)){
	  		this.props.onPlay();
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