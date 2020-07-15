import React, {Component} from 'react';


//Basado en componente de
//https://www.codementor.io/@codementorteam/react-beginner-tutorial-building-a-board-game-from-scratch-ajjkqr62x
class matrixCell extends Component{

	//Si current action es X, hace algo, si es Y, hace otra cosa

	handleClick() {

		let botecito = this.props.tablero.player1.boatList[this.props.tablero.boatIndex[this.props.currentBoat]]
		if (this.props.currentAction == 'move'){
	  	if (this.props.tablero.moveBoat(botecito,this.props.row, this.props.col))
        this.props.onPlay();
	  } else if (this.props.currentAction == 'shoot'){
	  	if (this.props.tablero.moveBoat(botecito,this.props.row, this.props.col))
        this.props.onPlay();
	  } else if (this.props.currentAction == 'placing'){
	  	if (this.props.tablero.setUpBoat(botecito,this.props.row, this.props.col)){
	  		this.props.onPlay();
	  	}

	  }
  }


	//Props porque requiere que le pasen el board y, bueno, su numero de celda y datos
	render(){
		return <div className = 'btn btn-primary' onClick={this.handleClick}>
						{this.props.tablero.matriz[this.props.row][this.props.col]}
					</div>
	}

}

export default matrixCell