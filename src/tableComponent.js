import React, {Component} from 'react';
import MatrixCell from './matrixCell';

class TableComponent extends Component{
	
	render(){
		
		let celdas = [];
		for (var i = 0; i<10;i++){
			for (var j = 0; j<10; j++){
				var celdita = [i,j];
				celdas.push(celdita);
			}
		}
		var cell = new MatrixCell({
											tablero:this.props.tablero,
											row:1,
											col:2,
											//onPlay: {this.props.onPlay}
										})
										

		return (
			
				
				<div className='grid'>
							<React.Fragment>
										{
										celdas.map((celdaa)=>
											
											<MatrixCell
												tablero={this.props.tablero}
												row={celdaa[0]}
												col={celdaa[1]}
												onPlay = {this.props.onPlay}
												setBoatFromTable = {this.props.setBoatFromTable}
												currentBoat = {this.props.currentBoat}
												currentMove = {this.props.currentMove}
											/>
										)

										}
								
							</React.Fragment>
						
					
				</div>
			
			)
	}

}

export default TableComponent;