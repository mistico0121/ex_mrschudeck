import React,{Component} from 'react';
import BoatSelect from './BoatSelect';
import './App.css';
import testString from './testString';
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
		      
			<BoatSelect/>
      
		</div>
  );
}

export default App;
