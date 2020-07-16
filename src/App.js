import React,{Component} from 'react';
import BattleShip from './BattleShip';
import './App.css';
import testString from './testString';
import tableComponent from './tableComponent';
import Tablero from './ex web'


function App() {

	let table6 = new Tablero();
	table6.tableReady()
	table6.printMatrix();

	let testStringApp = testString;

  return (
    <div className="App">
			<h1>{testStringApp}</h1>
			<BattleShip tablero={table6}/>
      
		</div>
  );
}

export default App;
