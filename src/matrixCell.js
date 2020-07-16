import React, {Component} from 'react';


//Basado en componente de
//https://www.codementor.io/@codementorteam/react-beginner-tutorial-building-a-board-game-from-scratch-ajjkqr62x
class MatrixCell extends Component{

	//Si current action es X, hace algo, si es Y, hace otra cosa

	handleClick = () => {
		//SI LA CASILLA ESTA INUTILIZADA(Z) O REPRESENTA LAS A-J 1-10, NO PASA NADA
		if (this.props.row != 0 && this.props.col != 0 && this.props.tablero.matriz[this.props.row, this.props.col]!='Z'){

			let botecito = this.props.currentBoat;
			let boatlist = ['F1', 'F2', 'F3', 'F4', 'C1', 'C2', 'C3', 'D1', 'D2', 'P1'];
			let stringToShow = ''

			if (botecito == '-'|| botecito == ''){
				if (this.props.tablero.matriz[this.props.row, this.props.col]){
					this.props.setBoatFromTable(this.props.tablero.matriz[this.props.row][this.props.col])
				}

			}else{

				if (this.props.currentMove == 1){
				  	if (this.props.tablero.moveBoat(botecito,this.props.row, this.props.col)){
				  		//F ;___;
				  		//[Usuario]: Mover - C1 - Sur - 3 
			        	this.props.onPlay(1, botecito, 'MOVE',this.props.row, this.props.col);
				  	}
				} else if (this.props.currentMove == 2){
			  	if (this.props.tablero.shootArrow(botecito,this.props.row, this.props.col)){

			  			//[Usuario]: Disparo - D1 - D6

			        	this.props.onPlay(2, botecito, 'FIRE', this.props.row, this.props.col);
			  		}
			  	} else if (this.props.currentMove == 0){
				  		if (this.props.tablero.setUpBoat(botecito,this.props.row, this.props.col)){
				  			this.props.onPlay('666',0,0,0,0);
			  			}

			  	}

			 }
		}
	}

	render(){
		return (
			
				<div className = 'btn btn-tablero' onClick={this.handleClick}>
						{this.props.tablero.matriz[this.props.row][this.props.col]}
				</div>
			
		)
	}

}

export default MatrixCell