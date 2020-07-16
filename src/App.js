import React,{Component} from 'react';
import BoatSelect from './BoatSelect';
import './App.css';
import testString from './testString';
import tableComponent from './tableComponent';
import Tablero from './ex web'


function App() {

	let table6 = new Tablero();
	table6.tableReady()
	table6.printMatrix();

	let testStringApp = testString;

	console.log(testString);



  return (
    <div className="App">
			<h1>{testStringApp}</h1>
		    <h1>veamos esto {table6.matriz[0][1]}</h1>
			<BoatSelect tablero={table6}/>
      
		</div>
  );
}

export default App;
